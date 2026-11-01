# Miglioramenti SEO — 1° novembre 2026

## Base e intervento

Base `adabc35`, main allineato. Letti AGENTS.md, indice, report precedente e registro; verifica iniziale senza file modificati. Intervento circoscritto ai segnali descrittivi delle pagine, senza cambiare i contenuti didattici.

- Titoli distinti e più espliciti per le nove pagine: numeri reali e complessi, dominio e inverse, limiti e continuità, derivate e studio di funzione, serie numeriche e Taylor, integrali definiti e impropri, dinamica discreta/logistica, formulario e atlante dei grafici. Titoli di 48–56 caratteri: una scelta editoriale, non una soglia obbligatoria imposta da Google.
- Descrizioni uniche di 139–149 caratteri, corrispondenti ai contenuti e ai conteggi effettivi; autrice citata. Allineati meta description, Open Graph e Twitter. Migliorato anche il titolo dell’ingresso principale.
- Dati strutturati LearningResource arricchiti con argomenti insegnati, uso didattico, pubblico studentesco, relazione alla pagina e identità dell’autrice coerente con i profili professionali già pubblici. Nessun rating, prezzo o riconoscimento inventato. Il markup non implica l’abilitazione a uno specifico rich result.
- Conservati URL, canonical, H1, lingua, immagine social, dati di verifica Google e navigazione HTML. La pagina iniziale continua a reindirizzare al capitolo 1 secondo la scelta precedente dell’autrice.
- `lastmod` della sitemap aggiornato al 1° novembre per le nove pagine, in corrispondenza della modifica dei dati strutturati. Non è una data da aggiornare automaticamente ogni giorno.

## Controlli e riuso

Confrontati con git HEAD i corpi HTML dell’ingresso e delle nove pagine: **identici** dopo normalizzazione CRLF/LF. JavaScript, MathJax e CSS non modificati. Si conservano quindi le evidenze di formule, interazioni, mobile e stampa dei report precedenti, con i loro limiti; non è stata svolta una nuova revisione matematica integrale o una nuova esportazione PDF.

Verifica temporanea dei metadati: nove titoli unici, nove description uniche, corrispondenza con le versioni social e JSON-LD, nove URL canonici nella sitemap, assenza di noindex, un H1 per pagina e tag di verifica Google conservati nell’ingresso e nel primo capitolo. JSON-LD e XML analizzabili. Non aggiunto un test permanente che ripeta i soli valori delle modifiche editoriali.

`python verifiche/strumenti/struttura.py`: verifica struttura e confronto degli hash. `node verifiche/strumenti/correzioni.cjs`: regressioni precedenti e voci delle appendici superate. Riuso dei controlli numerici/simbolici giustificato dai corpi e dai programmi invariati.

## Search Console e servizi esterni

All’inizio dell’intervento Search Console mostra ancora la sitemap come **Impossibile recuperare**, zero pagine rilevate; la proprietà rimane verificata. Non si può dedurre da questo che nessuna pagina sia indicizzata. Il test live positivo della sitemap del controllo precedente resta l’ultima evidenza di accessibilità diretta da Google; lo stato del sistema Sitemap è distinto. Nessuna promessa di ranking, tempi di scansione o indicizzazione.

Esiti di pubblicazione, HTTP, statistiche e richiesta di indicizzazione annotati a conclusione del lavoro.

## Riferimenti e manutenzione

Indicazioni primarie consultate: [titoli](https://developers.google.com/search/docs/appearance/title-link), [descrizioni](https://developers.google.com/search/docs/appearance/snippet), [link interni](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [sitemap e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Google può scegliere titolo e snippet diversi e una sitemap è una segnalazione, non una garanzia di inclusione.

Per valutare i risultati occorre attendere dati effettivi di clic, impressioni e query in Search Console. Quando disponibili, usare quei dati per rivedere i testi in modo mirato. Collegamenti editoriali pertinenti da pagine dell’autrice o da risorse didattiche possono favorire la scoperta del sito; nessun collegamento esterno è stato aggiunto automaticamente ad altri servizi. Una futura pagina iniziale con indice e presentazione sarebbe un cambiamento distinto del percorso d’ingresso, da valutare con l’autrice.

Prima del prossimo audit leggere questo report e confrontare stato.json; ricontrollare i servizi esterni anche per i file invariati.
