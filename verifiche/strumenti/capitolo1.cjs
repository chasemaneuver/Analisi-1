const assert=require('node:assert/strict');
const {rootInterval,roots,multiply,pascal,labs}=require('../../capitolo-1/laboratori.js');
let cases=0;
for(let d=0;d<=8;d++){
  const {s,p}=rootInterval(d);assert(p*p<2n*s*s && (p+1n)*(p+1n)>2n*s*s);cases++;
}
for(let n=1;n<=12;n++)for(const r of [.1,1,4])for(const phi of [-Math.PI,0,Math.PI]){
  const z=roots(n,r,phi);assert.equal(z.length,n);
  for(const [x,y] of z){let a=1,b=0;for(let j=0;j<n;j++)[a,b]=[a*x-b*y,a*y+b*x];assert(Math.hypot(a-r*Math.cos(phi),b-r*Math.sin(phi))<1e-10);}
  cases++;
}
const rot=multiply(1,Math.PI/2);assert(Math.abs(rot[0]+.5)<1e-12 && Math.abs(rot[1]-1)<1e-12);
for(let n=0;n<=16;n++){assert.equal(pascal(n).reduce((a,b)=>a+b,0),2**n);cases++;}
for(const lab of Object.values(labs)){
  const defaults=Object.fromEntries(lab.controls.map(c=>[c[0],Array.isArray(c[2])?c[3]:c[5]]));
  const check=v=>{const [svg,text]=lab.render(v);assert(svg.startsWith('<svg'));assert(!/NaN|Infinity/.test(svg+text));cases++;};
  check(defaults);
  for(const c of lab.controls)for(const value of Array.isArray(c[2])?c[2]:[c[2],c[3]])check({...defaults,[c[0]]:value});
}
console.log(`${cases} verifiche superate: radici complesse, intervalli esatti, coefficienti binomiali, tutti i controlli ai valori estremi.`);
