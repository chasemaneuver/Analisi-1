"""Verifica HTTP dei link esterni; timeout/blocchi non sono prova di link rotto."""
from pathlib import Path
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json
ROOT=Path(__file__).resolve().parents[2]
class Links(HTMLParser):
 def __init__(self):super().__init__();self.urls=set()
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  for k in ('href','src'):
   if a.get(k,'').startswith('https://'):self.urls.add(a[k])
urls=set()
for p in [ROOT/'index.html',*ROOT.glob('capitolo-*/index.html')]:
 l=Links();l.feed(p.read_text(encoding='utf8'));urls.update(l.urls)
def check(url):
 try:
  with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0 Analisi-1-link-check'}),timeout=20) as r:return {'url':url,'status':r.status,'final_url':r.url,'result':'raggiungibile'}
 except HTTPError as e:return {'url':url,'status':e.code,'result':'da correggere' if e.code in (404,410) else 'accesso limitato/non verificabile'}
 except Exception as e:return {'url':url,'result':'non verificabile','reason':type(e).__name__}
with ThreadPoolExecutor(max_workers=5) as ex:results=list(ex.map(check,sorted(urls)))
print(json.dumps(results,ensure_ascii=False,indent=2))
