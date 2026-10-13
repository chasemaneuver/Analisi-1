# Manutenzione della dispensa

Prima di ogni check leggere `verifiche/README.md`, l’ultimo report indicato e `verifiche/stato.json`.
Confrontare le impronte SHA-256 con i file attuali prima di riutilizzare un esito. Eseguire `python verifiche/strumenti/struttura.py` per vedere i file modificati.

Riutilizzare solo i controlli effettivamente superati, con la copertura dichiarata nel report. Un controllo di rendering non certifica la correttezza matematica; non considerare verificati gli aspetti indicati come parziali o non verificabili.

Modifiche a HTML o JavaScript di un capitolo richiedono il controllo di quel capitolo. Modifiche a CSS, MathJax o codice condiviso richiedono i controlli interessati in tutti i capitoli. Ricontrollare pubblicazione, link esterni e statistiche perché dipendono da servizi esterni anche se i file non cambiano.

Dopo ogni check aggiornare il registro e aggiungere un report datato con comandi eseguiti, risultati, correzioni e limiti. Conservare la storia dei report. Mantenere i percorsi pubblici dei capitoli e l’ingresso `index.html`.
