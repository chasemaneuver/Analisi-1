'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {labs,realPower,bisect}=require('../../capitolo-2/laboratori.js');
let renders=0,checks=0;
for(const [id,lab] of Object.entries(labs)){
  const values=Object.fromEntries(lab.controls.map(c=>[c[0],Array.isArray(c[2])?c[3]:c[5]]));
  const test=v=>{const [svg,text]=lab.render(v);assert(svg.includes('<svg'));assert(!/NaN|Infinity|undefined/.test(svg),`SVG non valido ${id}`);assert(text.length);renders++;};
  test(values);
  for(const c of lab.controls)for(const v of Array.isArray(c[2])?c[2]:[c[2],c[3]])test({...values,[c[0]]:v});
}
assert(Math.abs(realPower(-32,'4/5')-16)<1e-12);assert(Math.abs(realPower(-128,'−2/7')-.25)<1e-14);assert(Number.isNaN(realPower(-1,'π')));assert(Number.isNaN(realPower(0,'−2/7')));
const root=bisect(24),alpha=(root.a+root.b)/2;
assert(Math.exp(root.a)+root.a**2-1>0);assert(Math.exp(root.b)+root.b**2-1<0);assert(root.b-root.a<6e-9);
// Confronto indipendente delle disequazioni originali con gli insiemi risolutivi.
for(let i=-800;i<=800;i++){
 const x=i/100;
 const check=(actual,expected)=>{assert.equal(actual,expected,`x=${x}`);checks++;};
 check(Math.abs(x-4)>=x+2,x<=1);
 if(x!==0){check((2*x-1)*(x+1)/x>=0,(x>=-1&&x<0)||x>=.5);check(x/Math.abs(x)*(1-x)<=1+x,true);}
 if(Math.abs(x-(5-Math.sqrt(5))/2)>1e-8)check(Math.sqrt(Math.abs(x-1))<2-x,x<(5-Math.sqrt(5))/2);
 check(Math.cbrt(1+x**3)>x-4,true);
 if(x>=-.5&&x!==2)check((Math.sqrt(2*x+1)-3)/(x*x-4)<=0,x>2&&x<=4);
 if(x>4)check(Math.log2(x-4)-Math.log2(x-1)>1,false);
 if(x>=0&&Math.abs(x-(3+Math.sqrt(5))/2)>1e-8)check(Math.exp(Math.sqrt(x)-x+1)>1,x<(3+Math.sqrt(5))/2);
 if(x!==1&&x!==-1&&Math.abs(x-alpha)>1e-7)check(Math.exp(x)/(1-x*x)<1,x<-1||(x>alpha&&x<0)||x>1);
}
console.log(`${renders} configurazioni e ${checks} confronti di disequazioni verificati.`);
