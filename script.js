let current=0;
const steps=[...document.querySelectorAll('.step')];
function fd(){return Object.fromEntries(new FormData(document.getElementById('wizard')).entries())}
function show(i){
 current=i; steps.forEach((s,idx)=>s.classList.toggle('active',idx===i));
 document.getElementById('bar').style.width=((i)/(steps.length-1)*100)+'%';
 window.scrollTo({top:0,behavior:'smooth'});
 if(i===8) computeResult();
}
function nextStep(){
 const d=fd();
 if(current===0 && (!d.firstName || !d.lastName || !d.requestType)){alert('Compila nome, cognome e tipo di richiesta.');return}
 if(current===0 && d.requestType==='new'){show(2);return}
 if(current===1 && d.requestType==='renewal' && !d.renewalReason){alert('Seleziona il motivo del rinnovo.');return}
 if(current===2){
   if(!d.area || !d.ageGroup){alert('Seleziona area e fascia di età.');return}
   if(d.area!=='seated' || d.ageGroup!=='adult'){document.getElementById('otherAreaMsg').classList.remove('hidden');return}
 }
 if(current===3 && (!d.preference || !d.context)){alert('Completa le due risposte.');return}
 if(current===5 && !d.usage){alert('Indica quanto verrà usato l’ausilio.');return}
 if(current===6 && (!d.propulsion || !d.caregiver)){alert('Completa propulsione e accompagnatore.');return}
 if(current===7 && (!d.trunk || !d.head)){alert('Completa le due domande posturali.');return}
 show(current+1)
}
function prevStep(){
 const d=fd();
 if(current===2 && d.requestType==='new'){show(0);return}
 show(Math.max(0,current-1))
}

document.querySelectorAll('input[name="requestType"]').forEach(x=>x.addEventListener('change',()=>{}));
document.querySelectorAll('input[name="renewalReason"]').forEach(x=>x.addEventListener('change',e=>{
 document.getElementById('wearDetails').classList.toggle('hidden',e.target.value!=='wear')
}));
document.querySelector('[name="barrierSolution"]').addEventListener('change',e=>{
 document.getElementById('elevatorFields').classList.toggle('hidden',e.target.value!=='elevator')
});
document.querySelectorAll('input[name="area"],input[name="ageGroup"]').forEach(x=>x.addEventListener('change',()=>{
 const d=fd(); document.getElementById('otherAreaMsg').classList.toggle('hidden',!(d.area && d.ageGroup && (d.area!=='seated'||d.ageGroup!=='adult')))
}));

