'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {labs,taylor,newtonRun,langevin,sinc}=require('../../capitolo-4/laboratori.js');
let count=0;
for(const [id,lab]of Object.entries(labs)){
 const initial=Object.fromEntries(lab.controls.map(c=>[c[0],Array.isArray(c[2])?c[3]:c[5]]));
 function check(v){const [svg,result]=lab.render(v);assert(svg.includes('<svg'));assert(!/NaN|Infinity|undefined/.test(svg),'grafico '+id);assert(typeof result==='string'&&result.length>0);count++;}
 check(initial);for(const c of lab.controls)for(const value of Array.isArray(c[2])?c[2]:[c[2],c[3]])check({...initial,[c[0]]:value});
}
for(const n of [1,2,3,5,8,10])for(let x=-1;x<=1;x+=.05){const error=Math.abs(Math.exp(x)-taylor('exp',n,x)),bound=Math.exp(Math.max(0,x))*Math.abs(x)**(n+1)/factorial(n+1);assert(error<=bound+1e-14);}
function factorial(n){let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
for(const [kind,initial,root,increasing]of [['exp',0,.5671432904097838,true],['cubic',1,.6823278038280193,false],['log',1,1.7632228343518967,true],['diffraction',1.5*Math.PI-.1,4.493409457909064,false]]){
 let prev=initial;for(let n=1;n<=8;n++){const r=newtonRun(kind,n,initial);assert(Number.isFinite(r.x));assert(increasing?r.x>=prev-1e-14:r.x<=prev+1e-14);assert(increasing?r.x<=root+1e-13:r.x>=root-1e-13);prev=r.x;}
 assert(Math.abs(prev-root)<1e-12);
}
for(let n=0;n<=8;n++)assert.equal(newtonRun('cycle',n,0).x,n%2);
assert.equal(sinc(0),1);assert.equal(langevin(0),0);
for(const x of [.0001,.1,1,3])assert(Math.abs(langevin(x)+langevin(-x))<1e-12);
const html=fs.readFileSync(require('node:path').join(__dirname,'../../capitolo-4/index.html'),'utf8');
assert.equal((html.match(/data-lab=/g)||[]).length,18);
assert.equal((html.match(/data-tipo="esercizio"/g)||[]).length,112);
assert.equal((html.match(/data-tipo="complemento"/g)||[]).length,8);
for(let n=1;n<=20;n++)assert(html.includes('4.'+n),'teorema '+n);
for(let n=1;n<=9;n++)assert(html.includes('4.'+n),'definizione '+n);
assert(html.includes('pp. 147–228'));assert(html.includes('og:image'));assert(html.includes('print-credit'));
console.log(JSON.stringify({laboratori:18,configurazioni:count,esercizi:112,complementi:8,taylor:'stima verificata',newton:'convergenza e ciclo verificati'}));
