# Come costruire il tuo sito didattico interattivo

Questa è la procedura usata per la dispensa di Analisi 1: dai materiali di studio a una pagina con formule, esercizi e slider, consultabile gratuitamente con un link.

**Il risultato:** [la nostra dispensa](https://chasemaneuver.github.io/Analisi-1/). Gli studenti non devono accedere a GitHub, installare programmi o avviare un notebook. Il tuo computer può restare spento.

## 1. Prepara i contenuti

1. Scegli il capitolo o l’argomento.
2. Organizza definizioni, teoremi, dimostrazioni, esempi ed esercizi svolti.
3. Individua le idee che beneficiano di una figura interattiva: per esempio l’intersezione di due insiemi, un supremo o le radici complesse.
4. Per ogni figura, decidi che cosa deve cambiare muovendo uno slider e quale domanda porre allo studente.

Puoi preparare la dispensa in un documento o in un file di testo. Controlla prima enunciati e svolgimenti; il PDF del libro non va pubblicato.

## 2. Trasforma il materiale in una pagina web

Crea testi e formule in HTML e i laboratori in JavaScript/SVG: grafici e slider funzionano direttamente nel browser. GitHub Pages pubblica questi file come sito statico.

Se ti fai aiutare da un assistente, puoi chiedere:

> Trasforma questa dispensa in un sito statico per GitHub Pages. Mantieni teoria, formule ed esercizi. Crea soluzioni espandibili e crea grafici interattivi eseguiti nel browser, senza Binder o server Python. Prepara i file pronti da caricare e verifica slider, formule e lettura su telefono.

I file essenziali del nostro sito sono:

| File | A cosa serve |
|---|---|
| `index.html` | Il rimando al primo capitolo; le pagine dei capitoli sono nelle rispettive cartelle. |
| `stile.css` | Colori, impaginazione, adattamento al telefono e stampa. |
| `capitolo-1/laboratori.js` e `capitolo-2/laboratori.js` | Grafici, slider, menu e aggiornamenti interattivi. |
| `.nojekyll` | Un file vuoto che indica a GitHub di pubblicare direttamente i file, senza elaborarli con Jekyll. |

Non occorre imparare tutto il codice per pubblicare: occorre avere questi file pronti. Nel nostro sito le formule usano MathJax, caricato da Internet; i grafici e gli slider sono contenuti nei file del sito.

## 3. Controlla l’anteprima

Prima di pubblicare:

1. Apri l’anteprima della pagina.
2. Muovi ogni slider: deve cambiare il grafico, non soltanto il numero accanto al controllo.
3. Prova tutti i menu e i pulsanti di ripristino.
4. Apri alcune soluzioni e controlla che le formule siano leggibili.
5. Prova una finestra stretta, come quella di un telefono.
6. Controlla anche la matematica: un grafico plausibile non garantisce uno svolgimento corretto.

## 4. Crea il repository su GitHub

Se hai già un repository, come `Analisi-1`, usa quello e passa al punto successivo.

1. Accedi a [GitHub](https://github.com/).
2. Premi **+ → New repository**.
3. Scegli un nome, per esempio `Analisi-1`.
4. Se usi il piano gratuito, scegli **Public** per questo percorso con Pages.
5. Puoi aggiungere un README, cioè una breve presentazione del progetto.
6. Premi **Create repository**.

Il repository è la cartella online dei file. Il sito per gli studenti avrà un indirizzo diverso dalla pagina del repository.

## 5. Carica i file del sito

1. Apri la scheda **Code** del repository.
2. Premi **Add file → Upload files**. Su una finestra stretta, **Add file** può apparire come un pulsante **+** vicino a **Go to file**.
3. Premi **Choose your files** e seleziona `index.html`, `stile.css`, `capitolo-1/laboratori.js` e `capitolo-2/laboratori.js` e `.nojekyll`.
4. Controlla che i nomi compaiano nell’elenco di caricamento.
5. Inserisci una descrizione, per esempio “Pubblica la dispensa interattiva”.
6. Seleziona **Commit directly to the main branch**.
7. Premi **Commit changes**: significa salvare una versione dei file su GitHub.

Mantieni la struttura: cartelle `capitolo-1` e `capitolo-2` con `index.html` e `laboratori.js`; nella radice lascia `index.html`, `capitolo-2.html`, `stile.css`, `capitoli.js` e `.nojekyll`. Carica i file estratti: uno ZIP da solo non diventa un sito.

## 6. Attiva GitHub Pages

Nel repository:

1. Apri **Settings**. Se non lo vedi, cerca nel menu **More** delle schede del repository.
2. Nella barra laterale scegli **Pages**.
3. In **Build and deployment**, imposta **Source → Deploy from a branch**.
4. In **Branch**, cambia **None** in **main**.
5. Nel menu della cartella scegli **/ (root)**: indica la cartella principale dove hai caricato `index.html`.
6. Premi **Save**.

Queste sono le impostazioni del nostro sito. La cartella `/docs` è un’alternativa possibile, ma va selezionata soltanto se hai davvero messo lì tutti i file del sito.

## 7. Recupera il link pubblico

**Non devi inserire un link a piacere.** GitHub genera l’indirizzo dal nome del tuo account e del repository:

`https://NOMEUTENTE.github.io/NOMEREPOSITORY/`

Nel nostro caso:

**https://chasemaneuver.github.io/Analisi-1/**

1. Dopo aver salvato, attendi che GitHub completi la pubblicazione: non è immediata.
2. Apri la scheda **Actions** e cerca **pages build and deployment**.
3. Attendi che il processo risulti completato con successo. Se fallisce, aprilo per leggere l’errore.
4. Il link del sito compare nel risultato della pubblicazione e, a pubblicazione completata, nelle impostazioni **Pages**.
5. Aprilo e prova nuovamente uno slider.
6. Condividi questo indirizzo con gli studenti, anziché il link al repository.

Lascia vuoto **Custom domain**: serve solo se possiedi un dominio personale. Non è necessario per avere il sito gratuito su `github.io`.

## 8. Come aggiornare il sito

1. Modifica i contenuti o fatti preparare la nuova versione dei file web.
2. Carica i file aggiornati nella stessa posizione e con gli stessi nomi tramite **Add file → Upload files**.
3. Scrivi una descrizione della modifica e premi **Commit changes** sul branch `main`.
4. Controlla il nuovo processo nella scheda **Actions**.
5. Riapri il sito; se vedi ancora la versione precedente, aggiorna la pagina senza cache, per esempio con **Ctrl+Shift+R** su Windows.

Il link resta lo stesso. **Non devi riattivare Pages a ogni aggiornamento.**

Per aggiornare un capitolo, sostituisci i file nella relativa cartella; i file condivisi rimangono nella radice.

## Se qualcosa non funziona

| Cosa vedi | Cosa controllare |
|---|---|
| Errore 404 | La pubblicazione è terminata? Esiste `index.html` nella cartella scelta in Pages? |
| Testo senza impaginazione | È stato caricato anche `stile.css`, nella posizione prevista? |
| Mancano grafici o slider | È presente `capitolo-1/laboratori.js` e `capitolo-2/laboratori.js`? Stai aprendo il sito pubblicato? |
| Formule mostrate come testo TeX | La connessione consente il caricamento di MathJax? |
| Compare ancora la vecchia versione | Controlla **Actions**, poi aggiorna senza cache. |

## Il percorso da ricordare

**Prepara i contenuti → prova gli esempi → crea i file web con interazioni nel browser → caricali su GitHub → Settings → Pages → main → / (root) → Save → controlla il sito → condividi il link.**

Guida riferita alla configurazione effettiva di questo repository, ottobre 2026. Per impostazioni e nomi aggiornati dei comandi: [documentazione ufficiale GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

