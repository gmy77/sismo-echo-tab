# Changelog

## 3.5.0 - 2026-11-11

- Nuovo aspetto in stile WinUI: superfici acriliche, ombre a strati, angoli da 8 px, icone Segoe Fluent Icons (emoji come ripiego fuori da Windows).
- Caratteri: Orbitron per orologio e valori, Segoe UI Variable per i testi, più grandi e con ombra per restare leggibili sopra l'aurora.
- Lo sfondo segue la condizione solare: il vento solare regola la velocità di aurora, righe di scansione e lucine; Kp e Bz sud regolano intensità e colore; i raggi X regolano bagliore e tremolio; la densità regola quante lucine sono accese.
- Nuova riga di stato «Sole calmo / attivo / perturbato / tempesta solare».
- Anteprima delle condizioni con `?demo=calmo`, `?demo=attivo`, `?demo=tempesta`.
- Scala G delle tempeste geomagnetiche corretta (Kp 7 = G3, Kp 8 = G4, Kp 9 = G5).
- Vento solare: usa la riga più recente della sonda attiva del feed NOAA RTSW. Prima veniva letta l'ultima riga del file, che ora è un dato di 24 ore prima di una sonda non più attiva.
- Bt e Bz: letti dal feed del campo magnetico (`rtsw_mag_1m.json`); nel feed del vento non ci sono e restavano sempre vuoti.
- La voce «Fonte» della card mostra la sonda che sta fornendo i dati invece del testo fisso `ACE/DSCOVR`.

## 3.4.3 - 2026-10-13

- Usa il feed NOAA SWPC consolidato a 3 ore come sorgente primaria del KP Index.
- Mantiene il feed KP a 1 minuto come fallback, evitando che record recenti a `0.0` facciano sembrare il campo fermo a zero.

## 3.4.2 - 2026-10-13

- Aggiunge badge fisso in basso a destra con versione e data di rilascio.
- Rende prestabilita la presenza visiva della versione nella pagina pubblicata.

## 3.4.1 - 2026-10-13

- Mostra `DISCONNESSO` quando il valore KP non arriva da NOAA SWPC o non è valido.
- Azzera la barra KP nel fallback, evitando stati precedenti o letture apparentemente tranquille.
- Allinea versione e data di rilascio in manifest e documentazione.
