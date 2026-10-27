'use strict';
// Eseguire dalla radice: node verifiche/strumenti/laboratori.cjs
const assert=require('node:assert/strict'),path=require('node:path');
let total=0;const chapters=[];
for(let n=1;n<=6;n++){
 const {labs}=require(path.join(__dirname,`../../capitolo-${n}/laboratori.js`));
 let configurations=0;
 for(const [id,lab]of Object.entries(labs)){
  const initial=Object.fromEntries(lab.controls.map(c=>[c[0],Array.isArray(c[2])?c[3]:c[5]]));
  const check=v=>{const [svg,text]=lab.render(v);assert(svg.includes('<svg'),`C${n} L${id}`);assert(!/NaN|Infinity|undefined/.test(svg),`Coordinate non finite C${n} L${id}`);assert(typeof text==='string'&&text.length>0);configurations++;};
  check(initial);
  for(const c of lab.controls)for(const value of Array.isArray(c[2])?c[2]:[c[2],c[3]])check({...initial,[c[0]]:value});
  // Valori intermedi riproducibili e combinazioni degli estremi.
  for(let k=0;k<40;k++){
   const v={...initial};for(let j=0;j<lab.controls.length;j++){
    const c=lab.controls[j];if(Array.isArray(c[2]))v[c[0]]=c[2][(k+j)%c[2].length];
    else{const ratio=((k*17+j*13)%41)/40;const step=c[4];v[c[0]]=Math.min(c[3],c[2]+Math.round((c[3]-c[2])*ratio/step)*step);}
   }check(v);
  }
 }
 total+=configurations;chapters.push({chapter:n,labs:Object.keys(labs).length,configurations});
}
console.log(JSON.stringify({chapters,total},null,2));
