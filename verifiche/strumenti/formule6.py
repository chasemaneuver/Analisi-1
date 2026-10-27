"""Verifica mirata delle primitive e dei valori del capitolo 6; richiede SymPy e mpmath.
I dati corrispondono alle formule esposte nell'HTML; non è una certificazione formale del testo.
"""
from pathlib import Path
import json
import sympy as s
import mpmath as m
m.mp.dps=30
x=s.symbols('x',positive=True)
checks=0
def zero(expr):
 global checks
 reduced=s.simplify(s.trigsimp(s.expand_trig(expr.rewrite(s.exp))))
 assert reduced==0,reduced
 checks+=1
def near(a,b,tol=1e-20):
 global checks
 assert abs(a-b)<tol*max(1,abs(b)),(a,b)
 checks+=1
data=json.loads(Path(__file__).with_name('dati-formule6.json').read_text(encoding='utf8'))
for r in data:
 f=s.sympify(r['f'],locals={'x':x});F=s.sympify(r['F'],locals={'x':x})
 if r['exercise']==30:
  # Nei due intervalli log x ha segno costante e d log|log x| = 1/(x log x).
  F=s.log(s.log(x))
 zero(s.diff(F,x)-f)
 if r['kind']=='definite':
  a,b,value=[s.sympify(r[k]) for k in ('a','b','value')]
  near(complex(s.N(F.subs(x,b)-F.subs(x,a),25)),complex(s.N(value,25)),1e-14)
  fnum=s.lambdify(x,f,'mpmath');anum=m.mpf(str(s.N(a,30)));bnum=m.mpf(str(s.N(b,30)))
  near(m.quad(fnum,[anum,bnum]),m.mpf(str(s.N(value,30))),1e-19)
# Svolgimenti multipli e formule teoriche non inclusi nei dati precedenti.
extra=[((3*x+1)**3,(3*x+1)**4/12),((3*x*x+1)**3,27*x**7/7+27*x**5/5+3*x**3+x),
 (x*(3*x*x+1)**3,(3*x*x+1)**4/24),(s.cot(x),s.log(s.sin(x))),(s.tanh(x),s.log(s.cosh(x))),
 (s.tan(x)**2,s.tan(x)-x),(s.tanh(x)**2,x-s.tanh(x)),
 (x/(x*x-4),s.log(x*x-4)/2),(s.exp(-x)*(x*x+x),-s.exp(-x)*(x*x+3*x+3)),
 (s.exp(x)*s.sin(2*x),s.exp(x)*(s.sin(2*x)-2*s.cos(2*x))/5),
 (1/(s.sqrt(x)*(1+x)),2*s.atan(s.sqrt(x))),
 (s.sqrt(2*x+1)/x,2*s.sqrt(2*x+1)+s.log((s.sqrt(2*x+1)-1)/(s.sqrt(2*x+1)+1))),
 ((x-1)/(x+1)**3,-1/(x+1)+1/(x+1)**2),
 (s.sqrt(x*x-2)/x,s.sqrt(x*x-2)-s.sqrt(2)*s.atan(s.sqrt(x*x-2)/s.sqrt(2))),
 (x*s.sin(2*x),-x*s.cos(2*x)/2+s.sin(2*x)/4),
 (1/(x*(s.log(x)+1)),s.log(s.log(x)+1)),
 (s.sqrt(x+1)/x,2*s.sqrt(x+1)+s.log((s.sqrt(x+1)-1)/(s.sqrt(x+1)+1))),
 (s.sqrt(1+s.sqrt(x)),s.Rational(4,5)*(1+s.sqrt(x))**s.Rational(5,2)-s.Rational(4,3)*(1+s.sqrt(x))**s.Rational(3,2))]
for f,F in extra:zero(s.diff(F,x)-f)
zero(s.diff(x*s.atan(x/(x-3))+s.Rational(3,4)*s.log(2*x*x-6*x+9)+s.Rational(3,2)*s.atan((2*x-3)/3),x)-s.atan(x/(x-3)))
near(m.quad(lambda t:abs((t-1)*(t+3)),[0,1,2]),4)
near(m.quad(lambda t:m.sin(t)**3*m.cos(t)**2,[0,m.pi/3]),m.mpf(47)/480)
near(m.quad(lambda t:m.sqrt(1+m.sqrt(t)),[0,9]),m.mpf(232)/15)
near(m.quad(lambda t:t*m.log(t),[0,1]),-m.mpf(1)/4)
near(m.quad(lambda u:2*m.exp(-u),[0,m.inf]),2)
near(m.quad(lambda t:m.exp(-2*t)*m.sin(m.exp(-t)),[0,m.inf]),m.sin(1)-m.cos(1))
near(m.quad(lambda u:2*(1-m.exp(-u*u))/(u*u) if u else 2,[0,1]),-2*(1-m.exp(-1))+4*m.quad(lambda t:m.exp(-t*t),[0,1]),1e-16)
near(m.quad(lambda t:t/(1+t*t)**2,[0,m.inf]),m.mpf(1)/2)
near(m.quad(lambda t:m.atan(t/(t-3)),[2,3,4]),4*m.atan(4)+2*m.atan(2)-3*m.pi+m.mpf(3)/4*m.log(m.mpf(17)/5)+m.mpf(3)/2*(m.atan(m.mpf(5)/3)-m.atan(m.mpf(1)/3)))
for n in (1,2,3,10,100):
 mn=sum((s.Rational(2*k+1,2*n))**2 for k in range(n))/n
 zero(s.Rational(1,3)-mn-s.Rational(1,12*n*n))
print(json.dumps({'chapter':6,'symbolic_records':len(data),'checks':checks,'scope':'primitive, valori definiti, limiti impropri selezionati, refuso n², salto arctan, area e lavoro'}))
