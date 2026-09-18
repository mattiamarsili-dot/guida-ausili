# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pazienti e caregiver di persone con necessità di ausili per la mobilità, che accedono al sito in autonomia (self-service), completano il questionario guidato, confrontano i prodotti nel catalogo e poi contattano Altra Mobilità per una consulenza gratuita.

## Product Purpose

Guidare l'utente, tramite un questionario a step (wizard), verso la famiglia di ausilio per la mobilità più adatta alla propria situazione clinica e di contesto d'uso; permettere il confronto di prodotti reali corrispondenti nel catalogo; facilitare il contatto con Altra Mobilità per una consulenza gratuita. Successo = l'utente arriva a un orientamento chiaro e invia una richiesta di consulenza con un riepilogo già compilato.

## Positioning

A differenza del sito di un singolo produttore o rivenditore (es. Topro, Sunrise Medical), il servizio offre una consulenza personalizzata basata sulle risposte del paziente e un confronto indipendente multi-brand, non legato a un unico fornitore.

## Operating Context

Flusso: (1) wizard a 9 step raccoglie dati su richiesta, contesto abitativo, utilizzo previsto, propulsione/accompagnamento e controllo posturale; (2) un motore di scoring assegna un punteggio alle famiglie di ausilio e restituisce la soluzione con punteggio più alto più un'alternativa, eventuali requisiti emersi e flag di approfondimento; (3) dallo step finale l'utente può passare al catalogo prodotti per vedere modelli reali; (4) l'utente invia un riepilogo pre-compilato via WhatsApp o email per richiedere la consulenza gratuita.

Il catalogo (`/catalogo`) è una sezione indipendente e navigabile anche senza passare dal questionario, organizzata per categoria. Ogni pagina di categoria ha una tabella di confronto rapido e schede prodotto dettagliate (specifiche tecniche, link a brochure ufficiale e, quando disponibile, al sito di riferimento del produttore — mai al manuale d'uso). Le due superfici (wizard e catalogo) sono collegate solo in fondo pagina con un rimando esplicito, non tramite riferimenti incrociati in header.

## Capabilities and Constraints

- Il motore del wizard copre oggi solo il ramo "mobilità da seduto, adulto" (5 famiglie: carrozzina manuale leggera, superleggera, elettronica pieghevole, elettronica posturale, basculante/posturale manuale). Le altre aree (mobilità in piedi, tutori/ortesi, ramo pediatrico) sono previste nell'interfaccia ma non ancora implementate nel motore.
- Il catalogo copre oggi solo la categoria "Rollator e Deambulatori Adulto" (8 modelli, due sottocategorie: antibrachiali e presa bassa). Altre categorie (carrozzine, tutori) sono annunciate come "in arrivo" nell'hub ma non ancora popolate.
- Sito interamente statico (HTML/CSS/JS, nessun framework, nessun backend): l'invio dei contatti avviene solo tramite link `wa.me` / `mailto`, non c'è raccolta o persistenza dati lato server.
- Prezzo: non mostrato nelle tabelle di confronto rapido del catalogo (rimosso su richiesta); resta nelle schede prodotto dettagliate quando noto ("su richiesta" o importo di partenza).
- Nessuna invenzione di dati prodotto: specifiche, prezzi e link nel catalogo provengono solo da fonti reali fornite dall'utente o verificabili; mai generati o stimati.

## Brand Commitments

- Brand: **Altra Mobilità** (email di contatto: altramobilita@gmail.com; WhatsApp: +39 340 3951866).
- **Guida Ausili** è il nome dello strumento/configuratore all'interno del sito (logo testuale "GA").
- Identità visiva già stabilita e da preservare come sistema unico tra configuratore e catalogo: palette navy (#0b2f6b) / teal (#13999d, #0d8794), font Inter, componenti a card con ombra morbida, bottoni pillola arrotondati.

## Evidence on Hand

Dati tecnici reali per 8 modelli di rollatori/deambulatori (Topro Viva7 e Taurus, Sunrise Medical Gemino 30/60 Walker, Gemino 30 Parkinson, Gemino 30 SpeedControl, AllMobility Trading Fusion 2in1 e Snellino) con specifiche, link a brochure ufficiali e prezzi quando noti, forniti dall'utente. Nessun dato di catalogo ancora raccolto per altre categorie di ausili.

## Product Principles

- Orientamento prima, vendita dopo: il configuratore dà un orientamento preliminare, mai una prescrizione, e segnala sempre quando serve una valutazione professionale (esigenze posturali importanti, barriere architettoniche non risolte).
- Indipendenza dal singolo produttore: il catalogo confronta più brand senza favorirne uno.
- Nessuna invenzione di dati: specifiche, prezzi, link e nomi prodotto vengono solo da fonti reali; mai generati.
- Coerenza visiva come sistema unico: wizard e catalogo condividono lo stesso linguaggio visivo pur restando superfici indipendenti, collegate in modo esplicito e ordinato (non tramite link sparsi in header).
- Basso attrito per il contatto: riepilogo pre-compilato via WhatsApp/email per ridurre lo sforzo dell'utente nel richiedere consulenza.
