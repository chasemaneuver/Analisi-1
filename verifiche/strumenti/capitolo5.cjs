'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {partial,factTermSum,trigSum,geometricComplex,complexPower,powerSeries}=require('../../capitolo-5/laboratori.js');
let checks=0;function near(a,b,t=1e-10){assert(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} vs ${b}`);checks++;}
for(let N=1;N<=100;N++){
 near(partial('Mengoli',N).at(-1)[1],1-1/(N+1));
 const s=partial('alternata',N).at(-1)[1];assert(Math.abs(s-Math.log(2))<=1/(N+1)+1e-14);checks++;
}
for(const x of [-4,-1,0,.8,1,4]){
 near(factTermSum(x,55),Math.exp(x));near(trigSum('sin',x,25),Math.sin(x));near(trigSum('cos',x,25),Math.cos(x));
}
for(const r of [0,.2,.65,.95])for(const t of [-3,-1,0,1,3])for(const N of [0,1,15,50]){
 const g=geometricComplex(r,t,N),s=g.pts.at(-1);
 near(Math.hypot(s[0]-g.target[0],s[1]-g.target[1]),g.error);checks++;
}
for(const r of [.5,1,2])for(const t of [-2,0,2])for(const k of [-3,0,3]){
 const z=complexPower(r,t,2,0,k);near(z[0],r*r*Math.cos(2*t));near(z[1],r*r*Math.sin(2*t));
 const a=complexPower(r,t,3/5,0,k),b=complexPower(r,t,3/5,0,k+5);near(a[0],b[0]);near(a[1],b[1]);
}
for(const x of [-.8,-.3,0,.5,.8]){
 near(powerSeries('log',x,200),Math.log1p(x));near(powerSeries('radice',x,200),Math.sqrt(1+x));near(powerSeries('geometrica',x,200),1/(1-x));
}
let s=0;for(let k=0;k<=4;k++)s+=(37/200)**k;
near(s,1.226727975625);assert((37/200)**5/.815<.001&&(37/200)**4/.815>.001);checks++;
let e6=0;for(let n=1;n<=30;n++)e6+=Math.log((n+2)/(n+4));near(e6,Math.log(12/(33*34)));
const html=fs.readFileSync(path.join(__dirname,'../../capitolo-5/index.html'),'utf8');
assert.equal((html.match(/data-lab=/g)||[]).length,12);assert.equal((html.match(/data-tipo="esercizio"/g)||[]).length,35);assert.equal((html.match(/data-tipo="complemento"/g)||[]).length,7);
assert.equal((html.match(/data-goatcounter=/g)||[]).length,1);
console.log(JSON.stringify({chapter:5,independentChecks:checks,exercises:35,complements:7,labs:12}));
