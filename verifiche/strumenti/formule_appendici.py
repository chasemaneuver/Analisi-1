"""Verifiche simboliche mirate al formulario; richiede SymPy."""
import sympy as s
x=s.symbols('x',positive=True);y=s.symbols('y',real=True);a=s.symbols('a',positive=True);n=s.symbols('n',integer=True,positive=True)
checks=0
def eq(left,right):
 global checks
 assert s.simplify(s.trigsimp(left-right))==0,(left,right)
 checks+=1
# Derivate su intervalli con argomenti dei logaritmi positivi;
# log|f| ha f'/f anche sugli altri intervalli dove f non si annulla.
derivatives=[(x**a,a*x**(a-1)),(s.log(x),1/x),(s.log(x)/s.log(a),1/(x*s.log(a))),(s.exp(x),s.exp(x)),(a**x,a**x*s.log(a)),(s.sin(x),s.cos(x)),(s.cos(x),-s.sin(x)),(s.tan(x),1/s.cos(x)**2),(s.cot(x),-1/s.sin(x)**2),(s.sinh(x),s.cosh(x)),(s.cosh(x),s.sinh(x)),(s.tanh(x),1/s.cosh(x)**2),(s.coth(x),-1/s.sinh(x)**2),(s.log(s.sin(x)),s.cot(x)),(s.log(s.cos(x)),-s.tan(x)),(s.log(s.sinh(x)),s.coth(x)),(s.log(s.cosh(x)),s.tanh(x)),(s.asin(x),1/s.sqrt(1-x*x)),(s.acos(x),-1/s.sqrt(1-x*x)),(s.atan(x),1/(1+x*x)),(s.acot(x),-1/(1+x*x))]
for f,d in derivatives:eq(s.diff(f,x),d)
primitives=[(x**(a+1)/(a+1),x**a),(s.log(x),1/x),(s.exp(x),s.exp(x)),(a**x/s.log(a),a**x),(-s.cos(x),s.sin(x)),(s.sin(x),s.cos(x)),(-s.log(s.cos(x)),s.tan(x)),(s.log(s.sin(x)),s.cot(x)),(s.cosh(x),s.sinh(x)),(s.sinh(x),s.cosh(x)),(s.log(s.cosh(x)),s.tanh(x)),(s.log(s.sinh(x)),s.coth(x)),(s.tan(x),1/s.cos(x)**2),(-s.cot(x),1/s.sin(x)**2),(s.tanh(x),1/s.cosh(x)**2),(-s.coth(x),1/s.sinh(x)**2),(s.atan(x),1/(1+x*x)),(s.log((1+x)/(1-x))/2,1/(1-x*x)),(s.asin(x),1/s.sqrt(1-x*x)),(s.log(x+s.sqrt(1+x*x)),1/s.sqrt(1+x*x)),(s.log(x+s.sqrt(x*x-1)),1/s.sqrt(x*x-1))]
for f,d in primitives:eq(s.diff(f,x),d)
# Per x<-1, il logaritmo assoluto dell'ultima riga dà la stessa derivata.
t=s.symbols('t',positive=True);u=-s.cosh(t)
F=s.log(-u-s.sqrt(u*u-1))
eq(s.diff(F,t)/s.diff(u,t),1/s.sinh(t))
eq(s.diff(s.atan(x*x),x),2*x/(1+x**4))
for sign in [-1,1]:
 eq(s.sin(x+sign*y).expand(trig=True),s.sin(x)*s.cos(y)+sign*s.cos(x)*s.sin(y))
 eq(s.cos(x+sign*y).expand(trig=True),s.cos(x)*s.cos(y)-sign*s.sin(x)*s.sin(y))
 eq(s.expand_trig(s.sinh(x+sign*y)),s.sinh(x)*s.cosh(y)+sign*s.cosh(x)*s.sinh(y))
 eq(s.expand_trig(s.cosh(x+sign*y)),s.cosh(x)*s.cosh(y)+sign*s.sinh(x)*s.sinh(y))
eq(s.sin(x)**2+s.cos(x)**2,1);eq(s.cosh(x)**2-s.sinh(x)**2,1)
# Angoli non usuali: controllo dei radicali delle tavole.
for angle,co,si in [(s.pi/10,s.sqrt(10+2*s.sqrt(5))/4,(s.sqrt(5)-1)/4),(s.pi/5,(s.sqrt(5)+1)/4,s.sqrt(10-2*s.sqrt(5))/4),(3*s.pi/10,s.sqrt(10-2*s.sqrt(5))/4,(s.sqrt(5)+1)/4),(2*s.pi/5,(s.sqrt(5)-1)/4,s.sqrt(10+2*s.sqrt(5))/4)]:
 eq(s.cos(angle),co);eq(s.sin(angle),si)
for f in [s.exp(x),s.sin(x),s.cos(x),s.sinh(x),s.cosh(x),s.log(1+x),s.atan(x),(1+x)**s.Rational(1,2),(1+x)**s.Rational(-1,2)]:
 poly=s.series(f,x,0,7).removeO()
 for k in range(7):eq(poly.coeff(x,k),s.limit(s.diff(f,x,k),x,0)/s.factorial(k))
# Minimi, limiti e normalizzazione dell'atlante.
eq(s.limit(x*s.log(x),x,0,dir='+'),0);eq(s.limit(x**x,x,0,dir='+'),1)
eq(s.diff(x*s.log(x),x).subs(x,1/s.E),0);eq(s.diff(x**x,x).subs(x,1/s.E),0)
eq(s.integrate(s.exp(-y*y/2)/s.sqrt(2*s.pi),(y,-s.oo,s.oo)),1)
eq(s.limit(s.sin(x)/x,x,0),1);eq(s.limit(x*s.sin(1/x),x,0,dir='+'),0)
print({'symbolicChecks':checks,'derivativeRows':len(derivatives),'primitiveRows':len(primitives)})
