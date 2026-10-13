'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {labs,bisection,sequenceN,deltaCondition}=require('../../capitolo-3/laboratori.js');
let renders=0;
for(const [id,lab] of Object.entries(labs)){
 const initial=Object.fromEntries(lab.controls.map(c=>[c[0],Array.isArray(c[2])?c[3]:c[5]]));
 function check(v){const [svg,text]=lab.render(v);assert(svg.includes('<svg'));assert(!/NaN|Infinity|undefined/.test(svg),'SVG '+id);assert(text.length>20);renders++;}
 check(initial);
 for(const c of lab.controls)for(const value of Array.isArray(c[2])?c[2]:[c[2],c[3]])check({...initial,[c[0]]:value});
}
for(const eps of [.01,.02,.1,.2,.99,1])for(const kind of ['1/n','(n+1)/(n−1)','(−1)ⁿ/n']){
 const N=sequenceN(kind,eps);
 for(let n=N;n<N+1000;n++)assert((kind==='(n+1)/(n−1)'?2/(n-1):1/n)<eps);
}
for(let n=0;n<=25;n++){const r=bisection(n);assert(r.a**3+r.a-1<=0);assert(r.b**3+r.b-1>=0);assert(Math.abs(r.b-r.a-2**-n)<1e-15);assert(Math.abs(r.mid-0.6823278038280193)<=r.error+1e-15);}
for(const eps of [.05,.5,1,2]){const delta=Math.min(1,eps/3);assert(deltaCondition(eps,delta));for(let i=0;i<100;i++){const x=1+delta*(2*i/100-1)*.999;assert(Math.abs(x*x-1)<eps);}}
for(const R of [0,1,3])for(const L of [.2,1,3])for(const C of [.2,1,3]){const w=1/Math.sqrt(L*C);assert(Math.abs(Math.hypot(R,L*w-1/(C*w))-R)<1e-12);}
const page=fs.readFileSync(require('node:path').join(__dirname,'../../capitolo-3/index.html'),'utf8');
assert.equal((page.match(/data-tipo="esercizio"/g)||[]).length,43);
assert.equal((page.match(/data-tipo="complemento"/g)||[]).length,12);
assert.equal((page.match(/data-lab=/g)||[]).length,15);
for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert(page.includes(`id="${id}"`),'Ancora '+id);
assert(!/\bcis\b|:::|SEL1|SEL2/.test(page));
console.log(`${renders} configurazioni dei laboratori; fasce ε, bisezione, risonanza RLC, 43 esercizi e 12 complementi verificati.`);
