'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),A=require('../../appendice-a/laboratori.js'),B=require('../../appendice-b/laboratori.js');
let checks=0;const close=(a,b,tol=1e-10)=>{assert(Math.abs(a-b)<tol,`${a} != ${b}`);checks++;};
for(let p=1;p<=6;p++)for(let q=1;q<=6;q++)for(const x of [-2,-1,0,.5,2])for(const sign of [-1,1]){
 const y=B.rationalPower(x,sign*p,q);let a=p,b=q;while(b)[a,b]=[b,a%b];const odd=(q/a)%2===1;
 if(x<0&&!odd||x===0&&sign<0){assert(Number.isNaN(y));checks++;}
 else{const magnitude=Math.abs(x)**(sign*p/q),expected=x<0&&(p/a)%2===1?-magnitude:magnitude;close(y,expected);}
}
for(const x of [-3,-.2,.2,2]){
 close(B.graphValue(6,x),x-Math.floor(x));close(B.graphValue(10,x),1/(1+x*x));close(B.graphValue(14,x),Math.exp(x));close(B.graphValue(20,x),Math.exp(-x*x/2)/Math.sqrt(2*Math.PI));
 close(B.graphValue(21,x),Math.exp(-1/(x*x)));close(B.graphValue(30,x),Math.sin(x)**2);close(B.graphValue(36,x),Math.sin(1/x));close(B.graphValue(37,x),x*Math.sin(1/x));
}
for(const id of [9,18,19,22,23]){assert(Number.isNaN(B.graphValue(id,0)));assert(Number.isNaN(B.graphValue(id,-1)));checks+=2;}
for(const id of [21,33,37]){assert(Number.isNaN(B.graphValue(id,0)));close(B.graphValue(id,0,{extend:'Prolungata'}),id===33?1:0);checks++;}
for(const id of [11,28]){assert(Number.isNaN(B.graphValue(id,id===11?1:Math.PI/2)));checks++;}
assert(Number.isNaN(B.graphValue(32,-Math.PI/2)));checks++;
for(let n=1;n<=4;n++)for(const x of [-2,-.5,0,.5,2]){close(B.graphValue(38,x,{n}),x**n*Math.exp(-x));close(B.graphValue(39,x,{n}),x**n*Math.exp(-x*x));}
for(const id of [36,37])for(const side of [-1,1]){const ps=B.oscillatingPoints(id,side,2);assert(ps.every(([x,y])=>Number.isFinite(y)&&Math.abs(x)>=.005&&Math.abs(x)<=2));assert(ps.every(([x,y])=>Math.abs(y)<= (id===36?1:Math.abs(x))+1e-12));checks+=2;}
for(const x of [-.8,-.4,0,.4,.8]){
 close(A.taylor('exp(x)',x,14),Math.exp(x),1e-11);close(A.taylor('sin(x)',x,13),Math.sin(x),1e-11);close(A.taylor('cos(x)',x,14),Math.cos(x),1e-11);
 close(A.taylor('1/(1+x)',x,10),(1-(-x)**11)/(1+x));
 close(A.taylor('sqrt(1+x)',x,3),1+x/2-x*x/8+x**3/16);
}
for(const folder of ['appendice-a','appendice-b']){
 const s=fs.readFileSync(path.join(root,folder,'index.html'),'utf8');assert.equal((s.match(/data-goatcounter=/g)||[]).length,1);assert(s.includes('Convenzioni:'));assert(s.includes('Fonte:'));assert(s.includes('print-credit'));assert(s.includes('beforeprint')===false);
 for(const target of ['appendice-a','appendice-b',...Array.from({length:7},(_,i)=>`capitolo-${i+1}`)])assert(s.includes(`../${target}/`));
 checks+=15;
}
assert.equal(Object.keys(A.labs).length,3);assert.equal(Object.keys(B.labs).length,39);
console.log(JSON.stringify({independentChecks:checks,appendixA:3,appendixB:39}));
