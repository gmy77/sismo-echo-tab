# Changelog

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
