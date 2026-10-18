"""Controlli statici e confronto con il registro: python verifiche/strumenti/struttura.py."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import hashlib,json,re,sys
ROOT=Path(__file__).resolve().parents[2]
def digest(p):return hashlib.sha256(p.read_bytes().replace(b'\r\n',b'\n')).hexdigest()
class Page(HTMLParser):
 def __init__(self,p):super().__init__();self.path=p;self.ids=[];self.refs=[];self.meta={};self.canonical=[];self.h1=0;self.jsonld=[];self.ld=False;self.text=[];self.skip=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if t=='h1':self.h1+=1
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='script' and a.get('type')=='application/ld+json':self.ld=True
  if t in ('script','style'):self.skip+=1
  for k in ('href','src'):
   if k in a:self.refs.append(a[k])
 def handle_endtag(self,t):
  if t=='script':self.ld=False
  if t in ('script','style'):self.skip-=1
 def handle_data(self,d):
  if self.ld:self.jsonld.append(d)
  if not self.skip:self.text.append(d)
pages={};errors=[];external=set();references=0;counts=[]
for p in [ROOT/'index.html',*[ROOT/f'capitolo-{n}/index.html' for n in range(1,6)]]:
 c=Page(p);c.feed(p.read_text(encoding='utf8'));pages[p]=c
 if len(c.ids)!=len(set(c.ids)):errors.append(f'ID duplicati: {p.relative_to(ROOT)}')
 if len(c.canonical)!=1:errors.append(f'Canonical: {p.relative_to(ROOT)}')
 if p.parent.name.startswith('capitolo-'):
  n=int(p.parent.name.split('-')[1]);s=p.read_text(encoding='utf8')
  if c.h1!=1:errors.append(f'H1: capitolo {n}')
  if not c.meta.get('description'):errors.append(f'Descrizione: capitolo {n}')
  for raw in c.jsonld:json.loads(raw)
  text=''.join(c.text)
  bad=re.findall(r'\b(?:TODO|FIXME|SEL1|SEL2|cis)\b|\ufffd',text)
  if bad:errors.append(f'Residui: capitolo {n}: {bad}')
  if len(re.findall(r'(?<!\\)\$',text))%2:errors.append(f'Delimitatori matematici: capitolo {n}')
  counts.append({'chapter':n,'laboratories':len(re.findall('data-lab=',s)),'text_characters':len(text),'details':len(re.findall('<details class="esercizio"',s))})
for p,c in pages.items():
 for ref in c.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:
   if u.scheme in ('http','https'):external.add(ref)
   continue
  q=(p.parent/unquote(u.path)).resolve() if u.path else p
  if q.is_dir():q=q/'index.html'
  references+=1
  if not q.exists():errors.append(f'File assente: {p.relative_to(ROOT)} → {ref}')
  elif u.fragment and q in pages and unquote(u.fragment) not in pages[q].ids and u.fragment not in pages[q].ids:errors.append(f'Ancora assente: {ref}')
manifest=ROOT/'verifiche/stato.json';changed=[]
if manifest.exists():
 for name,item in json.loads(manifest.read_text(encoding='utf8'))['files'].items():
  p=ROOT/name
  if not p.exists() or digest(p)!=item['sha256']:changed.append(name)
print(json.dumps({'chapters':counts,'local_references':references,'external_urls':sorted(external),'errors':errors,'changed_since_report':changed},ensure_ascii=False,indent=2))
if errors:sys.exit(1)
