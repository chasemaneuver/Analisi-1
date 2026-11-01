'use strict';
// Tutti i laboratori usano soltanto SVG e JavaScript del browser.
const B='#276aa0', O='#b75a31', G='#236454', TAU=2*Math.PI;
const fmt=(x,n=4)=>Math.abs(x)<1e-12?'0':Number(x.toPrecision(n)).toLocaleString('it-IT',{maximumFractionDigits:10});
const seq=(a,b,n=240)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));
function escapeText(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function plot(title,xmin,xmax,ymin,ymax,{equal=false,xlabel='x',ylabel='y'}={}){
  const W=700,H=390,L=58,T=32,R=22,D=52;
  let w=W-L-R,h=H-T-D,ox=L,oy=T;
  if(equal){const scale=Math.min(w/(xmax-xmin),h/(ymax-ymin));const nw=(xmax-xmin)*scale,nh=(ymax-ymin)*scale;ox+=(w-nw)/2;oy+=(h-nh)/2;w=nw;h=nh;}
  const X=x=>ox+(x-xmin)*w/(xmax-xmin),Y=y=>oy+h-(y-ymin)*h/(ymax-ymin);
  let elements=[];
  const line=(x1,y1,x2,y2,color='#cdd8d1',dash='')=>elements.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${color}" stroke-width="1.6" ${dash?'stroke-dasharray="'+dash+'"':''}/>`);
  const label=(x,y,t,c='#60706a',dx=0,dy=0)=>elements.push(`<text x="${X(x)+dx}" y="${Y(y)+dy}" fill="${c}" text-anchor="middle">${escapeText(t)}</text>`);
  for(let j=0;j<=4;j++){const x=xmin+(xmax-xmin)*j/4,y=ymin+(ymax-ymin)*j/4;line(x,ymin,x,ymax,'#edf0eb');line(xmin,y,xmax,y,'#edf0eb');label(x,ymin,fmt(x,3),'#60706a',0,22);label(xmin,y,fmt(y,3),'#60706a',-30,4);}
  if(ymin<=0&&ymax>=0)line(xmin,0,xmax,0,'#94a79b');
  if(xmin<=0&&xmax>=0)line(0,ymin,0,ymax,'#94a79b');
  const path=(points,color=B,fill='none',dash='',width=2)=>{if(!points.length)return;elements.push(`<path d="${points.map(([x,y],i)=>(i?'L':'M')+X(x).toFixed(3)+','+Y(y).toFixed(3)).join(' ')}" stroke="${color}" fill="${fill}" stroke-width="${width}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`);};
  const circle=(x,y,r,color=B,fill='none',dash='')=>elements.push(`<ellipse cx="${X(x)}" cy="${Y(y)}" rx="${r*w/(xmax-xmin)}" ry="${r*h/(ymax-ymin)}" stroke="${color}" fill="${fill}" stroke-width="2" ${dash?'stroke-dasharray="'+dash+'"':''}/>`);
  const point=(x,y,color=B,open=false,radius=4.5)=>elements.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="${radius}" fill="${open?'white':color}" stroke="${color}" stroke-width="2"/>`);
  const rect=(x1,y1,x2,y2,fill)=>elements.push(`<rect x="${Math.min(X(x1),X(x2))}" y="${Math.min(Y(y1),Y(y2))}" width="${Math.abs(X(x2)-X(x1))}" height="${Math.abs(Y(y2)-Y(y1))}" fill="${fill}"/>`);
  const svg=()=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeText(title)}"><title>${escapeText(title)}</title><text x="350" y="18" text-anchor="middle" fill="${G}">${escapeText(title)}</text>${elements.join('')}<text x="350" y="383" text-anchor="middle" fill="#60706a">${escapeText(xlabel)}</text><text x="12" y="26" fill="#60706a">${escapeText(ylabel)}</text></svg>`;
  return {line,label,path,circle,point,rect,svg};
}
function curve(p,f,a,b,lo,hi,color=B,n=800){let part=[];const flush=()=>{if(part.length>1)p.path(part,color);part=[];};for(const x of seq(a,b,n)){const y=f(x);if(!Number.isFinite(y)||y<lo||y>hi){flush();continue;}if(part.length&&Math.abs(y-part.at(-1)[1])>(hi-lo)*.2)flush();part.push([x,y]);}flush();}
function gcd(a,b){while(b)[a,b]=[b,a%b];return a;}
function rationalPower(x,p,q){const d=gcd(Math.abs(p),q);p/=d;q/=d;if(x<0){if(q%2===0)return NaN;return (Math.abs(p)%2?-1:1)*Math.abs(x)**(p/q);}if(x===0&&p<0)return NaN;return x**(p/q);}
function graphValue(id,x,v={}){switch(id){
case 1:return x<0?0:x>0?1:Number(v.h??1);
case 2:return Math.sign(x);case 3:return Math.abs(x);case 4:return Math.max(0,x);case 5:return Math.floor(x);case 6:return x-Math.floor(x);
case 7:return rationalPower(x,v.p??1,v.q??3);case 8:return rationalPower(x,-(v.p??1),v.q??1);case 9:return x>0?x**(v.alpha??.5):NaN;
case 10:return 1/(1+x*x);case 11:return Math.abs(x)===1?NaN:1/(1-x*x);case 12:return Math.abs(x)>=1?Math.sqrt(x*x-1):NaN;case 13:return Math.abs(x)<=1?Math.sqrt(1-x*x):NaN;
case 14:return Math.exp(x);case 15:return (v.base??2)**x;case 16:return Math.sinh(x);case 17:return Math.tanh(x);case 18:return x>0?Math.log(x):NaN;
case 19:return x>0&&Number(v.base??2)!==1?Math.log(x)/Math.log(v.base??2):NaN;case 20:return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
case 21:return x!==0?Math.exp(-1/(x*x)):v.extend==='Prolungata'?0:NaN;case 22:return x>0?x*Math.log(x):NaN;case 23:return x>0?Math.exp(x*Math.log(x)):NaN;
case 24:return Math.sin(x);case 25:return Math.cos(x);case 26:return Math.abs(x)<=1?Math.asin(x):NaN;case 27:return Math.abs(x)<=1?Math.acos(x):NaN;
case 28:return Math.abs(Math.cos(x))>1e-12?Math.tan(x):NaN;case 29:return Math.atan(x);case 30:return Math.sin(x)**2;case 31:return Math.sin(x)**3;case 32:return Math.sin(x)>=0?Math.sqrt(Math.sin(x)):NaN;
case 33:return x!==0?Math.sin(x)/x:v.extend==='Prolungata'?1:NaN;case 34:return Math.sin(x*x);case 35:return x*Math.sin(x);case 36:return x!==0?Math.sin(1/x):NaN;
case 37:return x!==0?x*Math.sin(1/x):v.extend==='Prolungata'?0:NaN;case 38:return x**(v.n??2)*Math.exp(-x);case 39:return x**(v.n??2)*Math.exp(-x*x);default:return NaN;}}
const frames={1:[-4,4,-.5,1.5],2:[-4,4,-1.5,1.5],3:[-4,4,-1,5],4:[-4,4,-1,5],5:[-4,4,-5,5],6:[-4,4,-.25,1.25],7:[-3,3,-4,4],8:[-3,3,-4,4],9:[0,3,-.5,4],10:[-4,4,-.2,1.4],11:[-4,4,-4,4],12:[-4,4,-1,5],13:[-1.4,1.4,-.2,1.4],14:[-3,3,-.5,6],15:[-3,3,-.5,6],16:[-3,3,-4,6],17:[-4,4,-1.5,1.5],18:[-1,5,-4,3],19:[-1,5,-4,4],20:[-4,4,-.1,.5],21:[-4,4,-.1,1.2],22:[-.5,4,-1,6],23:[-.5,2.5,-.2,5],24:[-2*Math.PI,2*Math.PI,-1.5,1.5],25:[-2*Math.PI,2*Math.PI,-1.5,1.5],26:[-1.4,1.4,-2,2],27:[-1.4,1.4,-.3,3.5],28:[-2*Math.PI,2*Math.PI,-4,4],29:[-6,6,-2,2],30:[-2*Math.PI,2*Math.PI,-.2,1.4],31:[-2*Math.PI,2*Math.PI,-1.5,1.5],32:[-2*Math.PI,2*Math.PI,-1.5,1.5],33:[-20,20,-.5,1.5],34:[-8,8,-1.5,1.5],35:[-10,10,-10,10],36:[-2,2,-1.5,1.5],37:[-2,2,-2,2],38:[-2,8,-2,8],39:[-4,4,-.8,.8]};
const graphNames=['','Gradino di Heaviside','Segno','Valore assoluto','Parte positiva','Parte intera','Parte frazionaria','Potenza razionale positiva','Potenza razionale negativa','Potenza reale su x > 0','1 / (1 + x²)','1 / (1 − x²)','Radice di x² − 1','Semicirconferenza superiore','exp(x) e exp(−x)','Esponenziale aˣ','Seno e coseno iperbolici','Tangente iperbolica','Logaritmo naturale','Logaritmo in base a','Campana di Gauss','exp(−1/x²)','x log(x)','xˣ','Seno','Coseno','Arcoseno','Arcocoseno','Tangente','Arcotangente','sin²(x) e |sin(x)|','sin³(x) e sin(x)','Radice del seno','sin(x) / x','sin(x²)','x sin(x)','sin(1/x)','x sin(1/x)','xⁿ exp(−x)','xⁿ exp(−x²)'];
function partitionCurve(p,f,lo,hi,ylo,yhi,cuts=[],color=B){const points=[lo,...cuts.filter(x=>x>lo&&x<hi),hi].sort((a,b)=>a-b);for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j],eps=Math.min(1e-6,(b-a)/1000);curve(p,f,a+eps,b-eps,ylo,yhi,color,Math.max(220,Math.ceil((b-a)/(hi-lo)*2200)));}}
function oscillatingPoints(id,side,R,limit=200){const t0=1/R,ts=seq(t0,limit,Math.max(300,Math.ceil(limit*24)));return ts.map(t=>{const x=side/t;return[x,graphValue(id,x)];});}
function graphRender(id,v){const base=frames[id],z=v.zoom??1,[a,b,c,d]=base.map(x=>x*z),p=plot(graphNames[id],a,b,c,d,{equal:id===13});let note='Blu: funzione principale. I tratti fuori dalla finestra sono omessi; lo zoom cambia la finestra, non la funzione.';
const dot=(x,y,open=false,col=B)=>{if(x>=a&&x<=b&&y>=c&&y<=d)p.point(x,y,col,open);};
const horizontal=y=>{if(y>=c&&y<=d)p.line(a,y,b,y,G,'5 4');};
const vertical=x=>{if(x>=a&&x<=b)p.line(x,c,x,d,G,'5 4');};
if(id<=2){const left=id===1?0:-1,right=1;p.line(a,left,0,left,B);p.line(0,right,b,right,B);dot(0,left,true);dot(0,right,true);dot(0,id===1?Number(v.h):0,false,O);note='I cerchi vuoti escludono gli estremi dei tratti; il punto arancio assegna il valore in zero.';}
else if(id===5||id===6){for(let k=Math.floor(a);k<=Math.floor(b);k++){const lo=Math.max(a,k),hi=Math.min(b,k+1);if(hi<=lo)continue;p.line(lo,id===5?k:lo-k,hi,id===5?k:hi-k,B);dot(k,id===5?k:0);dot(k+1,id===5?k:1,true);}note='Punto pieno all’estremo sinistro, vuoto all’estremo destro di ciascun intervallo [k, k+1). Nessun segmento unisce i salti.';}
else if(id===36||id===37){for(const side of [-1,1])p.path(oscillatingPoints(id,side,Math.max(Math.abs(a),Math.abs(b))),B);if(id===37){p.line(a,Math.abs(a),0,0,G,'4 4');p.line(0,0,b,Math.abs(b),G,'4 4');p.line(a,-Math.abs(a),0,0,G,'4 4');p.line(0,0,b,-Math.abs(b),G,'4 4');if(v.extend==='Prolungata')dot(0,0,false,O);else dot(0,0,true);horizontal(1);}else{horizontal(-1);horizontal(1);}note='Campionamento nella variabile t = 1/|x|, fino a t = 200: non sono disegnati i valori con 0 < |x| < 0,005. La fascia omessa non rappresenta una zona senza oscillazioni.';}
else{let cuts=[0],f=x=>graphValue(id,x,v);
if(id===11){cuts.push(-1,1);vertical(-1);vertical(1);horizontal(0);}
if(id===12)cuts.push(-1,1);
if([13,26,27].includes(id))cuts.push(-1,1);
if(id===28){for(let k=-20;k<=20;k++){const x=Math.PI/2+k*Math.PI;if(x>a&&x<b){cuts.push(x);vertical(x);}}}
if(id===32){for(let k=-20;k<=20;k++)cuts.push(k*Math.PI);}
partitionCurve(p,f,a,b,c,d,cuts);
if(id===3||id===4)dot(0,0);
if(id===7){dot(0,0);note=`Esponente ridotto: ${v.p/gcd(v.p,v.q)}/${v.q/gcd(v.p,v.q)}. Basi negative ammesse solo con denominatore ridotto dispari. Blu: potenza reale nel suo dominio.`;}
if(id===8){vertical(0);horizontal(0);note=`Esponente ridotto: −${v.p/gcd(v.p,v.q)}/${v.q/gcd(v.p,v.q)}. Zero escluso; basi negative ammesse solo con denominatore ridotto dispari.`;}
if(id===9)dot(0,0,true);
if(id===10||id===20)horizontal(0);
if(id===12){partitionCurve(p,x=>Math.abs(x),a,b,c,d,[0],O);dot(-1,0);dot(1,0);note='Arancio: asintoti y = −x a sinistra e y = x a destra. I punti (−1, 0) e (1, 0) sono inclusi.';}
if(id===13){dot(-1,0);dot(1,0);}
if(id===14){partitionCurve(p,x=>Math.exp(-x),a,b,c,d,[],O);note='Blu: exp(x); arancio: exp(−x).';}
if(id===15){note=`Base a = ${fmt(v.base)}. ${v.base===1?'Funzione costante uguale a 1.':v.base>1?'Esponenziale crescente.':'Esponenziale decrescente.'}`;}
if(id===16){partitionCurve(p,Math.cosh,a,b,c,d,[],O);partitionCurve(p,x=>Math.exp(x)/2,a,b,c,d,[],G);note='Blu: sinh(x); arancio: cosh(x); verde: exp(x)/2. Il confronto è asintotico per x → +∞.';}
if(id===17){horizontal(-1);horizontal(1);}
if(id===18||id===19)vertical(0);
if(id===19)note=`Base a = ${fmt(Number(v.base))}; la base 1 è esclusa dal selettore. ${Number(v.base)>1?'Logaritmo crescente.':'Logaritmo decrescente.'}`;
if(id===21){dot(0,0,v.extend!=='Prolungata');horizontal(1);note=`In zero: ${v.extend==='Prolungata'?'valore assegnato 0 (prolungamento continuo)':'punto escluso'}. Il segno nell’esponente è negativo.`;}
if(id===22){dot(0,0,true);dot(1/Math.E,-1/Math.E,false,O);note='Punto vuoto: limite in zero; arancio: minimo (1/e, −1/e).';}
if(id===23){dot(0,1,true);dot(1/Math.E,Math.exp(-1/Math.E),false,O);note='Punto vuoto: limite 1 in zero; arancio: minimo (1/e, exp(−1/e)).';}
if(id===26){dot(-1,-Math.PI/2);dot(1,Math.PI/2);}
if(id===27){dot(-1,Math.PI);dot(1,0);}
if(id===29){horizontal(-Math.PI/2);horizontal(Math.PI/2);}
if(id===30){partitionCurve(p,x=>Math.abs(Math.sin(x)),a,b,c,d,[],O);note='Blu: sin²(x); arancio: |sin(x)|. La prima non supera la seconda.';}
if(id===31||id===32){partitionCurve(p,Math.sin,a,b,c,d,[],O);note=id===31?'Blu: sin³(x); arancio: sin(x).':'Blu: radice reale di sin(x), solo nei tratti dove sin(x) ≥ 0; arancio: sin(x).';if(id===32)for(let k=-20;k<=20;k++)dot(k*Math.PI,0);}
if(id===33){dot(0,1,v.extend!=='Prolungata');note=`In zero: ${v.extend==='Prolungata'?'valore assegnato 1 (prolungamento continuo)':'punto escluso, limite 1'}. La stima |sin(x)/x| ≤ 1/|x| controlla la coda, non è un’uguaglianza.`;}
if(id===35){partitionCurve(p,x=>Math.abs(x),a,b,c,d,[0],G);partitionCurve(p,x=>-Math.abs(x),a,b,c,d,[0],G);}
if(id===38){horizontal(0);dot(v.n,v.n**v.n*Math.exp(-v.n),false,O);note=`n = ${v.n}. Arancio: massimo sul semiasse positivo in x = n. Un tratto negativo può uscire dalla finestra senza smettere di esistere.`;}
if(id===39){horizontal(0);const m=Math.sqrt(v.n/2);dot(m,graphValue(id,m,v),false,O);dot(-m,graphValue(id,-m,v),false,O);note=`n = ${v.n}. Arancio: punti stazionari non nulli in ±√(n/2). Entrambe le code tendono a zero.`;}
}
return[p.svg(),note];}
const labs={};
for(let id=1;id<=39;id++){const controls=[['zoom','Ampiezza della finestra',.5,2,.25,1]];
if(id===1)controls.push(['h','Valore H(0)',['0','0.5','1'],'1']);
if(id===7||id===8)controls.push(['p','Numeratore positivo p',1,6,1,1],['q','Denominatore positivo q',1,6,1,id===7?3:1]);
if(id===9)controls.push(['alpha','Esponente α',.1,3,.1,.5]);
if(id===15)controls.push(['base','Base a',.25,3,.25,2]);
if(id===19)controls.push(['base','Base a',['0.1','0.5','0.8','1.25','2','10'],'2']);
if([21,33,37].includes(id))controls.push(['extend','Valore in zero',['Esclusa in zero','Prolungata'],'Esclusa in zero']);
if(id===38||id===39)controls.push(['n','Potenza intera n',1,4,1,2]);
labs[id]={controls,render(v){return graphRender(id,v);}};}
function mount(el){const id=Number(el.dataset.lab),lab=labs[id],values={},defaults={};
  el.innerHTML=`<div class="lab-top"><strong>ESPLORA · FIGURA ${id.toString().padStart(2,'0')}</strong><button type="button">Ripristina</button></div><div class="controls"></div><div class="graph"></div><div class="result" aria-live="polite" aria-atomic="true"></div>`;
  const controls=el.querySelector('.controls');
  lab.controls.forEach(c=>{const [key,title,a,b,step,initial]=c,select=Array.isArray(a),value=select?b:initial;values[key]=defaults[key]=value;const label=document.createElement('label');label.className='control';label.innerHTML=`<span>${title}<output id="val-${id}-${key}"></output></span>`;const input=document.createElement(select?'select':'input');input.id=`control-${id}-${key}`;input.setAttribute('aria-label',`Laboratorio ${id}: ${title}`);
    if(select)a.forEach(text=>{const op=document.createElement('option');op.textContent=text;op.value=text;input.append(op);});else{input.type='range';input.min=a;input.max=b;input.step=step;}input.value=value;input.dataset.key=key;label.append(input);controls.append(label);input.addEventListener('input',()=>{values[key]=select?input.value:Number(input.value);render();});
  });
  function render(){const [svg,text]=lab.render(values);el.querySelector('.graph').innerHTML=svg;el.querySelector('.result').innerHTML=text;lab.controls.forEach(c=>{el.querySelector(`#val-${id}-${c[0]}`).textContent=Array.isArray(c[2])?'':fmt(values[c[0]],5);});}
  el.querySelector('button').addEventListener('click',()=>{Object.assign(values,defaults);controls.querySelectorAll('input,select').forEach(x=>x.value=values[x.dataset.key]);render();});render();
}
if(typeof document!=='undefined'){
  document.querySelectorAll('[data-lab]').forEach(el=>{try{mount(el);}catch(e){el.innerHTML='<p class="avviso">Questo laboratorio non è disponibile nel browser in uso. Prova una versione aggiornata di Edge, Firefox, Chrome o Safari.</p>';console.error(e);}});
  const exerciseDetails=[...document.querySelectorAll('details.esercizio')];let printState=[];
  window.addEventListener('beforeprint',()=>{printState=exerciseDetails.map(d=>d.open);exerciseDetails.forEach(d=>d.open=true);});
  window.addEventListener('afterprint',()=>exerciseDetails.forEach((d,i)=>d.open=printState[i]));
  document.querySelector('#stampa').addEventListener('click',()=>window.print());
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-10% 0px -70% 0px'});document.querySelectorAll('h2[id]').forEach(h=>observer.observe(h));}
}






if(typeof module!=='undefined')module.exports={labs,rationalPower,graphValue,oscillatingPoints};
