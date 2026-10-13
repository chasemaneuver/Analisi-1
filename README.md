# Analisi 1 · Dispensa interattiva

Dispensa a cura di **Michelle Vrapi**, con teoria, esempi, esercizi svolti e grafici interattivi.

**[Apri il sito](https://chasemaneuver.github.io/Analisi-1/)**

## Capitoli

- [Capitolo 1 · Numeri](https://chasemaneuver.github.io/Analisi-1/capitolo-1/): 9 laboratori, 35 esercizi e 7 complementi.
- [Capitolo 2 · Funzioni](https://chasemaneuver.github.io/Analisi-1/capitolo-2/): 12 laboratori, 21 esercizi e 9 complementi.

- [Capitolo 3 · Limiti e continuità](https://chasemaneuver.github.io/Analisi-1/capitolo-3/): 15 laboratori, 43 esercizi e 12 complementi (le numerazioni 14 e 7 sono ripetute nel testo).
- [Capitolo 4 · Calcolo differenziale](https://chasemaneuver.github.io/Analisi-1/capitolo-4/): derivate, estremi, convessità, Taylor e Newton. 18 laboratori, 112 esercizi e 8 complementi.

Il menu a sinistra permette di cambiare capitolo. Il pulsante **Stampa / PDF** include anche le soluzioni chiuse; i grafici vengono stampati nello stato corrente.

## Organizzazione dei file

| Percorso | Contenuto |
|---|---|
| `capitolo-1/index.html` | Testi, formule ed esercizi del capitolo 1. |
| `capitolo-1/laboratori.js` | Grafici e slider del capitolo 1. |
| `capitolo-2/index.html` | Testi, formule ed esercizi del capitolo 2. |
| `capitolo-2/laboratori.js` | Grafici e slider del capitolo 2. |
| `capitolo-3/index.html` | Testi, formule ed esercizi del capitolo 3. |
| `capitolo-3/laboratori.js` | Grafici e slider del capitolo 3. |
| `capitolo-4/index.html` | Testi, formule ed esercizi del capitolo 4. |
| `capitolo-4/laboratori.js` | Grafici e slider del capitolo 4. |
| `assets/stile.css` | Stile e stampa condivisi. |
| `assets/capitoli.js` | Menu condiviso per scegliere il capitolo. |
| `index.html` | Ingresso al sito: mantiene il link principale e porta al primo capitolo. |
| `assets/mv.svg` | Icona MV della scheda del browser. |
| `assets/anteprima-social.png` | Banner per l’anteprima dei link social. |
| `documentazione/` | Guide per costruire e aggiornare il sito. |
| `.nojekyll` | Pubblicazione diretta con GitHub Pages. |

Il sito funziona nel browser senza account degli studenti. Le formule usano MathJax da Internet. Il PDF del libro non è incluso nel repository.

Per riprodurre la pubblicazione, leggi [Come costruire il tuo sito](documentazione/Come-costruire-il-tuo-sito.md). GitHub Pages usa **main → / (root)**.

## Autrice e licenze

[Michelle Vrapi](https://chasemaneuver.carrd.co/) · michelle.vrapi@icloud.com

Contributi didattici originali: **CC BY-NC-ND 4.0**. Codice: **MIT**. I materiali di terzi restano esclusi. Vedi [LICENSE](LICENSE).




## Aggiornamenti

Modifica il file nella sua cartella, salva con **Commit changes** su `main`, attendi il nuovo **pages build and deployment** in **Actions** e verifica il sito pubblico. Non occorre riattivare Pages. La [guida](documentazione/Come-costruire-il-tuo-sito.md#7-cosa-fare-quando-aggiorni-un-file) spiega modifica online, caricamento dei file, cache e recupero delle versioni precedenti.

La radice contiene solo ingresso, configurazione e presentazione; le pagine restano in `capitolo-1/`–`capitolo-4/` e le risorse comuni in `assets/`. Mantieni questi percorsi per conservare i link già condivisi.

