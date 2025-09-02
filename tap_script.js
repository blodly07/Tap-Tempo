const root = document.documentElement;
const bpmDisplay = document.getElementById('bpm');

let startTime = 0;
let taps = 0;
let lastTapTime = 0;
let prevTap = 0;
let bpm = 0;

function registerTap() {
  document.body.classList.add('flash');
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('flash');
  }, { once: true });

  const now = Date.now();
  if (lastTapTime === 0) {
    startTime = now;
    taps = 0;
  }

  const gap = now - prevTap;
  prevTap = now;
  lastTapTime = now;

  const elapsed = now - startTime;
  if (elapsed > 0) {
    bpm = Math.round((60000 * taps) / elapsed);
    bpmDisplay.textContent = bpm;
  }

  taps++;
  if (gap > 3000) {
    lastTapTime = 0;
  }
}

root.addEventListener('click', registerTap);
root.addEventListener('keydown', (e) => {
  if (!e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    registerTap();
  }
});
root.addEventListener('touchstart', registerTap);
