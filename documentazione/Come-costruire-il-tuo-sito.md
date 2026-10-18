# Come costruire e aggiornare il tuo sito didattico

Questa guida descrive la procedura usata per [la dispensa di Analisi 1](https://chasemaneuver.github.io/Analisi-1/): pagine con formule, soluzioni espandibili e grafici con slider, disponibili gratuitamente senza account degli studenti. Il computer dell’autrice può restare spento.

## 1. Prepara i contenuti

1. Scegli il capitolo e organizza definizioni, teoremi, dimostrazioni, esempi ed esercizi svolti.
2. Controlla enunciati e soluzioni, indicando fonte, pagine e convenzioni.
3. Scegli le figure che aiutano a capire un concetto e stabilisci cosa deve cambiare con ogni slider.
4. Prepara i testi in un documento o in un file di testo. Il PDF del libro resta fuori dal repository pubblico.

## 2. Prepara le pagine web

Il sito usa HTML per i contenuti, CSS per l’aspetto e JavaScript/SVG per i grafici. MathJax trasforma le formule in notazione matematica e richiede una connessione a Internet. Le interazioni funzionano nel browser senza un server da avviare.

Se ti fai aiutare da un assistente, puoi chiedere:

> Prepara un sito statico per GitHub Pages con teoria, formule, soluzioni espandibili e grafici interattivi. Mantieni il formato dei capitoli esistenti, includi fonte e convenzioni e verifica matematica, slider, navigazione, lettura su telefono e stampa.

Mantieni questa struttura:

```text
Analisi-1/
├── index.html
├── .nojekyll
├── README.md
├── LICENSE
├── assets/
│   ├── stile.css
│   ├── capitoli.js
│   ├── mv.svg
│   └── anteprima-social.png
├── capitolo-1/
│   ├── index.html
│   └── laboratori.js
├── capitolo-2/
│   ├── index.html
│   └── laboratori.js
├── capitolo-3/
│   ├── index.html
│   └── laboratori.js
├── capitolo-4/
│   ├── index.html
│   └── laboratori.js
└── documentazione/
    └── Come-costruire-il-tuo-sito.md
```

| Percorso | Funzione |
|---|---|
| `index.html` nella radice | Porta al primo capitolo e mantiene funzionante il link principale. |
| `capitolo-N/index.html` | Testi, formule, esercizi e struttura di quel capitolo. |
| `capitolo-N/laboratori.js` | Grafici e slider di quel capitolo. |
| `assets/stile.css` | Colori, impaginazione, telefono e stampa di tutti i capitoli. |
| `assets/capitoli.js` | Gestione condivisa del menu dei capitoli. |
| `assets/mv.svg` | Icona MV della scheda del browser. |
| `assets/anteprima-social.png` | Banner per l’anteprima del link sui social. |
| `documentazione/` | Istruzioni per chi mantiene il sito. |
| `.nojekyll` | File vuoto necessario alla configurazione di pubblicazione diretta. |
| `README.md` e `LICENSE` | Presentazione del progetto e licenze. |

Le formule nel testo vanno racchiuse tra `$...$`; quelle su una riga propria tra `$$...$$`. Non cambiare i delimitatori quando modifichi una frase. Non mettere file di prova, copie di backup, ZIP o il libro nelle cartelle pubblicate.

## 3. Controlla l’anteprima

1. Apri le pagine e prova tutti gli slider, i menu e i pulsanti di ripristino.
2. Controlla che cambi anche il grafico, non solo il numero accanto allo slider.
3. Apri le soluzioni e controlla le formule.
4. Prova la pagina su una finestra stretta e usa **Stampa / PDF**.
5. Verifica gli svolgimenti: un grafico plausibile non dimostra che la soluzione sia corretta.

## 4. Crea il repository e carica i file

Se il repository esiste già, usa quello.

1. Accedi a GitHub e scegli **+ → New repository**.
2. Inserisci il nome, per esempio `Analisi-1`, e scegli **Public** per questo percorso gratuito con Pages.
3. Premi **Create repository**.
4. Nella scheda **Code**, scegli **Add file → Upload files**.
5. Carica i file mantenendo le cartelle indicate sopra. Puoi trascinare le cartelle dal computer oppure entrare nella cartella corretta su GitHub prima di caricare i suoi file. Controlla i percorsi nell’elenco prima di salvare.
6. Scrivi una descrizione della modifica, seleziona **Commit directly to the main branch** e premi **Commit changes**.

Uno ZIP caricato da solo non diventa un sito: servono i file estratti. Per creare una cartella da GitHub puoi usare **Add file → Create new file** e scrivere un percorso come `documentazione/guida.md` nel nome del file.

## 5. Attiva GitHub Pages una sola volta

1. Apri **Settings → Pages** nel repository.
2. In **Build and deployment**, scegli **Source → Deploy from a branch**.
3. In **Branch**, scegli **main** e **/ (root)**.
4. Premi **Save**.
5. Apri **Actions** e attendi che **pages build and deployment** termini con successo.

Lascia vuoto **Custom domain**, salvo che tu possieda un dominio personale. La cartella `documentazione` contiene soltanto la guida: non selezionarla come cartella da pubblicare.

## 6. Condividi il link

GitHub genera l’indirizzo dal nome dell’account e del repository:

`https://NOMEUTENTE.github.io/NOMEREPOSITORY/`

Il nostro link è [https://chasemaneuver.github.io/Analisi-1/](https://chasemaneuver.github.io/Analisi-1/). Funziona direttamente perché `index.html` nella radice porta al capitolo 1. Non occorre aggiungere il nome del capitolo.

Puoi anche condividere un capitolo preciso, per esempio [capitolo 4](https://chasemaneuver.github.io/Analisi-1/capitolo-4/). Il link del repository serve a gestire i file; il link `github.io` è quello per gli studenti.

## 7. Cosa fare quando aggiorni un file

### Scegli il file giusto

| Cosa vuoi cambiare | File da aggiornare |
|---|---|
| Testo, esercizio o formula di un capitolo | `capitolo-N/index.html` |
| Funzionamento di un grafico o slider | `capitolo-N/laboratori.js` |
| Colori, dimensioni, impaginazione o stampa | `assets/stile.css` |
| Menu condiviso dei capitoli | `assets/capitoli.js` |
| Icona della scheda | `assets/mv.svg` |
| Immagine di anteprima sui social | `assets/anteprima-social.png` |
| Questa guida | `documentazione/Come-costruire-il-tuo-sito.md` |

Attenzione: `index.html` nella radice e `capitolo-2/index.html`, per esempio, sono file diversi. Per modificare il testo del capitolo 2 devi entrare nella sua cartella.

### Metodo A: modifica un testo direttamente su GitHub

1. Apri **Code** e vai nella cartella corretta.
2. Apri il file e premi la matita **Edit this file**; se non è visibile, cercala nel menu delle azioni del file.
3. Modifica solo il testo desiderato, conservando tag HTML e delimitatori delle formule.
4. Premi **Commit changes...**.
5. Scrivi una descrizione chiara, per esempio “Corregge l’esercizio 55 del capitolo 4”.
6. Scegli **Commit directly to the main branch** e conferma **Commit changes**.

### Metodo B: sostituisci un file preparato sul computer

1. Se hai fatto modifiche online, scarica prima la versione corrente: una vecchia copia locale potrebbe cancellare quelle modifiche.
2. Modifica e controlla il file sul computer.
3. Su GitHub entra nella sua cartella, poi scegli **Add file → Upload files**.
4. Carica il file con lo stesso nome e verifica il percorso. Per esempio carica `laboratori.js` dentro `capitolo-4`, non nella radice.
5. Scrivi la descrizione e salva con **Commit changes** su `main`.

### Dopo ogni salvataggio

1. Apri **Actions** e controlla la pubblicazione relativa all’ultimo aggiornamento: un vecchio processo verde non verifica la nuova modifica.
2. Attendi **Success**. Se fallisce, apri il processo e il passaggio in errore.
3. Apri il sito pubblico e verifica il testo o l’interazione modificata. Il salvataggio su GitHub e la pubblicazione sul sito sono due passaggi distinti.
4. Se vedi ancora la vecchia versione, usa **Ctrl + F5** o **Ctrl + Shift + R** su Windows. Puoi confrontare anche con una finestra privata.
5. Se hai modificato un file CSS o JavaScript e il browser continua a conservarne una vecchia copia, aggiorna il parametro di versione nei riferimenti HTML che lo caricano. Per esempio cambia `stile.css?v=20261013-formule` in `stile.css?v=20261014`. Il file continua a chiamarsi `stile.css`: il parametro va nel collegamento, non nel nome del file. Per lo stile condiviso aggiorna il riferimento nei quattro capitoli.
6. Prova almeno un grafico, una soluzione e **Stampa / PDF** se la modifica riguarda aspetto o contenuti.

Il link resta uguale. **Non devi riattivare Pages né cambiare le impostazioni a ogni aggiornamento.** Se sostituisci il banner social, le app possono conservare la vecchia anteprima anche dopo che il sito è aggiornato; usa un nuovo nome per l’immagine e aggiorna i relativi riferimenti nelle pagine.

### Come annullare una modifica errata

Apri il file, entra in **History**, trova la versione precedente e recupera il suo contenuto. Salvalo nuovamente nel percorso originale con un nuovo commit, poi controlla **Actions**. La cronologia mantiene le versioni precedenti: non serve lasciare file `copia`, `backup` o `vecchio` nel repository.

## 8. Aggiungi un capitolo o riordina i file

1. Crea `capitolo-5/` con `index.html` e `laboratori.js`, seguendo il formato esistente.
2. Aggiorna il menu nelle pagine e la gestione condivisa in `assets/capitoli.js`.
3. Aggiungi il capitolo al README e verifica il suo link pubblico.
4. Mantieni i capitoli esistenti nei loro percorsi: spostare o rinominare una cartella cambia l’indirizzo pubblico.
5. Se sposti un’immagine, un foglio di stile o un file JavaScript, aggiorna tutti i collegamenti che lo usano prima di pubblicare.

Nella radice restano `index.html`, `.nojekyll`, `README.md` e `LICENSE`; i contenuti stanno nelle cartelle dei capitoli, le risorse comuni in `assets`, le guide in `documentazione`. Il riordino della documentazione non richiede modifiche alle pagine del sito.

## Se qualcosa non funziona

| Problema | Controllo |
|---|---|
| Errore 404 | Verifica percorso, nome del file, ultimo processo Actions e impostazione `main → / (root)`. |
| Pagina senza stile | Controlla il collegamento a `assets/stile.css`. |
| Mancano grafici o slider | Controlla `laboratori.js` nella cartella del capitolo e il riferimento nella pagina. |
| Formule mostrate come testo | Controlla i delimitatori `$` o `$$` e il caricamento di MathJax. |
| Vecchio testo nonostante Actions verde | Verifica di avere aggiornato il file del capitolo giusto, poi aggiorna senza cache. |
| Vecchio stile o vecchia interazione | Controlla anche il parametro di versione del CSS o JavaScript. |

**Prepara → controlla → salva su GitHub → attendi Actions → verifica sul sito → condividi.**

Configurazione di questo repository: ottobre 2026. Riferimento: [documentazione ufficiale GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).


## Statistiche gratuite con GoatCounter

I cinque capitoli inviano le visite al pannello https://analisi1-mv.goatcounter.com/ tramite lo script ufficiale GoatCounter, caricato in modo asincrono. Accedi con il tuo account per consultare pagine visitate e provenienza degli accessi. Il pannello richiede autenticazione: non pubblicare password o token nel repository.

Le statistiche iniziano dall’attivazione; quelle precedenti non si possono ricostruire. Ad blocker e filtri del servizio possono escludere alcune visite. Il numero di visitatori non identifica gli studenti. La pagina di ingresso reindirizza al capitolo 1 senza inviare una seconda visita. Non sono tracciati clic sugli slider o contenuti delle risposte.

Quando aggiungi un capitolo, copia lo stesso script GoatCounter nel suo `<head>`, una sola volta. Mantieni il canonical corretto: viene usato per identificare la pagina. Dopo la pubblicazione visita il capitolo e controlla il pannello; evita di confondere le tue prove con visite di studenti.

Per Archimede, aggiungi un sito separato in Settings → Sites usando lo stesso accesso. Usa nel sito Archimede il codice specifico del nuovo pannello per non mescolare le statistiche.

Documentazione: https://www.goatcounter.com/help/js e https://www.goatcounter.com/help/domains.
