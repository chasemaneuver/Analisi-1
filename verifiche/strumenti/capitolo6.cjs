'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {labs,midpoint,simpson,powerFinite,powerTail,overlap,waveIntegral,integralCases}=require('../../capitolo-6/laboratori.js');
let checks=0;function near(a,b,t=1e-10){assert(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} vs ${b}`);checks++;}
for(let n=1;n<=100;n++){
 near(midpoint(x=>x*x,0,1,n),1/3-1/(12*n*n));
 const err=Math.abs(midpoint(x=>Math.exp(-x*x),0,1,n)-.746824132812427);
 assert(err<=1/(12*n*n)+1e-14);checks++;
}
for(const alpha of [0,.5,.95,1,1.05,1.5,2])for(const eps of [.1,.01,1e-5]){
 near(powerFinite(alpha,eps),alpha===1?-Math.log(eps):(1-eps**(1-alpha))/(1-alpha));
 near(powerTail(alpha,1/eps),alpha===1?Math.log(1/eps):((1/eps)**(1-alpha)-1)/(1-alpha));
 if(alpha<1)near(powerFinite(alpha,eps)+eps**(1-alpha)/(1-alpha),1/(1-alpha));
 if(alpha>1)near(powerTail(alpha,1/eps)+(1/eps)**(1-alpha)/(alpha-1),1/(alpha-1));
}
for(const a of [.5,1,2])for(const b of [.5,1,2]){
 near(simpson(x=>overlap(x,a,b),0,a+b,12000),a*b,1e-6);
 for(const x of [-1,0,.25,.5,1,2,3,4,5]){near(overlap(x,a,b),overlap(x,b,a));assert(overlap(x,a,b)>=0&&overlap(x,a,b)<=Math.min(a,b));checks++;}
}
for(let k=0;k<8;k++)for(const r of [0,.2,1,1.8])near(waveIntegral(2*k+r),k+Math.min(r,1));
for(const name of ['x','sin x','|x|','sin x/(1+x²)'])for(const x of [-1.8,-.4,.3,1.5]){
 const c=integralCases[name],h=1e-5;near((c.F(x+h)-c.F(x-h))/(2*h),c.f(x),2e-7);
}
for(const x of [-3,-1,0,1,3])for(const eps of [.05,.3,1]){
 const avg=(Math.cos(x-eps)-Math.cos(x))/eps;assert(Math.abs(avg-Math.sin(x))<=eps/2+1e-14);checks++;
}
for(const a of [.25,.5,1,2]){
 near(simpson(x=>Math.sqrt(1+4*x*x),0,a,2000),(2*a*Math.sqrt(1+4*a*a)+Math.asinh(2*a))/4);
 near(simpson(x=>Math.sqrt(1+9*x/4),0,a,2000),8/27*((1+9*a/4)**1.5-1));
}
const html=fs.readFileSync(path.join(__dirname,'../../capitolo-6/index.html'),'utf8');
for(const [kind,n]of [['esercizio',89],['complemento',9]])assert.equal((html.match(new RegExp(`data-tipo="${kind}"`,'g'))||[]).length,n);
assert.equal(Object.keys(labs).length,17);
for(let n=1;n<=89;n++)assert(html.includes(`Esercizio ${n} ·`),`Esercizio assente ${n}`);
for(const lab of Object.values(labs))for(const c of lab.controls)if(!Array.isArray(c[2]))near((c[5]-c[2])/c[4],Math.round((c[5]-c[2])/c[4]),1e-8);
assert(html.includes('24n^2'));assert(html.includes('non è definito in campo reale'));assert(html.includes('cuspide'));
console.log(JSON.stringify({chapter:6,independentChecks:checks,exercises:89,complements:9,labs:17}));
