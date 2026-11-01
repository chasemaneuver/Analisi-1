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
const choices=['exp(x)','sin(x)','cos(x)','log(1+x)','1/(1+x)','sqrt(1+x)'];
function taylor(key,x,N){let sum=0,coefficient=1;for(let n=0;n<=N;n++){if(key==='exp(x)'){if(n)coefficient/=n;}else if(key==='sin(x)'){coefficient=n%2===0?0:(n%4===1?1:-1)/factorial(n);}else if(key==='cos(x)'){coefficient=n%2?0:(n%4===0?1:-1)/factorial(n);}else if(key==='log(1+x)'){coefficient=n===0?0:(n%2?1:-1)/n;}else if(key==='1/(1+x)'){coefficient=n%2?-1:1;}else{if(n)coefficient*= (.5-n+1)/n;}sum+=coefficient*x**n;}return sum;}
function factorial(n){let f=1;for(let k=2;k<=n;k++)f*=k;return f;}
function elementary(key,x){return key==='exp(x)'?Math.exp(x):key==='sin(x)'?Math.sin(x):key==='cos(x)'?Math.cos(x):key==='log(1+x)'?Math.log1p(x):key==='1/(1+x)'?1/(1+x):Math.sqrt(1+x);}
const labs={
1:{controls:[['deg','Angolo in gradi',-360,360,5,45]],render(v){const t=v.deg*Math.PI/180,c=Math.cos(t),s=Math.sin(t),p=plot('Circonferenza unitaria',-1.4,1.4,-1.4,1.4,{equal:true});p.circle(0,0,1,G);p.line(0,0,c,s,O);p.line(c,0,c,s,B,'4 4');p.line(0,0,c,0,B);p.point(c,s,O);return[p.svg(),`Angolo = ${fmt(t,7)} radianti; cos = ${fmt(c,7)}, sin = ${fmt(s,7)}. tan = ${Math.abs(c)<1e-12?'non definita (cos = 0)':fmt(s/c,7)}; cot = ${Math.abs(s)<1e-12?'non definita (sin = 0)':fmt(c/s,7)}. Le coordinate soddisfano cos² + sin² = 1.`];}},
2:{controls:[['f','Funzione',choices,'exp(x)'],['N','Grado del polinomio',0,14,1,4],['x','Punto da confrontare',-.9,.9,.05,.5]],render(v){const p=plot('Funzione (blu) e polinomio di Maclaurin (arancio)',-1,1,-2,4);curve(p,x=>elementary(v.f,x),-.99,1,-2,4,B);curve(p,x=>taylor(v.f,x,v.N),-1,1,-2,4,O);const exact=elementary(v.f,v.x),approx=taylor(v.f,v.x,v.N);p.point(v.x,exact,B);p.point(v.x,approx,O);return[p.svg(),`x = ${fmt(v.x)}; f(x) = ${fmt(exact,9)}; P${v.N}(x) = ${fmt(approx,9)}; errore assoluto = ${fmt(Math.abs(exact-approx),8)}. Il grado è quello massimo ammesso: coefficienti nulli possono ridurre il grado effettivo. Il confronto usa punti interni all’intervallo di convergenza; non è una stima rigorosa del resto.`];}},
3:{controls:[['f','Primitiva',['sin(x) + C','atan(x) + C','x³/3 + C'],'sin(x) + C'],['C','Costante C',-2,2,.25,0],['a','Punto della tangente',-2,2,.1,.5]],render(v){const F=v.f==='sin(x) + C'?x=>Math.sin(x)+v.C:v.f==='atan(x) + C'?x=>Math.atan(x)+v.C:x=>x**3/3+v.C,f=v.f==='sin(x) + C'?x=>Math.cos(x):v.f==='atan(x) + C'?x=>1/(1+x*x):x=>x*x,p=plot('Una primitiva (blu) e la sua tangente (arancio)',-3,3,-4,4),q=plot('Integranda: è la derivata della primitiva',-3,3,-1.5,4);curve(p,F,-3,3,-4,4);curve(p,x=>F(v.a)+f(v.a)*(x-v.a),-3,3,-4,4,O);p.point(v.a,F(v.a),G);curve(q,f,-3,3,-1.5,4);q.point(v.a,f(v.a),O);return[p.svg()+q.svg(),`In x = ${fmt(v.a)}, pendenza della tangente = f(x) = ${fmt(f(v.a),8)}. Cambiare C trasla soltanto la primitiva: l’integranda e la pendenza restano uguali.`];}}
};
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






if(typeof module!=='undefined')module.exports={labs,taylor,elementary,factorial};
