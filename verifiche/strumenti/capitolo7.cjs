'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {labs,orbit,affine,cycle2,quadraticRoots,stability,secondOrder,fibonacci,sharkFollows,forcingCase}=require('../../capitolo-7/laboratori.js');
let checks=0;function near(a,b,t=1e-9){assert(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} vs ${b}`);checks++;}
for(const a of [-1.3,-1,-.3,0,.5,1,1.2])for(const b of [-2,0,1])for(const x0 of [-1,0,2])for(const n of [0,1,2,8,20]){
 const expected=a===1?x0+n*b:a**n*x0+b*(1-a**n)/(1-a);near(affine(a,b,x0,n),expected);
}
for(const r of [3.001,3.2,1+Math.sqrt(6),3.6,4]){
 const c=cycle2(r),f=x=>r*x*(1-x);near(f(c.low),c.high);near(f(c.high),c.low);near(r*(1-2*c.low)*r*(1-2*c.high),c.multiplier);
}
assert.equal(cycle2(3),null);checks++;
for(const [b,c,status]of [[0,0,'asintoticamente stabile'],[-1,0,'stabile, non asintoticamente'],[0,1,'stabile, non asintoticamente'],[0,-1,'stabile, non asintoticamente'],[-2,1,'instabile'],[2,1,'instabile'],[0,4,'instabile'],[5/6,1/6,'asintoticamente stabile']]){assert.equal(stability(b,c),status);checks++;}
for(let j=-15;j<=15;j++)for(let k=-7;k<=7;k++){
 const b=j/5,c=k/5,inside=c<1-1e-10&&Math.abs(b)<1+c-1e-10;
 assert.equal(stability(b,c)==='asintoticamente stabile',inside);checks++;
 for(const [re,im]of quadraticRoots(b,c)){near(re*re-im*im+b*re+c,0);near(2*re*im+b*im,0);}
}
for(const name of ['Costante, radici interne','Esponenziale 3ⁿ','Risonanza semplice','Risonanza doppia']){
 const c=forcingCase(name);for(let n=0;n<12;n++)near(c.u(n+2)+c.b*c.u(n+1)+c.c*c.u(n),c.g(n));
}
const f=fibonacci(70);assert.equal(f[0],1n);assert.equal(f[1],1n);assert.equal(f[12],233n);checks+=3;
for(let n=0;n<69;n++){assert.equal(f[n+2],f[n+1]+f[n]);checks++;}
const phi=(1+Math.sqrt(5))/2;near(Number(f[70])/Number(f[69]),phi,1e-14);
for(let n=1;n<=64;n++){assert.equal(sharkFollows(3,n),n!==3);checks++;}
for(const [m,n,value]of [[5,3,false],[5,7,true],[4,2,true],[4,1,true],[4,8,false],[6,5,false],[6,10,true],[6,4,true],[1,2,false]]){assert.equal(sharkFollows(m,n),value);checks++;}
for(const a of [.05,.2,1,2,8]){
 const sq=orbit(x=>Math.sqrt(2+x),a,80).values;near(sq.at(-1),2);
 const mo=orbit(x=>2/(1+x),a,60).values;near(mo.at(-1),1);
 const t0=(a-1)/(a+2);for(let n=0;n<=20;n++){const t=(-.5)**n*t0;near(mo[n],(1+2*t)/(1-t));}
}
const av=orbit(x=>375/(x-90)+100,150,30).values;
for(let n=0;n<av.length;n++){const t=7/15*(-.6)**n;near(av[n],(115-75*t)/(1-t));assert(av[n]>90);checks++;}
for(const alpha of [.4,1,1.5,3])for(const beta of [.2,1,2])for(const x0 of [.1,1,3]){
 const xs=orbit(x=>alpha*x/(1+beta*x),x0,25).values;
 for(let n=0;n<xs.length;n++){const z=alpha===1?x0/(1+n*beta*x0):alpha**n*x0/(1+beta*x0*(alpha**n-1)/(alpha-1));near(xs[n],z);}
}
for(const theta of [.03,.1,.27,.4,.7])near(4*Math.sin(Math.PI*theta)**2*(1-Math.sin(Math.PI*theta)**2),Math.sin(2*Math.PI*theta)**2);
const unstable=secondOrder(0,4,1,2,12).values;for(let n=0;n<unstable.length-4;n++)near(unstable[n+4],16*unstable[n]);
assert(orbit(x=>x*x,10,100).stopped);checks++;
for(const lab of Object.values(labs))for(const c of lab.controls)if(!Array.isArray(c[2]))near((c[5]-c[2])/c[4],Math.round((c[5]-c[2])/c[4]),1e-8);
const html=fs.readFileSync(path.join(__dirname,'../../capitolo-7/index.html'),'utf8');
assert.equal((html.match(/data-lab=/g)||[]).length,17);assert.equal((html.match(/data-tipo="esercizio"/g)||[]).length,19);assert.equal((html.match(/data-tipo="complemento"/g)||[]).length,7);
for(let n=1;n<=19;n++)assert(html.includes(`Esercizio ${n} ·`));
assert(html.includes('non è periodica'));assert(html.includes('modulo al più uno'));assert(html.includes('f\'(x)\\ne0'));assert(html.includes('x^3'));
console.log(JSON.stringify({chapter:7,independentChecks:checks,exercises:19,complements:7,labs:17}));
