"""Rigenera le impronte solo dopo il controllo, senza promuovere esiti non verificati."""
from pathlib import Path
import hashlib,json,re,argparse
parser=argparse.ArgumentParser()
parser.add_argument('--date',required=True)
parser.add_argument('--report',required=True)
args=parser.parse_args()
ROOT=Path(__file__).resolve().parents[2]
files={}
for p in sorted(ROOT.rglob('*')):
 if not p.is_file() or '.git' in p.parts or '__pycache__' in p.parts or p.suffix=='.pyc':continue
 rel=p.relative_to(ROOT).as_posix()
 if rel.startswith('verifiche/report-') or rel=='verifiche/stato.json':continue
 raw=p.read_bytes().replace(b'\r\n',b'\n');item={'sha256':hashlib.sha256(raw).hexdigest()}
 if p.suffix=='.html':
  s=raw.decode('utf8');body=s.split('<body',1)[-1];item['body_sha256']=hashlib.sha256(body.encode()).hexdigest()
  item['sections']={}
  for m in re.finditer(r'<h2\b[^>]*id="([^"]+)"[^>]*>[\s\S]*?(?=<h2\b|<footer\b|$)',s):item['sections'][m.group(1)]=hashlib.sha256(m.group().encode()).hexdigest()
 files[rel]=item
record={'date':args.date,'report':args.report,'hash_normalization':'CRLF to LF','coverage':{'structure':'complete for tracked site pages','math_rendering':'all source formulas in five chapters','labs':'all 66 labs sampled; new chapter 5 controls in browser, chapter 1-4 prior UI evidence retained','mathematical_correctness':'targeted analytical, numerical and symbolic checks; not exhaustive formal certification','external_links':'time dependent; access restrictions recorded'},'dependencies':{'assets/stile.css':'all chapters: layout, math overflow, mobile, print','assets/capitoli.js':'all chapters: navigation and icon','mathjax':'all chapters: formula rendering'},'files':files}
(ROOT/'verifiche/stato.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print(f'Registrate {len(files)} versioni; leggere il report per la copertura effettiva.')
