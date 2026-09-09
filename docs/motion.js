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

/* A quiet, section-aware motion layer. It adds context without hiding content when JavaScript is unavailable. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const main = document.querySelector('main');
  if (!header || !main) return;

  const progressLine = document.createElement('span');
  progressLine.className = 'page-progress-line';
  progressLine.setAttribute('aria-hidden', 'true');
  header.append(progressLine);

  const sections = [...main.querySelectorAll(':scope > section')];
  const pageNames = {home:'Home',music:'Music',live:'Live work',about:'About',contact:'Contact'};
  const fallbackLabels = {
    home:['Introduction','Approach','Selected recordings','Live work'],
    music:['Introduction','Listening room'],
    live:['Introduction','Featured work'],
    about:['Introduction','The instrument','The practice','Research'],
    contact:['Start a project']
  };
  const labels = sections.map((section, index) => {
    const heading = section.querySelector('h1,h2');
    const clean = heading?.textContent.replace(/\s+/g, ' ').trim();
    return fallbackLabels[document.body.dataset.page]?.[index] || clean || `Section ${index + 1}`;
  });

  const indicator = document.createElement('aside');
  indicator.className = 'journey-indicator';
  indicator.setAttribute('aria-label', 'Current page section');
  indicator.innerHTML = `<span class="journey-kicker">${pageNames[document.body.dataset.page] || 'Portfolio'}</span><strong class="journey-label"></strong><span class="journey-count"></span>`;
  header.insertBefore(indicator, header.querySelector('nav'));
  const indicatorLabel = indicator.querySelector('.journey-label');
  const indicatorCount = indicator.querySelector('.journey-count');
  let activeSection = 0;

  function setSection(index) {
    if (index < 0 || index >= sections.length) return;
    activeSection = index;
    indicatorLabel.textContent = labels[index];
    indicatorCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
    indicator.style.setProperty('--section-progress', (index + 1) / sections.length);
  }
  setSection(0);

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setSection(sections.indexOf(visible.target));
  }, {rootMargin:'-28% 0px -50% 0px', threshold:[0,.15,.35,.6]});
  sections.forEach(section => sectionObserver.observe(section));

  const revealTargets = [...main.querySelectorAll('.home-intro > *, .section-heading, .album-card, .home-live-inner > *, .page-heading > *, .release-selector, .listening-room > *, .additional-project > *, .live-feature > *, .live-pair article, .credit-heading, .credits-list article, .about-feature > *, .guitar-layout > *, .practice-list article, .research-inner > *, .contact-page > *, .site-cta > *')];
  const imageTargets = [...main.querySelectorAll('.album-art, .live-poster, .about-photo, .sleeve-wrap')];
  if (!reduced.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
    });
    imageTargets.forEach(element => element.classList.add('motion-image'));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.08});
    [...new Set([...revealTargets, ...imageTargets])].forEach(element => revealObserver.observe(element));
  }

  let frame = 0;
  function updateScroll() {
    frame = 0;
    const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / distance));
    header.style.setProperty('--page-progress', progress);
    const readingLine = scrollY + innerHeight * .45;
    let nextSection = 0;
    sections.forEach((section, index) => { if (section.offsetTop <= readingLine) nextSection = index; });
    if (nextSection !== activeSection) setSection(nextSection);
    if (!reduced.matches && document.body.dataset.page === 'home') {
      const shift = Math.min(26, scrollY * .045);
      document.documentElement.style.setProperty('--hero-shift', `${shift}px`);
    }
  }
  function requestScrollUpdate() {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }
  addEventListener('scroll', requestScrollUpdate, {passive:true});
  addEventListener('resize', requestScrollUpdate, {passive:true});
  reduced.addEventListener('change', requestScrollUpdate);
  updateScroll();
})();
