/* A waveform from the selected audio preview, with native range-input fallback. */
(() => {
  const media = document.querySelector('#audio');
  const canvas = document.querySelector('#waveform');
  const control = document.querySelector('.waveform-control');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const context = canvas?.getContext('2d');
  if (!media || !context) return;
  const cache = new Map();
  let peaks = null;
  let fetchController;
  let generation = 0;
  let frame = 0;
  let lastFrame = 0;
  function draw() {
    const width = control.clientWidth;
    const height = control.clientHeight;
    if (!width || !height) return;
    const pixelRatio = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * pixelRatio) || canvas.height !== Math.round(height * pixelRatio)) {
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
    }
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!peaks) return;
    const progress = media.duration ? media.currentTime / media.duration : 0;
    const count = Math.max(12, Math.floor(width / 4));
    for (let i = 0; i < count; i++) {
      const amplitude = peaks[Math.floor(i / count * peaks.length)];
      const barHeight = Math.max(2, amplitude * (height - 8));
      context.fillStyle = i / count <= progress ? '#bea47b' : '#697365';
      context.fillRect(i * width / count, (height - barHeight) / 2, 2, barHeight);
    }
  }
  function tick(now) {
    if (now - lastFrame > 32) { draw(); lastFrame = now; }
    if (!media.paused && !media.ended && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    else frame = 0;
  }
  function sync() {
    document.body.classList.toggle('is-away', document.hidden);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    draw();
    if (peaks && !media.paused && !media.ended && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  }
  media.addEventListener('loadstart', async () => {
    const token = ++generation;
    fetchController?.abort();
    fetchController = new AbortController();
    peaks = null;
    control.classList.remove('has-waveform');
    sync();
    const source = media.currentSrc || media.src;
    if (!source) return;
    let decoder;
    try {
      let next = cache.get(source);
      if (!next) {
        const response = await fetch(source, {signal:fetchController.signal});
        if (!response.ok) throw new Error('Waveform unavailable');
        const data = await response.arrayBuffer();
        if (token !== generation) return;
        const AudioDecoder = window.AudioContext || window.webkitAudioContext;
        if (!AudioDecoder) return;
        decoder = new AudioDecoder();
        const buffer = await decoder.decodeAudioData(data);
        const samples = buffer.getChannelData(0);
        next = new Float32Array(512);
        const block = Math.max(1, Math.floor(samples.length / next.length));
        let max = 0;
        for (let i = 0; i < next.length; i++) {
          let sum = 0;
          const start = i * block;
          for (let j = start; j < Math.min(start + block, samples.length); j += 8) sum += samples[j] * samples[j];
          next[i] = Math.sqrt(sum / Math.ceil(block / 8));
          max = Math.max(max, next[i]);
        }
        if (max) for (let i = 0; i < next.length; i++) next[i] /= max;
        cache.set(source, next);
      }
      if (token !== generation) return;
      peaks = next;
      control.classList.add('has-waveform');
      sync();
    } catch {
      // Playback and the native seek control remain available if decoding is blocked.
    } finally { if (decoder) decoder.close().catch(() => {}); }
  });
  ['play','pause','ended','seeked','timeupdate'].forEach(event => media.addEventListener(event, event === 'timeupdate' ? draw : sync));
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  new ResizeObserver(draw).observe(control);
  const record = document.querySelector('.record-title');
  if (record) new IntersectionObserver(entries => {
    record.dataset.inView = String(entries[0].isIntersecting);
  }).observe(record);
})();
