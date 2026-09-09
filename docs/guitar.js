const guitar = document.querySelector('[data-guitar]');
if (guitar) {
  const observer = new IntersectionObserver(async entries => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    try {
      const {mountGuitar} = await import('./assets/3d/guitar-scene.js');
      mountGuitar(guitar);
    } catch {
      guitar.querySelector('.guitar-status').textContent = 'Interactive view unavailable. Please reload to try again.';
    }
  }, {rootMargin:'200px'});
  observer.observe(guitar);
}
