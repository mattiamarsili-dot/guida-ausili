# Guida Ausili — Configuratore

Wizard guidato per orientare la scelta della carrozzina/ausilio per la mobilità più adatto (manuale leggera, superleggera, elettronica pieghevole, elettronica posturale, basculante/posturale manuale), sulla base delle risposte fornite su autonomia, contesto d'uso, ambiente domestico e controllo posturale.

Il configuratore è puramente lato client (HTML/CSS/JS, nessuna dipendenza esterna) e non sostituisce una valutazione professionale individuale.

## Struttura

- `index.html` — markup del wizard (9 step)
- `style.css` — stili
- `script.js` — logica del wizard, motore di scoring e generazione del riepilogo per contatto via WhatsApp/email

## Uso in locale

Apri `index.html` in un browser, oppure servi la cartella con un server statico qualsiasi, ad es.:

```bash
python3 -m http.server 8000
```

## Configurazione contatti

I contatti sono impostati in `script.js`:

```js
const WHATSAPP_NUMBER = '393403951866'; // formato internazionale, senza + e senza spazi
const CONTACT_EMAIL = 'altramobilita@gmail.com';
```

## Ramo implementato

Il motore attuale copre il percorso "mobilità da seduto, adulto". Le altre aree (mobilità in piedi, tutori/ortesi, ramo pediatrico) sono previste ma non ancora implementate.
