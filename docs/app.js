const $ = (selector) => document.querySelector(selector);
const audio = $('#audio');
const player = $('#player');
let releases = [];
let selected = 'pills';
let active = null;
let requestVersion = 0;
const icon = (name) => `<i class="ph ph-${name}" aria-hidden="true"></i>`;
const time = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const menu = $('.menu-toggle');
function closeMenu() {
  $('#navigation').classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  menu.innerHTML = icon('list');
}
menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') !== 'true';
  $('#navigation').classList.toggle('open', isOpen);
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menu.innerHTML = icon(isOpen ? 'x' : 'list');
});
$('#navigation').addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });

function syncPlayback() {
  const playing = !audio.paused && !audio.ended;
  $('#player-toggle').innerHTML = icon(playing ? 'pause' : 'play');
  $('#player-toggle').setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
  document.querySelectorAll('.track').forEach(button => {
    const isActive = active && active.release === selected && active.index === Number(button.dataset.track);
    const isPlaying = Boolean(isActive && playing);
    button.setAttribute('aria-pressed', String(isPlaying));
    button.querySelector('.ph').className = `ph ph-${isPlaying ? 'pause' : 'play'}`;
    const title = button.querySelector('.track-title').textContent;
    button.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${title} preview`);
  });
}
function renderRelease(id) {
  const release = releases.find(item => item.id === id);
  if (!release) return;
  selected = id;
  document.querySelectorAll('[data-release]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.release === id)));
  $('#release-art').src = release.image;
  $('#release-art').alt = `${release.title} by ${release.artist} album artwork`;
  $('#release-title').textContent = release.title;
  $('#release-byline').textContent = `${release.artist} · ${release.year}`;
  $('#release-role').textContent = release.role;
  $('#release-link').href = release.url;
  $('#spotify-link').hidden = id !== 'pills';
  $('#press-note').hidden = id !== 'pills';
  const list = $('#track-list');
  list.replaceChildren();
  release.tracks.forEach((track, index) => {
    const button = document.createElement('button');
    button.className = 'track';
    button.dataset.track = index;
    button.innerHTML = `<span class="track-number">${String(index + 1).padStart(2, '0')}</span><span class="track-title"></span><span class="track-duration">${time(track.duration / 1000)}</span>${icon('play')}`;
    button.querySelector('.track-title').textContent = track.title;
    button.addEventListener('click', () => playTrack(id, index));
    list.append(button);
  });
  syncPlayback();
  $('#listening-room').setAttribute('aria-busy', 'false');
}
function showPlaybackError() {
  $('#player-error').replaceChildren(document.createTextNode('Preview unavailable. '));
  if (active) {
    const track = releases.find(r => r.id === active.release)?.tracks[active.index];
    if (track) {
      const link = document.createElement('a');
      link.href = track.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = 'Listen on Apple Music'; link.style.textDecoration = 'underline';
      $('#player-error').append(link);
    }
  }
  syncPlayback();
}
async function resumeAudio() {
  const version = ++requestVersion;
  $('#player-error').textContent = '';
  $('#player-toggle').setAttribute('aria-label', 'Loading preview');
  try { await audio.play(); }
  catch (error) { if (version === requestVersion && error.name !== 'AbortError') showPlaybackError(); }
}
async function playTrack(id, index) {
  const release = releases.find(r => r.id === id);
  const track = release.tracks[index];
  player.hidden = false;
  if (active && active.release === id && active.index === index) {
    if (audio.paused) await resumeAudio(); else audio.pause();
    return;
  }
  ++requestVersion;
  audio.pause();
  active = { release: id, index };
  $('#player-title').textContent = track.title;
  $('#player-artist').textContent = `${release.artist} · ${release.title}`;
  $('#player-art').src = release.image;
  $('#player-time').textContent = '0:00';
  $('#player-seek').value = 0;
  audio.src = track.preview;
  await resumeAudio();
}
$('#player-toggle').addEventListener('click', () => { if (audio.paused) resumeAudio(); else audio.pause(); });
$('#player-close').addEventListener('click', () => {
  ++requestVersion; audio.pause(); player.hidden = true;
  const previousButton = active?.release === selected ? document.querySelector(`[data-track="${active.index}"]`) : null;
  (previousButton || document.querySelector(`[data-release="${selected}"]`))?.focus({ preventScroll: true });
});
$('#player-seek').addEventListener('input', (event) => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(event.target.value); });
audio.addEventListener('timeupdate', () => { $('#player-time').textContent = time(audio.currentTime); $('#player-seek').value = audio.currentTime; $('#player-seek').setAttribute('aria-valuetext', `${time(audio.currentTime)} of ${time(audio.duration || 30)}`); });
audio.addEventListener('loadedmetadata', () => { $('#player-seek').max = audio.duration; $('.player-preview').textContent = `${Math.round(audio.duration)}s preview`; });
['play', 'pause', 'ended'].forEach(name => audio.addEventListener(name, syncPlayback));
audio.addEventListener('error', showPlaybackError);
document.querySelectorAll('[data-release]').forEach(button => button.addEventListener('click', () => renderRelease(button.dataset.release)));
fetch('music.json').then(response => { if (!response.ok) throw new Error('Music unavailable'); return response.json(); }).then(data => { releases = data; renderRelease(selected); }).catch(() => {
  $('#track-list').innerHTML = '<p>Track previews could not load. You can still hear the full release on Apple Music below.</p>';
  $('#listening-room').setAttribute('aria-busy', 'false');
  document.querySelectorAll('[data-release]').forEach(button => { button.disabled = true; });
});
$('#year').textContent = new Date().getFullYear();
$('#copy-email').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('joeljoshuabobby@gmail.com'); $('#copy-status').textContent = 'Email copied'; }
  catch { $('#copy-status').textContent = 'Select the email address to copy it.'; }
  setTimeout(() => { $('#copy-status').textContent = ''; }, 4000);
});
