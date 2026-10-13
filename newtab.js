// SISMO ECHO Tab — logica standalone (senza worker Cloudflare)
// Chiama direttamente INGV e NOAA dal browser.

// ── OROLOGIO & SALUTO ──────────────────────────────────────────
const DAYS   = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
const MONTHS = ['gennaio','febbraio','marzo','aprile','maggio','giugno',
                'luglio','agosto','settembre','ottobre','novembre','dicembre'];
const Z = n => String(n).padStart(2, '0');

function greet(h) {
  if (h < 5)  return '🌙 Buonanotte, Gimmy';
  if (h < 12) return '☀️ Buongiorno, Gimmy';
  if (h < 17) return '🌤 Buon pomeriggio, Gimmy';
  return '🌆 Buonasera, Gimmy';
}

function tickClock() {
  const n = new Date();
  document.getElementById('clock').textContent =
    Z(n.getHours()) + ':' + Z(n.getMinutes());
  document.getElementById('date').textContent =
    DAYS[n.getDay()] + ' ' + n.getDate() + ' ' + MONTHS[n.getMonth()] + ' ' + n.getFullYear();
  document.getElementById('greeting').textContent = greet(n.getHours());
}
tickClock();
setInterval(tickClock, 1000);

// ── INGV helper ───────────────────────────────────────────────
function since30d() {
  return new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
}

async function fetchINGV(params) {
  const base = 'https://webservices.ingv.it/fdsnws/event/1/query'
             + '?format=json&orderby=time&minmag=0.0&limit=200';
  const r = await fetch(base + '&' + params);
  if (!r.ok) throw new Error(r.status);
  const d = await r.json();
  return d.features || [];
}

function placeName(p) {
  if (!p) return '—';
  return p.replace(/^\d+\s*km\s+\w+\s+of\s+/i, '').split(',')[0].trim();
}

// ── SISMO FVG ─────────────────────────────────────────────────
async function fetchFVG() {
  try {
    const evs = await fetchINGV(
      `minlat=45.5&maxlat=46.7&minlon=12.5&maxlon=13.9&starttime=${since30d()}`
    );
    if (!evs.length) {
      document.getElementById('fvg-mag').textContent   = '0.0';
      document.getElementById('fvg-total').textContent = '0';
      document.getElementById('fvg-max').textContent   = '—';
      document.getElementById('fvg-place').textContent = 'nessun evento';
      return;
    }
    const mags = evs.map(e => e.properties.mag).filter(m => m != null);
    const last = evs[0].properties;
    document.getElementById('fvg-mag').textContent   = (last.mag ?? 0).toFixed(1);
    document.getElementById('fvg-total').textContent = evs.length;
    document.getElementById('fvg-max').textContent   = mags.length ? Math.max(...mags).toFixed(1) : '—';
    document.getElementById('fvg-place').textContent = placeName(last.place);
  } catch {
    document.getElementById('fvg-mag').textContent = '⚠';
  }
}

// ── CAMPI FLEGREI ─────────────────────────────────────────────
async function fetchCF() {
  try {
    const evs = await fetchINGV(
      `minlat=40.72&maxlat=40.92&minlon=13.95&maxlon=14.20&starttime=${since30d()}`
    );
    if (!evs.length) {
      document.getElementById('cf-mag').textContent   = '0.0';
      document.getElementById('cf-total').textContent = '0';
      document.getElementById('cf-max').textContent   = '—';
      return;
    }
    const mags = evs.map(e => e.properties.mag).filter(m => m != null);
    const last = evs[0].properties;
    document.getElementById('cf-mag').textContent   = (last.mag ?? 0).toFixed(1);
    document.getElementById('cf-total').textContent = evs.length;
    document.getElementById('cf-max').textContent   = mags.length ? Math.max(...mags).toFixed(1) : '—';
  } catch {
    document.getElementById('cf-mag').textContent = '⚠';
  }
}

// ── NOAA Solar Kp ─────────────────────────────────────────────
function setKpDisconnected() {
  const kpEl  = document.getElementById('kp-val');
  const barEl = document.getElementById('kp-bar');
  const stEl  = document.getElementById('kp-status');
  kpEl.textContent = '--';
  kpEl.style.color = '#ff8a65';
  barEl.style.width = '0%';
  stEl.textContent = 'DISCONNESSO';
}

async function fetchSolar() {
  try {
    const r  = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
    if (!r.ok) throw new Error(r.status);
    const d  = await r.json();
    const kp = parseFloat(d[d.length - 1]?.kp_index ?? d[d.length - 1]?.Kp);
    if (!Number.isFinite(kp)) throw new Error('invalid kp');

    const kpEl  = document.getElementById('kp-val');
    const barEl = document.getElementById('kp-bar');
    const stEl  = document.getElementById('kp-status');

    kpEl.textContent  = kp.toFixed(1);
    barEl.style.width = Math.min(kp / 9 * 100, 100) + '%';

    if (kp < 3) {
      kpEl.style.color = '#80cbc4'; stEl.textContent = 'Tranquillo';
    } else if (kp < 5) {
      kpEl.style.color = '#ffe082'; stEl.textContent = 'Attivo';
    } else if (kp < 7) {
      kpEl.style.color = '#ff8a65'; stEl.textContent = '⚠ Perturbato';
    } else {
      kpEl.style.color = '#ff5252'; stEl.textContent = '🔴 Tempesta';
    }
  } catch {
    setKpDisconnected();
  }
}

// ── avvio & refresh ───────────────────────────────────────────
fetchFVG();
fetchCF();
fetchSolar();

setInterval(fetchFVG,   5 * 60_000);   // ogni 5 min
setInterval(fetchCF,    5 * 60_000);   // ogni 5 min
setInterval(fetchSolar,     60_000);   // ogni 1 min

