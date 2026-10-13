<div align="center">

<img src="icons/icon128.png" width="96" alt="SISMO ECHO Tab icon">

# SISMO ECHO Tab

**La tua nuova scheda, con la Terra sotto controllo.**

Estensione per **Microsoft Edge** e **Google Chrome** che trasforma ogni nuova scheda
nella dashboard personale di [SISMO ECHO](https://github.com/gmy77/sismo-echo):
orologio, ricerca, ECHO Suite e monitoraggio sismico live.

![Version](https://img.shields.io/badge/version-3.4.1-26c6da)
![Release](https://img.shields.io/badge/release-2026--10--13-26c6da)
![Manifest](https://img.shields.io/badge/manifest-V3-blue)
![Edge](https://img.shields.io/badge/Edge-✓-0078D7?logo=microsoftedge&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-✓-4285F4?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-yellow)

</div>

---

## ✨ Cosa ottieni in ogni nuova scheda

| | |
|---|---|
| 🕐 **Orologio gigante** | ora con gradiente, secondi live, data in italiano, saluto contestuale |
| 🔍 **Ricerca immediata** | barra Google con focus automatico |
| 🚀 **ECHO Suite** | scorciatoie a Chat IA, Code, Translate, Storage, Forza 4, Othello |
| 🌍 **SISMO FVG live** | ultimo terremoto, totale eventi, magnitudo max, indice Kp solare |
| 🌋 **Campi Flegrei live** | ultimo micro-sisma, totale, max, eventi degli ultimi 30 giorni |
| 🎨 **Stile 2026** | aurora animata, glassmorphism, micro-animazioni |
| 📡 **Sempre aggiornata** | il contenuto è servito dall'edge: ogni miglioria arriva da sola, senza aggiornare l'estensione |
| 🔌 **Fallback offline** | se il monitor non è raggiungibile, orologio locale ed eleganza intatta |

I dati sismici provengono da [INGV](https://www.ingv.it), quelli solari da
[NOAA SWPC](https://www.swpc.noaa.gov), elaborati dal worker
[sismo-echo](https://github.com/gmy77/sismo-echo) su Cloudflare.

---

## 📦 Installazione

> L'estensione non è (ancora) negli store: si installa in modalità sviluppatore.
> Sono 30 secondi, una volta sola.

### Microsoft Edge

1. Scarica o clona questo repository:
   ```bash
   git clone https://github.com/gmy77/sismo-echo-tab.git
   ```
2. Apri `edge://extensions` nella barra degli indirizzi
3. Attiva l'interruttore **Modalità sviluppatore** (in basso a sinistra)
4. Clicca **Carica decompressa** e seleziona la cartella `sismo-echo-tab`
5. Apri una nuova scheda — benvenuto in ECHO 🌋

### Google Chrome

1. Stesso download/clone di cui sopra
2. Apri `chrome://extensions`
3. Attiva **Modalità sviluppatore** (in alto a destra)
4. Clicca **Carica estensione non pacchettizzata** e seleziona la cartella
5. Nuova scheda → fatto

> 💡 Al primo avvio Chrome/Edge chiede conferma per la sostituzione della
> nuova scheda: scegli **Mantieni**.

---

## 🏗️ Come funziona

```
nuova scheda
   └── newtab.html (shell locale, sfondo scuro, zero flash)
         └── <iframe> → https://sismo-fvg.gimmy077.workers.dev/newtab
               ├── dati live: /api/events · /api/stats · /api/solar · /api/cf
               └── timeout 8s → fallback offline con orologio locale
```

L'estensione è una **shell sottile**: tutto il contenuto vive sul worker
Cloudflare e viene renderizzato all'edge. Vantaggi:

- **aggiornamenti istantanei** — ogni deploy del worker si riflette subito nella tab
- **footprint minimo** — l'estensione pesa pochi KB, niente build, niente dipendenze
- **un'unica fonte di verità** — la stessa pagina è raggiungibile anche senza estensione su [/newtab](https://sismo-fvg.gimmy077.workers.dev/newtab)

### Struttura del progetto

```
sismo-echo-tab/
├── manifest.json      ← Manifest V3 (chrome_url_overrides)
├── newtab.html        ← shell: loader, iframe, fallback offline
├── newtab.js          ← logica shell (timeout, orologio fallback)
├── icons/             ← 16 / 48 / 128 px
└── make-icons.ps1     ← generatore icone (PowerShell + System.Drawing)
```

---

## 🔒 Privacy

- **Zero raccolta dati.** Nessuna analitica, nessun tracker, nessun cookie proprietario.
- **Zero permessi speciali.** Il manifest non richiede `permissions`: solo l'override della nuova scheda.
- L'unica connessione è verso il worker `sismo-fvg.gimmy077.workers.dev` per il contenuto della pagina.

---

## 🔢 Versioning

Versione corrente: **3.4.1** — rilascio **2026-10-13**.

Ogni modifica pubblicata aggiorna sempre versione e data di rilascio.
La shell dell'estensione cambia raramente: il contenuto si aggiorna da solo via edge.

---

<div align="center">

**Gimmy Pignolo** © 2026 · [gimmycloud.com](https://gimmycloud.com)

🤖 sviluppato insieme a **Fable 5** di [Anthropic](https://www.anthropic.com) · Claude Code

*Progetto ECHO — costruito con ❤️, umano + IA*

</div>
