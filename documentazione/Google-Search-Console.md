# Google Search Console

Proprietà da usare: **https://chasemaneuver.github.io/Analisi-1/**, di tipo prefisso URL. Comprende i sette capitoli e le due appendici.

Proprietà verificata il 1° novembre 2026 con l’account Google dell’autrice; sitemap inviata nella stessa data. Lo stato del recupero e i controlli eseguiti sono registrati nel report della stessa data. L’account da usare è quello indicato nella conferma in chat.

## Verifica della proprietà

In Search Console scegliere **Tag HTML**. Il meta tag `google-site-verification` fornito da Google è nella sezione `<head>` dell’ingresso `index.html` e del primo capitolo, dove l’ingresso reindirizza. È un codice pubblico di verifica, non una password. Non rimuoverlo quando si aggiorna la pagina: Google può ricontrollarlo.

Il tag non introduce un secondo servizio di conteggio delle visite. GoatCounter continua a misurare le visualizzazioni delle pagine; Search Console mostra dati della Ricerca Google.

## Sitemap

Inviare **https://chasemaneuver.github.io/Analisi-1/sitemap.xml** dalla voce **Sitemap**. Il file contiene nove pagine canoniche: sette capitoli e due appendici. Dopo aver aggiunto una pagina, aggiornare il file, pubblicare e verificare che Google riesca a leggerlo. La sitemap non va inviata di nuovo per ogni modifica ordinaria: Google può rileggerla.

Se compare **Impossibile recuperare**, aprire il dettaglio e controllare l’indirizzo completo, quindi usare **Controllo URL → Testa URL pubblicato** sul file sitemap. Una risposta HTTP 200 ottenuta dal nostro computer non dimostra da sola che Google l’abbia letta. Verificare il recupero effettivo prima di dichiarare la sitemap elaborata; alcuni problemi temporanei richiedono un controllo successivo, come spiega la documentazione ufficiale.

## Come leggere i risultati

- **Rendimento:** clic provenienti dalla ricerca, impressioni (presenze nei risultati), CTR e posizione media; controllare sempre le date selezionate.
- **Indicizzazione → Pagine:** quali pagine Google ha indicizzato ed eventuali motivi di esclusione.
- **Controllo URL:** situazione di una singola pagina e possibilità di richiedere l’indicizzazione dopo modifiche rilevanti.

Verificare la proprietà o inviare la sitemap non garantisce l’indicizzazione o una posizione specifica. I dati possono richiedere tempo prima di comparire. I clic Google e le visite GoatCounter misurano fenomeni diversi e possono non coincidere.

Istruzioni ufficiali: [verifica della proprietà](https://support.google.com/webmasters/answer/9008080), [gestione delle sitemap](https://support.google.com/webmasters/answer/7451001).
