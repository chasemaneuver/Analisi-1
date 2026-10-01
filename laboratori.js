'use strict';
// Tutti i laboratori usano soltanto SVG e JavaScript del browser.
const B='#276aa0', O='#b75a31', G='#236454', TAU=2*Math.PI;
const fmt=(x,n=4)=>Math.abs(x)<1e-12?'0':Number(x.toPrecision(n)).toLocaleString('it-IT',{maximumFractionDigits:10});
const seq=(a,b,n=240)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));
const gcd=(a,b)=>b?gcd(b,a%b):a;
function isqrt(n){if(n<2n)return n;let x=n,y=(x+1n)/2n;while(y<x){x=y;y=(x+n/x)/2n;}return x;}
function rootInterval(d){const s=10n**BigInt(d),p=isqrt(2n*s*s);return {s,p,lower:Number(p)/Number(s),upper:Number(p+1n)/Number(s)};}
function roots(n,r,phi){const R=r**(1/n);return Array.from({length:n},(_,k)=>{const a=(phi+TAU*k)/n;return [R*Math.cos(a),R*Math.sin(a)];});}
function multiply(rho,theta){return [rho*(Math.cos(theta)-.5*Math.sin(theta)),rho*(Math.sin(theta)+.5*Math.cos(theta))];}
function pascal(n){let row=[1];for(let j=1;j<=n;j++)row.push(row[j-1]*(n-j+1)/j);return row;}
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
  const point=(x,y,color=B,open=false)=>elements.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="${open?'white':color}" stroke="${color}" stroke-width="2"/>`);
  const rect=(x1,y1,x2,y2,fill)=>elements.push(`<rect x="${Math.min(X(x1),X(x2))}" y="${Math.min(Y(y1),Y(y2))}" width="${Math.abs(X(x2)-X(x1))}" height="${Math.abs(Y(y2)-Y(y1))}" fill="${fill}"/>`);
  const svg=()=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeText(title)}"><title>${escapeText(title)}</title><text x="350" y="18" text-anchor="middle" fill="${G}">${escapeText(title)}</text>${elements.join('')}<text x="350" y="383" text-anchor="middle" fill="#60706a">${escapeText(xlabel)}</text><text x="12" y="26" fill="#60706a">${escapeText(ylabel)}</text></svg>`;
  return {line,label,path,circle,point,rect,svg};
}
const labs={
1:{controls:[['operazione','Operazione',['Intersezione','Unione','A meno B','Complementare di A'],'Intersezione'],['d','Distanza dei centri',0,2.8,.1,1]],render(v){
  const p=plot(v.operazione+' · universo: il rettangolo',-3,3,-1.8,1.8,{equal:true,xlabel:'',ylabel:''});
  // Riempiamo segmenti orizzontali calcolati dalle sezioni esatte dei dischi.
  for(let y=-1.8;y<1.8;y+=.015){let intervals=[];const inside=Math.abs(y)<1,t=inside?Math.sqrt(1-y*y):0;
    const a=[-v.d/2-t,-v.d/2+t],b=[v.d/2-t,v.d/2+t];
    if(v.operazione==='Complementare di A')intervals=inside?[[-3,a[0]],[a[1],3]]:[[-3,3]];
    else if(inside){if(v.operazione==='Intersezione'&&b[0]<=a[1])intervals=[[b[0],a[1]]];
      if(v.operazione==='Unione')intervals=b[0]<=a[1]?[[a[0],b[1]]]:[a,b];
      if(v.operazione==='A meno B')intervals=[[a[0],Math.min(a[1],b[0])]];}
    intervals.forEach(([a,b])=>p.rect(a,y,b,y+.016,'#b8d5ce'));
  }
  p.circle(-v.d/2,0,1,B);p.circle(v.d/2,0,1,O);p.label(-v.d/2,1.2,'A',B);p.label(v.d/2,1.2,'B',O);if(v.d===2&&v.operazione==='Intersezione')p.point(0,0,G);
  return [p.svg(),v.d>2?'I dischi sono disgiunti: A ∩ B = ∅.':v.d===2?'I dischi chiusi si toccano in un punto: l’intersezione non è vuota.':'I dischi hanno punti in comune. I bordi sono inclusi nei dischi; il tratto ha uno spessore soltanto grafico.'];
}},
2:{controls:[['q','Ragione q',-1.5,1.5,.1,.5],['n','Indice finale n',0,16,1,8]],render(v){
  const terms=Array.from({length:v.n+1},(_,k)=>v.q**k);let sum=0;const sums=terms.map(x=>sum+=x);
  function chart(values,title,color,bars){let lo=Math.min(0,...values),hi=Math.max(1,...values),pad=(hi-lo)*.1;const p=plot(title,-.5,v.n+.5,lo-pad,hi+pad,{xlabel:'k',ylabel:''});
    if(bars)values.forEach((x,k)=>p.rect(k-.28,0,k+.28,x,color));else {p.path(values.map((x,k)=>[k,x]),color);values.forEach((x,k)=>p.point(k,x,color));}return p.svg();}
  return [chart(terms,'Termini qᵏ',B,true)+chart(sums,'Somme parziali ∑ qᵏ',O,false),`Somma di ${v.n+1} addendi: <strong>${fmt(sum,8)}</strong>.<br>Riga ${v.n} del triangolo di Tartaglia: ${pascal(v.n).join(' · ')}.<br>Per q = 1 la somma vale n + 1. Sono somme finite.`];
}},
3:{controls:[['N','Indice massimo N',1,150,1,15],['eps','ε',.02,1,.02,.3]],render(v){
  const p=plot('Elementi xₙ = 1 − 2/(n+1), da n = 0 a N',-1.15,1.2,-.2,.5,{xlabel:'Retta reale',ylabel:''});p.rect(1-v.eps,-.12,1,.25,'#deecdf');p.line(1,-.15,1,.3,O,'5 4');
  for(let n=0;n<=v.N;n++)p.point(1-2/(n+1),0,B);
  p.point(1,0,O,true);const n=Math.floor(2/v.eps)+1;p.label(1-v.eps/2,.37,'(1 − ε, 1)',G);
  return [p.svg(),`Il campione ha ${v.N+1} elementi e massimo <strong>${fmt(1-2/(v.N+1),7)}</strong>. L’insieme infinito ha supremo 1 e nessun massimo.<br>Un indice sufficiente è n = ${n}: xₙ = ${fmt(1-2/(n+1),7)}. ${n<=v.N?'È nel campione.':'Aumenta N per includerlo nel campione.'}`];
}},
4:{controls:[['d','Cifre decimali',0,8,1,3]],render(v){
  const {s,p,lower,upper}=rootInterval(v.d),x=(Math.SQRT2-lower)*Number(s);const g=plot('Zoom sull’intervallo certificato',-.1,1.1,-.15,.3,{xlabel:'Posizione relativa: 0 = estremo inferiore, 1 = estremo superiore',ylabel:''});g.path([[0,0],[1,0]],B,'none','',5);g.point(x,0,O);g.label(x,.09,'√2 (posizione approssimata)',O);
  return [g.svg(),`<strong>${lower.toFixed(v.d)} &lt; √2 &lt; ${upper.toFixed(v.d)}</strong><br>Certificato esatto con interi: ${p}² &lt; 2 × ${s}² &lt; ${p+1n}².<br>Ampiezza: 1/${s}. La posizione del punto è approssimata; il confronto fra interi è esatto.<br>In virgola mobile 0,1 + 0,2 può differire da 0,3; con frazioni esatte 1/10 + 2/10 = 3/10.`];
}},
5:{controls:[['d','Diagonali',2,10,1,6]],render(v){
  const pairs=[];for(let s=2;s<=v.d+1;s++)for(let a=1;a<s;a++)if(gcd(a,s-a)===1)pairs.push([a,s-a]);
  const p=plot('Visita dei razionali positivi in forma ridotta',0,v.d+1,0,v.d+1,{equal:true,xlabel:'Numeratore p',ylabel:'q'});pairs.forEach(([a,b],i)=>{p.point(a,b);p.label(a,b,i+1,B,9,-7);});
  let rows='',digits='';for(let i=0;i<v.d;i++){let row='';for(let j=0;j<v.d;j++){const z=(i*7+j*3+i*j+2)%10;if(i===j)digits+=z<=4?'5':'4';row+=`<td class="${i===j?'diag':''}">${z}</td>`;}rows+=`<tr><th>r${i+1} = 0,</th>${row}<td>…</td></tr>`;}
  return [p.svg(),`Prefisso di ℚ positivi: ${pairs.map(([a,b])=>b===1?a:`${a}/${b}`).join(', ')}.<div class="diagonale"><table aria-label="Cifre simulate e diagonale evidenziata"><tbody>${rows}</tbody></table></div>Nuovo numero: <strong>0,${digits}…</strong>. La cifra i è diversa dalla cifra i della riga i.<br>È un’illustrazione finita del procedimento, non una prova della non numerabilità.`];
}},
6:{controls:[['n','Esponente n',1,10,1,3]],render(v){
  const pts=seq(-1,1.5).map(x=>[x,(1+x)**v.n-(1+v.n*x)]);const ymax=Math.max(1,...pts.map(p=>p[1]));const p=plot(`Bernoulli · n = ${v.n}`,-1,1.5,-ymax*.05,ymax*1.1,{xlabel:'x ≥ −1',ylabel:'Differenza'});p.path([[-1,0],...pts,[1.5,0]],'none','#e1eddf');p.path(pts,B);return [p.svg(),`Differenza (1 + x)ⁿ − (1 + nx). ${v.n===1?'Per n = 1 è identicamente zero.':'Per n > 1 si annulla in x = 0 ed è positiva negli altri punti del dominio x ≥ −1.'} Il grafico illustra la disuguaglianza; la prova è per induzione.`];
}},
7:{controls:[['rho','Modulo ρ',.2,3,.1,1],['angle','Angolo θ / π',-2,2,1/12,.5]],render(v){
  const [x,y]=multiply(v.rho,v.angle*Math.PI),lim=Math.max(1.5,Math.hypot(x,y)*1.3),p=plot('Moltiplicare z = 1 + i/2 per w',-lim,lim,-lim,lim,{equal:true,xlabel:'Parte reale',ylabel:'Im'});p.circle(0,0,Math.sqrt(1.25),B,'none','3 4');p.path([[0,0],[1,.5]],B);p.point(1,.5,B);p.label(1,.5,'z',B,12,-9);p.path([[0,0],[x,y]],O);p.point(x,y,O);p.label(x,y,'wz',O,13,-9);
  return [p.svg(),`wz = <strong>${fmt(x)} ${y<0?'−':'+'} ${fmt(Math.abs(y))}i</strong>; |wz| = ${fmt(Math.hypot(x,y))}.<br>La moltiplicazione ruota di θ = ${fmt(v.angle)}π e moltiplica le distanze dall’origine per ρ = ${fmt(v.rho)}.`];
}},
8:{controls:[['n','Numero di radici n',1,12,1,6],['r','Modulo di w',.1,4,.1,1],['phi','Argomento di w / π',-1,1,1/12,.5]],render(v){
  const z=roots(v.n,v.r,v.phi*Math.PI),R=v.r**(1/v.n),l=R*1.4,p=plot(`${v.n} radici di zⁿ = w`,-l,l,-l,l,{equal:true,xlabel:'Parte reale',ylabel:'Im'});p.circle(0,0,R,'#94a79b','none','5 4');if(v.n>1)p.path([...z,z[0]],'#aac5bc');z.forEach(([x,y],k)=>{p.point(x,y,k===0?O:B);p.label(x,y,'z'+k,k===0?O:B,12,-9);});
  return [p.svg(),`Modulo comune: <strong>${fmt(R,7)}</strong>. Argomenti: (φ + 2kπ)/n, k = 0, …, ${v.n-1}.<br>${v.n===1?'Una sola radice: w.':v.n===2?'Le due radici sono opposte.':'Le radici formano un poligono regolare.'} Se w ruota di δ, ciascuna radice seguita con continuità ruota di δ/n.`];
}},
9:{controls:[['scelta','Luogo geometrico',['17 i · equidistanza','17 ii · iperbole','17 iii · circonferenza bucata','25 · settori aperti'],'17 i · equidistanza']],render(v){
  const p=plot(v.scelta,-3,3,-2,3,{equal:true,xlabel:'Parte reale',ylabel:'Im'});let result='';
  if(v.scelta.startsWith('17 i ·')){p.line(-3,-.5,3,-.5,B);result='Retta y = −1/2: punti equidistanti da 0 e −i.';}
  else if(v.scelta.startsWith('17 ii')){const ys=seq(-2,3),ysVisible=ys.filter(y=>Math.sqrt(y*y+2)<=3);for(const sign of [-1,1]){const pts=ysVisible.map(y=>[sign*Math.sqrt(y*y+2),y]);p.path([[sign*3,ysVisible[0]],...pts,[sign*3,ysVisible.at(-1)]],'none','#dbe9e7');p.path(pts,B,'none','5 4');}result='Regione x² − y² > 2. Le due branche dell’iperbole sono escluse (bordo tratteggiato).';}
  else if(v.scelta.startsWith('17 iii')){p.circle(0,.5,.5,B);p.point(0,0,O,true);p.label(.9,-.35,'Origine esclusa',O);result='Circonferenza x² + (y − 1/2)² = 1/4, con z = 0 escluso. Il punto vuoto indica l’esclusione.';}
  else{for(const [shift,color] of [[0,B],[Math.PI/2,O]]){const angles=seq(Math.PI/6+shift,Math.PI/3+shift,60),pts=[...angles.map(a=>[Math.cos(a),Math.sin(a)]),...angles.toReversed().map(a=>[2*Math.cos(a),2*Math.sin(a)])];p.path([...pts,pts[0]],color,color===B?'#dce9f2':'#f6e2d7','4 4');}result='A: 1 < |z| < 2 e π/6 < arg z < π/3 (blu). B = iA (arancio): rotazione di π/2. Tutti i bordi sono esclusi.';}
  return [p.svg(),result];
}}
};
function mount(el){const id=Number(el.dataset.lab),lab=labs[id],values={},defaults={};
  el.innerHTML=`<div class="lab-top"><strong>ESPLORA · LABORATORIO ${id.toString().padStart(2,'0')}</strong><button type="button">Ripristina</button></div><div class="controls"></div><div class="graph"></div><div class="result" aria-live="polite" aria-atomic="true"></div>`;
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
if(typeof module!=='undefined')module.exports={rootInterval,roots,multiply,pascal,labs};
