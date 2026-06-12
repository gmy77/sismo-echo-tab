// SISMO ECHO Tab — shell logic
// L'iframe carica la newtab servita dall'edge; se il worker non
// risponde entro il timeout, si passa al fallback offline locale.

const FRAME_TIMEOUT_MS = 8000;

const frame    = document.getElementById('echo-frame');
const loader   = document.getElementById('loader');
const fallback = document.getElementById('fallback');

let loaded = false;

frame.addEventListener('load', () => {
  loaded = true;
  loader.style.display = 'none';
  frame.classList.add('ready');
});

setTimeout(() => {
  if (!loaded) {
    loader.style.display = 'none';
    frame.style.display = 'none';
    fallback.classList.add('show');
    startFallbackClock();
  }
}, FRAME_TIMEOUT_MS);

document.getElementById('fb-retry').addEventListener('click', () => location.reload());

// ── orologio offline ──
const GG = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
const MM = ['gennaio','febbraio','marzo','aprile','maggio','giugno',
            'luglio','agosto','settembre','ottobre','novembre','dicembre'];
const Z  = n => String(n).padStart(2, '0');

function startFallbackClock() {
  const tick = () => {
    const n = new Date();
    document.getElementById('fb-clock').textContent = Z(n.getHours()) + ':' + Z(n.getMinutes());
    document.getElementById('fb-date').textContent  =
      GG[n.getDay()] + ' ' + n.getDate() + ' ' + MM[n.getMonth()] + ' ' + n.getFullYear();
  };
  tick();
  setInterval(tick, 1000);
}
