'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'../..');
let checks=[];
for(let n=1;n<=6;n++){
 const s=fs.readFileSync(path.join(root,`capitolo-${n}/index.html`),'utf8');
 assert(!/\bcis\b|numero numero|SEL1|SEL2|\ufffd/.test(s));
 assert(s.includes(`capitolo ${n}, pp.`));assert(s.includes('Convenzioni:'));
 assert.equal((s.match(/data-goatcounter=/g)||[]).length,1);
 assert(s.includes('https://analisi1-mv.goatcounter.com/count'));
 const menu=s.match(/<select id="capitolo"[\s\S]*?<\/select>/)[0];
 for(let c=1;c<=6;c++)assert(menu.includes(`../capitolo-${c}/`));
 checks.push(`C${n}: notazione, fonte, convenzioni, menu, analytics`);
}
const c4=fs.readFileSync(path.join(root,'capitolo-4/index.html'),'utf8');
assert(c4.includes('2x^2-8x+7'));assert(!c4.includes('2x^2-3x+1'));
assert(!c4.includes('Per il modulo nell’esercizio 27'));
assert(c4.includes('ramo inferiore'));assert(c4.includes('convessa per $x&lt;-2$'));
const css=fs.readFileSync(path.join(root,'assets/stile.css'),'utf8');assert(css.includes('scrollbar-width:none')||css.includes('scrollbar-width: none'));
console.log(JSON.stringify({corrections:checks,chapter4:'derivata, convessità, orientazione e note ripetute ricontrollate',mathScrollbars:'regola conservata'}));
