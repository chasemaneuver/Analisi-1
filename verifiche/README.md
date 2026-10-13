# Registro delle verifiche

Prima di un nuovo controllo leggere il [report del 13 ottobre 2026](report-2026-10-13.md) e il [registro delle versioni](stato.json).

Il registro distingue i controlli completi di struttura, rendering e funzionamento dai controlli matematici mirati. Non è una certificazione formale di ogni dimostrazione o di conformità WCAG.

## Controlli successivi

1. Eseguire `python verifiche/strumenti/struttura.py`: confronta gli SHA-256 e segnala file modificati o mancanti.
2. Per i file invariati riutilizzare soltanto i risultati coperti dal report; le parti parziali restano parziali.
3. HTML o laboratori modificati: controllare quel capitolo. Stile o MathJax modificati: verificare formule, visualizzazione e stampa in tutti i capitoli. Menu condiviso modificato: verificare la navigazione completa.
4. Ripetere sempre il controllo dell’ultima pubblicazione. Ripetere i link esterni e le statistiche a ogni audit: il loro stato non dipende solo dai file.
5. Aggiungere un nuovo report datato, poi aggiornare `stato.json` e questo indice. Non riscrivere la storia.

## Strumenti riproducibili

Richiedono Node.js e Python 3; solo `formule4.py` richiede anche SymPy.

```text
python verifiche/strumenti/struttura.py
node verifiche/strumenti/laboratori.cjs
node verifiche/strumenti/capitolo1.cjs
node verifiche/strumenti/capitolo2.cjs
node verifiche/strumenti/capitolo3.cjs
node verifiche/strumenti/capitolo4.cjs
python verifiche/strumenti/formule4.py
python verifiche/strumenti/link_esterni.py
```

Il browser completa questi controlli con MathJax, uso dei controlli, ripristino, navigazione, lettura mobile e stampa. I test numerici campionano i parametri: non dimostrano ogni possibile configurazione.

Gli hash del registro usano SHA-256 e normalizzano CRLF in LF, per non invalidare un controllo soltanto a causa delle terminazioni di riga di Windows. Non saltare la verifica di dipendenze condivise, servizi esterni o parti precedentemente non controllate.