function add(scores,key,n){scores[key]+=n}
function computeResult(){
 const d=fd();
 const labels={
 light:'Carrozzina manuale leggera',
 ultra:'Carrozzina manuale superleggera',
 foldPower:'Carrozzina elettronica pieghevole',
 postPower:'Carrozzina elettronica posturale',
 postManual:'Carrozzina basculante / posturale manuale'
 };
 let s={light:0,ultra:0,foldPower:0,postPower:0,postManual:0};
 let reasons=[], req=[], flags=[];

 // Preferenza (mai vincolante)
 if(d.preference==='manual'){add(s,'light',3);add(s,'ultra',3);add(s,'postManual',2)}
 if(d.preference==='power'){add(s,'foldPower',4);add(s,'postPower',4)}
 // Contesto
 if(d.context==='indoor_only'){add(s,'light',2);add(s,'foldPower',1);add(s,'postManual',2);add(s,'postPower',1)}
 if(d.context==='mostly_indoor'){add(s,'light',2);add(s,'foldPower',1);add(s,'postManual',2);add(s,'postPower',2)}
 if(d.context==='both'){add(s,'light',1);add(s,'ultra',2);add(s,'foldPower',3);add(s,'postPower',3)}
 if(d.context==='mostly_outdoor'||d.context==='outdoor_only'){add(s,'ultra',4);add(s,'foldPower',4);add(s,'postPower',2);add(s,'light',1)}
 // Uso
 if(d.usage==='occasional'){add(s,'light',4);add(s,'foldPower',2);add(s,'ultra',1)}
 if(d.usage==='limited'){add(s,'light',3);add(s,'ultra',2);add(s,'foldPower',2)}
 if(d.usage==='hours'){add(s,'ultra',3);add(s,'foldPower',2);add(s,'postManual',2);add(s,'postPower',2)}
 if(d.usage==='most_day'||d.usage==='primary'){add(s,'postManual',5);add(s,'postPower',5);add(s,'ultra',2)}
 if(d.indoorRole==='primary'){add(s,'postManual',3);add(s,'postPower',3)}
 // Propulsione
 if(d.propulsion==='independent'){add(s,'ultra',7);add(s,'light',2);add(s,'foldPower',-2);add(s,'postPower',-2)}
 if(d.propulsion==='fatigue'){add(s,'light',4);add(s,'ultra',2);add(s,'foldPower',3)}
 if(d.propulsion==='short'){add(s,'light',4);add(s,'foldPower',4);add(s,'ultra',1)}
 if(d.propulsion==='none'){add(s,'light',3);add(s,'foldPower',6);add(s,'postPower',6);add(s,'ultra',-5);add(s,'postManual',4)}
 // Caregiver
 if(d.caregiver==='always'){add(s,'light',5);add(s,'postManual',5)}
 if(d.caregiver==='often'){add(s,'light',3);add(s,'postManual',3);add(s,'foldPower',1)}
 if(d.caregiver==='sometimes'){add(s,'light',1);add(s,'foldPower',3);add(s,'postPower',2)}
 if(d.caregiver==='rare'||d.caregiver==='never'){add(s,'foldPower',6);add(s,'postPower',6);add(s,'light',-2);add(s,'postManual',-2)}
 // Outdoor
 if(d.outdoorUse==='local'||d.outdoorUse==='occasional'){add(s,'light',3);add(s,'foldPower',1)}
 if(d.outdoorUse==='long'||d.outdoorUse==='daily'){add(s,'ultra',4);add(s,'foldPower',4);add(s,'postPower',2)}
 // Auto
 if(d.carTransport==='frequent'){add(s,'light',4);add(s,'ultra',5);add(s,'foldPower',6);add(s,'postManual',-3);add(s,'postPower',-3);req.push('Elevata trasportabilità / ingombro ridotto')}
 if(d.carTransport==='occasional'){add(s,'light',2);add(s,'ultra',2);add(s,'foldPower',3)}
 // Postura
 if(d.trunk==='stable'){add(s,'light',2);add(s,'ultra',2);add(s,'foldPower',2)}
 if(d.trunk==='partial'){add(s,'postManual',5);add(s,'postPower',5);add(s,'light',1);req.push('Supporto del tronco da approfondire')}
 if(d.trunk==='none'){add(s,'postManual',10);add(s,'postPower',10);add(s,'light',-6);add(s,'ultra',-8);add(s,'foldPower',-6);flags.push('Controllo del tronco gravemente ridotto')}
 if(d.head==='stable'){add(s,'light',1);add(s,'ultra',1);add(s,'foldPower',1)}
 if(d.head==='partial'){add(s,'postManual',5);add(s,'postPower',5);req.push('Supporto del capo da approfondire')}
 if(d.head==='none'){add(s,'postManual',10);add(s,'postPower',10);add(s,'light',-6);add(s,'ultra',-8);add(s,'foldPower',-6);flags.push('Controllo del capo assente / molto ridotto')}

 // Regole forti
 if(d.propulsion==='none' && (d.caregiver==='rare'||d.caregiver==='never') && ['both','mostly_outdoor','outdoor_only'].includes(d.context)){
   add(s,'foldPower',8);add(s,'postPower',8);reasons.push('assenza di autopropulsione con necessità di mobilità senza accompagnatore costante')
 }
 if(d.propulsion==='none' && ['always','often'].includes(d.caregiver) && ['local','occasional','na'].includes(d.outdoorUse||'na') && !['none'].includes(d.trunk) && !['none'].includes(d.head)){
   add(s,'light',6);reasons.push('spostamenti assistiti con caregiver disponibile')
 }
 if((d.trunk==='none'||d.head==='none') && ['most_day','primary'].includes(d.usage)){
   add(s,'postManual',8);add(s,'postPower',8);flags.push('Uso prolungato associato a importanti esigenze posturali')
 }
 if((d.trunk==='stable'&&d.head==='stable') && d.carTransport==='frequent' && d.preference==='power'){
   add(s,'foldPower',8);reasons.push('necessità di trasporto frequente con controllo posturale conservato')
 }
 // Ambiente
 if(d.barriers && d.barriers!=='none' && d.barrierSolution==='none'){
   flags.push('Barriere architettoniche senza soluzione di superamento indicata')
 }
 if(d.elevatorWidth){req.push('Compatibilità con apertura ascensore di '+d.elevatorWidth+' cm')}
 if(d.narrowWidth){req.push('Compatibilità con passaggio minimo di '+d.narrowWidth+' cm')}
 if(d.narrowPassages==='yes'){req.push('Ingombro e raggio di manovra contenuti')}
 if(['both','mostly_outdoor','outdoor_only'].includes(d.context)){req.push('Configurazione idonea anche all’uso esterno')}

 const ranked=Object.entries(s).sort((a,b)=>b[1]-a[1]);
 const [top,second]=ranked;
 const diff=top[1]-second[1];
 let confidence=diff>=6?'orientamento abbastanza netto':diff>=3?'orientamento moderato':'due soluzioni molto vicine: utile approfondimento';
 const name=(d.firstName||'').trim();
 let rationale=[];
 if(top[0]==='light') rationale.push('bassa o limitata autopropulsione, presenza di caregiver e utilizzo non intensivo favoriscono una soluzione manuale leggera e gestibile');
 if(top[0]==='ultra') rationale.push('autopropulsione, autonomia e uso esterno frequente favoriscono una carrozzina superleggera configurabile');
 if(top[0]==='foldPower') rationale.push('la necessità di mobilità autonoma con ridotta autopropulsione e buona trasportabilità favorisce una elettronica pieghevole');
 if(top[0]==='postPower') rationale.push('la combinazione di mobilità elettrica ed esigenze posturali/prolungate favorisce una elettronica posturale');
 if(top[0]==='postManual') rationale.push('la necessità di assistenza e di gestione posturale prolungata favorisce una carrozzina basculante/posturale manuale');

 let alt = labels[second[0]];
 let html=`<div class="result"><div class="small">Configurazione orientativa per ${name||'l’utente'}</div>
 <h2 style="margin-top:6px">${labels[top[0]]}</h2>
 <p>${rationale[0]||'Questa soluzione ha ottenuto il punteggio più alto sulla base delle risposte fornite.'}</p>
 <div class="score">Punteggio motore: ${top[1]} • ${confidence}</div></div>
 <p><strong>Alternativa da considerare:</strong> ${alt} <span class="score">(punteggio ${second[1]})</span></p>`;
 if(req.length) html+=`<div class="req"><strong>Requisiti emersi</strong><ul>${[...new Set(req)].map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
 if(flags.length) html+=`<div class="warn"><strong>Approfondimento consigliato</strong><ul>${[...new Set(flags)].map(x=>`<li>${x}</li>`).join('')}</ul><p class="small">In presenza di esigenze posturali importanti o barriere ambientali, il risultato automatico va verificato con una valutazione professionale.</p></div>`;
 html+=`<p class="small" style="margin-top:18px">Questo configuratore fornisce un orientamento preliminare sulla famiglia di ausilio e non sostituisce una valutazione professionale individuale.</p>`;
 window.__lastResult={d,labels,top,second,req:[...new Set(req)],flags:[...new Set(flags)]};
 document.getElementById('resultBox').innerHTML=html;
 const sp=document.getElementById('summaryPreview'); if(sp) sp.textContent=buildContactSummary();
}
show(0);

(function enhanceV2(){
  // Trasforma tutti i menu a tendina in gruppi di pulsanti.
  const selects=[...document.querySelectorAll('select')];
  selects.forEach(sel=>{
    const wrap=document.createElement('div');
    wrap.className='select-buttons';
    wrap.dataset.forSelect=sel.name;
    [...sel.options].forEach(opt=>{
      if(!opt.value) return; // salta placeholder "Seleziona"
      const b=document.createElement('button');
      b.type='button'; b.className='select-choice'; b.textContent=opt.textContent; b.dataset.value=opt.value;
      b.addEventListener('click',()=>{
        sel.value=opt.value;
        sel.dispatchEvent(new Event('change',{bubbles:true}));
        [...wrap.children].forEach(x=>x.classList.toggle('selected',x===b));
        maybeAdvance(sel.name);
      });
      wrap.appendChild(b);
    });
    sel.classList.add('enhanced-hidden');
    sel.insertAdjacentElement('afterend',wrap);
  });

  // Evidenzia e gestisce le scelte radio come veri pulsanti.
  document.querySelectorAll('label.option input[type=radio]').forEach(r=>{
    r.addEventListener('change',()=>{
      document.querySelectorAll(`input[type=radio][name="${r.name}"]`).forEach(x=>x.closest('label.option')?.classList.toggle('selected',x.checked));
      if(r.name==='requestType' && document.querySelector('[name=firstName]').value.trim() && document.querySelector('[name=lastName]').value.trim()){
        setTimeout(()=>{ r.value==='new' ? show(2) : show(1); },160);
      }
      if(r.name==='renewalReason' && r.value==='changed') setTimeout(()=>show(2),160);
      if(r.name==='ageGroup'){
        const a=document.querySelector('input[name=area]:checked')?.value;
        if(a==='seated' && r.value==='adult') setTimeout(()=>show(3),160);
      }
      if(r.name==='area'){
        const ag=document.querySelector('input[name=ageGroup]:checked')?.value;
        if(r.value==='seated' && ag==='adult') setTimeout(()=>show(3),160);
      }
    });
  });

  function maybeAdvance(name){
    // Avanzamento automatico solo quando la risposta chiude davvero una sezione.
    if(name==='context' && current===3 && document.querySelector('input[name=preference]:checked')) setTimeout(()=>show(4),160);
    if(name==='carTransport' && current===5 && document.querySelector('select[name=usage]').value) setTimeout(()=>show(6),160);
    if(name==='outdoorUse' && current===6 && document.querySelector('select[name=propulsion]').value && document.querySelector('select[name=caregiver]').value) setTimeout(()=>show(7),160);
    if(name==='head' && current===7 && document.querySelector('select[name=trunk]').value) setTimeout(()=>show(8),160);
  }

  // Se l'utente sceglie "solo interno", la domanda sull'esterno non è necessaria.
  const contextSel=document.querySelector('select[name=context]');
  if(contextSel){
    contextSel.addEventListener('change',()=>{
      const outQ=document.querySelector('select[name=outdoorUse]')?.closest('.field');
      if(outQ){
        const hide=contextSel.value==='indoor_only';
        outQ.classList.toggle('hidden',hide);
        if(hide) document.querySelector('select[name=outdoorUse]').value='na';
      }
    });
  }

  // I pulsanti corrispondenti ai select riflettono eventuali valori già impostati.
  function syncButtons(){
    document.querySelectorAll('select.enhanced-hidden').forEach(sel=>{
      const w=document.querySelector(`.select-buttons[data-for-select="${sel.name}"]`);
      if(!w) return;
      [...w.children].forEach(b=>b.classList.toggle('selected',b.dataset.value===sel.value));
    });
  }
  document.addEventListener('change',syncButtons);
  syncButtons();
})();

// === CONTATTI ===
// Numero in formato internazionale SENZA + e senza spazi. Es.: 393331234567
const WHATSAPP_NUMBER = '393403951866';
const CONTACT_EMAIL = 'altramobilita@gmail.com';

function friendly(name,value){
 const m={
  requestType:{new:'Nuovo ausilio',renewal:'Rinnovo / sostituzione'},
  renewalReason:{wear:'Usura / tempo trascorso',changed:'Non più adeguato / mutate esigenze'},
  funding:{asl:'Fornitura ASL / SSN',private:'Acquisto privato',unknown:'Non lo so'},
  area:{seated:'Mobilità da seduto',standing:'Mobilità / posizione in piedi',orthosis:'Tutore / ortesi'},
  ageGroup:{adult:'Adulto',pediatric:'Pediatrico'},preference:{manual:'Manuale',power:'Elettronica',unknown:'Non lo so'},
  context:{indoor_only:'Solo interno',mostly_indoor:'Prevalentemente interno',both:'Interno ed esterno',mostly_outdoor:'Prevalentemente esterno',outdoor_only:'Solo esterno'},
  usage:{occasional:'Occasionale',limited:'Alcune volte al giorno',hours:'Diverse ore al giorno',most_day:'Gran parte della giornata',primary:'Seduta principale'},
  propulsion:{independent:'Autopropulsione autonoma',fatigue:'Autopropulsione con fatica',short:'Autopropulsione per brevi tratti',none:'Nessuna autopropulsione',unknown:'Non lo so'},
  caregiver:{always:'Sempre',often:'Spesso',sometimes:'Occasionale',rare:'Raramente',never:'Mai',unknown:'Non lo so'},
  trunk:{stable:'Stabile',partial:'Parzialmente stabile',none:'Non stabile',unknown:'Non lo so'},head:{stable:'Stabile',partial:'Parziale',none:'Assente',unknown:'Non lo so'},
  carTransport:{frequent:'Frequente',occasional:'Occasionale',rare:'Raro',never:'Mai',unknown:'Non lo so'},outdoorUse:{local:'Brevi spostamenti vicino casa',long:'Tragitti lunghi',occasional:'Uscite occasionali',daily:'Spostamenti quotidiani',na:'Non pertinente'}
 };
 return (m[name]&&m[name][value])||value||'';
}
function buildContactSummary(){
 const d=fd(); const r=window.__lastResult||{};
 const resultTitle=document.querySelector('#resultBox .result h2')?.textContent||'Da definire';
 const lines=[
  'RICHIESTA INFORMAZIONI - GUIDA AUSILI','',
  `Paziente: ${d.firstName||''} ${d.lastName||''}`,
  `Richiesta: ${friendly('requestType',d.requestType)}`,
  d.renewalReason?`Motivo rinnovo: ${friendly('renewalReason',d.renewalReason)}`:'',
  d.deviceYear?`Ausilio attuale dal: ${d.deviceYear}`:'',
  d.funding?`Provenienza: ${friendly('funding',d.funding)}`:'',
  `Percorso: ${friendly('area',d.area)} - ${friendly('ageGroup',d.ageGroup)}`,
  `Preferenza: ${friendly('preference',d.preference)}`,
  `Contesto: ${friendly('context',d.context)}`,
  `Utilizzo: ${friendly('usage',d.usage)}`,
  `Autopropulsione: ${friendly('propulsion',d.propulsion)}`,
  `Caregiver: ${friendly('caregiver',d.caregiver)}`,
  d.outdoorUse?`Uso esterno: ${friendly('outdoorUse',d.outdoorUse)}`:'',
  `Tronco: ${friendly('trunk',d.trunk)}`,
  `Capo: ${friendly('head',d.head)}`,
  `Trasporto auto: ${friendly('carTransport',d.carTransport)}`,
  d.elevatorWidth?`Apertura ascensore: ${d.elevatorWidth} cm`:'',
  d.narrowWidth?`Passaggio minimo: ${d.narrowWidth} cm`:'',
  '',`SOLUZIONE CONFIGURATA: ${resultTitle}`,
  r.req&&r.req.length?`Requisiti: ${r.req.join(', ')}`:'',
  r.flags&&r.flags.length?`Da approfondire: ${r.flags.join(', ')}`:'',
  '',`Recapito inserito: ${d.contactEmail||d.contactPhone||'non indicato'}`,
  'Vorrei ricevere maggiori informazioni / una consulenza gratuita.'
 ].filter(Boolean);
 return lines.join('\n');
}
function sendWhatsApp(){
 const d=fd(); if(!d.contactConsent){alert('Seleziona il consenso al ricontatto prima di inviare.');return;}
 if(WHATSAPP_NUMBER.includes('X')){alert('Nel prototipo devi ancora inserire il numero WhatsApp predefinito.');return;}
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildContactSummary())}`,'_blank');
}
function sendEmail(){
 const d=fd(); if(!d.contactConsent){alert('Seleziona il consenso al ricontatto prima di inviare.');return;}
 if(CONTACT_EMAIL.includes('tuamail')){alert('Nel prototipo devi ancora inserire l’indirizzo email predefinito.');return;}
 const subject=encodeURIComponent('Richiesta informazioni - Guida Ausili');
 const body=encodeURIComponent(buildContactSummary());
 window.location.href=`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
