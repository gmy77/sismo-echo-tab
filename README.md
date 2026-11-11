<div align="center">

<img src="icons/icon128.png" width="96" alt="SISMO ECHO Tab icon">

# SISMO ECHO Tab

**La tua pagina iniziale, con la Terra e il Sole sotto controllo.**

Una pagina iniziale per **Microsoft Edge** e **Google Chrome**: orologio, ricerca,
ultimo terremoto in Friuli Venezia Giulia e meteo spaziale in tempo reale,
su uno sfondo che si muove secondo la condizione del Sole.

**[sismo-echo-tab.pages.dev](https://sismo-echo-tab.pages.dev)**

![Version](https://img.shields.io/badge/version-3.6.0-26c6da)
![Release](https://img.shields.io/badge/release-2026--11--11-26c6da)
![Manifest](https://img.shields.io/badge/manifest-V3-blue)
![Edge](https://img.shields.io/badge/Edge-✓-0078D7?logo=microsoftedge&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-✓-4285F4?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-yellow)

</div>

---

## ✨ Cosa c'è nella pagina

| | |
|---|---|
| 🕐 **Orologio** | ora, data in italiano e saluto secondo il momento della giornata |
| 🔍 **Ricerca** | casella Google con focus automatico |
| 🌍 **Sismi FVG** | ultimo evento INGV (magnitudo, luogo, ora, profondità), numero di eventi e magnitudo massima degli ultimi 30 giorni |
| 🧲 **Kp planetario** | indice geomagnetico NOAA con stato e scala G delle tempeste |
| 🌬️ **Vento solare** | velocità, densità, Bt e Bz dalla sonda attiva del feed NOAA RTSW |
| ☀️ **Raggi X** | classe del brillamento in corso (A, B, C, M, X) dal satellite GOES |
| 🚀 **Collegamenti** | ECHO Monitor, SismoGlobe, StormShift, AstroSandbox, TechnoLab 95 |

### Lo sfondo segue il Sole

Aurora, righe di scansione e lucine non sono decorative: cambiano con i dati.

| Dato | Effetto |
|---|---|
| Velocità del vento solare | velocità di aurora, righe di scansione, banda luminosa e lucine |
| Kp e Bz verso sud | aurora più intensa che vira al rosso-magenta, lucine calde, reticolo più fitto |
| Raggi X | bagliore caldo in alto, righe più marcate, tremolio di lucine e stelle |
| Densità del vento solare | quante lucine sono accese |

Una riga di stato riassume la situazione: *Sole calmo*, *attivo*, *perturbato*, *tempesta solare*.

Per vedere come si comporta la pagina in condizioni diverse:

- <https://sismo-echo-tab.pages.dev/?demo=calmo>
- <https://sismo-echo-tab.pages.dev/?demo=attivo>
- <https://sismo-echo-tab.pages.dev/?demo=tempesta>

La demo cambia solo lo sfondo e la riga di stato; le card mostrano sempre i dati reali.

---

## 📦 Come usarla

### Come pagina iniziale (il modo più semplice)

In Edge: **Impostazioni → Pagina iniziale, home e nuove schede**, poi imposta
`https://sismo-echo-tab.pages.dev/` come pagina di avvio e come pulsante Home.

### Come nuova scheda (estensione)

L'estensione non è negli store: si carica in modalità sviluppatore.

1. Clona il repository:
   ```bash
   git clone https://github.com/gmy77/sismo-echo-tab.git
   ```
2. Apri `edge://extensions` (oppure `chrome://extensions`)
3. Attiva **Modalità sviluppatore**
4. Scegli **Carica decompressa** e seleziona la cartella `sismo-echo-tab`
5. Alla prima nuova scheda il browser chiede conferma: scegli **Mantieni**

---

## 🏗️ Come funziona

```
pagina iniziale ──────────────┐
                              ├──► https://sismo-echo-tab.pages.dev  (index.html)
nuova scheda (estensione)     │       ├── INGV       → sismi FVG
   └── newtab.html ─ <iframe> ┘       ├── NOAA SWPC  → Kp, vento solare, raggi X
                                      └── Google Fonts → carattere Orbitron
```

Tutta la pagina è un solo file, `index.html`, servito da Cloudflare Pages.
I dati vengono chiesti **direttamente dal browser** a INGV e NOAA: non c'è nessun server in mezzo.
L'estensione è solo un involucro che apre la stessa pagina in un `<iframe>`, quindi
ogni aggiornamento pubblicato arriva subito, senza reinstallare nulla.

### Struttura del progetto

```
sismo-echo-tab/
├── index.html         ← la pagina: stile, sfondo WebGL, lucine, dati
├── newtab.html        ← involucro dell'estensione (iframe verso Pages)
├── manifest.json      ← Manifest V3 (chrome_url_overrides)
├── _redirects         ← regola di Cloudflare Pages
├── deploy.bat         ← pubblicazione su Cloudflare Pages
├── icons/             ← 16 / 48 / 128 px
└── make-icons.ps1     ← generatore icone (PowerShell + System.Drawing)
```

### Pubblicazione

```bash
wrangler pages deploy . --project-name sismo-echo-tab --branch main
```

Oppure doppio clic su `deploy.bat`. Il push su GitHub da solo non aggiorna la pagina.

---

## 🎨 Aspetto

Stile ispirato a WinUI: superfici acriliche, ombre a strati, angoli da 8 px.
I testi usano *Segoe UI Variable*, i numeri *Orbitron*, le icone *Segoe Fluent Icons*
(fuori da Windows vengono sostituite da emoji).

---

## 🔒 Privacy

- **Zero raccolta dati.** Nessuna analitica, nessun tracker, nessun cookie.
- **Zero permessi.** Il manifest chiede solo di sostituire la nuova scheda.
- La pagina contatta soltanto: `sismo-echo-tab.pages.dev` (la pagina stessa),
  `webservices.ingv.it` (sismi), `services.swpc.noaa.gov` (meteo spaziale) e
  `fonts.googleapis.com` / `fonts.gstatic.com` (carattere Orbitron).

---

## 🔢 Versioning

Versione corrente: **3.6.0** — rilascio **2026-11-11**.

Ogni modifica pubblicata aggiorna versione e data di rilascio in `manifest.json`,
nel badge di `index.html`, in questo file e in [CHANGELOG.md](CHANGELOG.md).

---

<div align="center">

**Gimmy Pignolo** © 2026 · [gimmycloud.com](https://gimmycloud.com)

🤖 sviluppato insieme a **Fable 5** di [Anthropic](https://www.anthropic.com) · Claude Code

*Progetto ECHO — costruito con ❤️, umano + IA*

</div>
