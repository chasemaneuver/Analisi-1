"""Controlli simbolici mirati: ricorrenze, dati iniziali e correzioni C7. Richiede SymPy."""
from fractions import Fraction
import sympy as s
n=s.symbols('n',integer=True,nonnegative=True)
x,r,A,a,b=s.symbols('x r A a b',real=True)
C,C1,C2,C3=s.symbols('C C1 C2 C3',real=True)
checks=0
def zero(expr):
 global checks
 assert s.simplify(s.expand_trig(s.expand(expr)))==0,expr
 checks+=1
def recurrence(u,coeff,g=0):
 zero(sum(c*u.subs(n,n+j) for j,c in enumerate(coeff))-g)
# Esercizi 1-3: primo ordine e forzanti.
recurrence(C*(-s.Rational(1,3))**n,[s.Rational(1,3),1])
recurrence(s.Rational(1,3)+C*(-2)**n,[2,1],1)
recurrence(1+2**(n+1),[-2,1],-1)
recurrence(4-n,[-1,1],-1)
recurrence(4*(-1)**n,[1,1])
recurrence(2*n-4,[-s.Rational(1,2),1],n)
recurrence(s.Rational(2,3)*2**n,[-s.Rational(1,2),1],2**n)
# Iterata crescente e trasformazioni razionali esatte.
f=2/(1+x);g=s.factor(f.subs(x,f));zero(g-2*(x+1)/(x+3));zero(g-x+(x-1)*(x+2)/(x+3))
zero((f-1)/(f+2)+(x-1)/(2*(x+2)))
av=375/(x-90)+100;zero((av-115)/(av-75)+s.Rational(3,5)*(x-115)/(x-75))
zero(s.diff(av,x).subs(x,115)+s.Rational(3,5))
newton=(x+A/x)/2;y=s.symbols('y',positive=True);zero((newton-y-(x-y)**2/(2*x)).subs(A,y*y))
u=Fraction(32257,12192);assert Fraction(26457513,10000000)<7/u<u<Fraction(26457514,10000000);checks+=1
f=x*s.exp(1-x**3/3);zero(s.diff(f,x)-s.exp(1-x**3/3)*(1-x**3))
zero((s.diff(f,x)+2).subs(x,3**s.Rational(1,3)))
# Secondo ordine, esercizi 14-19, inclusi i due problemi del terzo ordine.
recurrence(3**n-2**n,[6,-5,1])
recurrence(C1+C2*s.Rational(1,2)**n,[1,-3,2])
recurrence(C1*s.cos(n*s.pi/2)+C2*s.sin(n*s.pi/2),[1,0,1])
recurrence((C1+C2*n)*2**n+1,[4,-4,1],1)
recurrence(C1+C2*2**n+3**n/2,[2,-3,1],3**n)
recurrence(C1+C2*s.cos(n*s.pi/2)+C3*s.sin(n*s.pi/2)-n/2,[-1,1,-1,1],-1)
period6=(-1)**n+2/s.sqrt(3)*s.sin(n*s.pi/3)
recurrence(period6,[1,0,0,1]);zero(period6.subs(n,n+6)-period6)
for j,value in enumerate([1,0,2]):zero(period6.subs(n,j)-value)
u19=20/s.sqrt(6)*(((2+s.sqrt(6))/4)**n-((2-s.sqrt(6))/4)**n)
# Radici e dati verificati separatamente, evitando semplificazioni fragili delle potenze.
for root in [(2+s.sqrt(6))/4,(2-s.sqrt(6))/4]:zero(root**2-root-s.Rational(1,8))
zero(u19.subs(n,0));zero(u19.subs(n,1)-10)
recurrence(s.Rational(9,4)-5**n/4,[5,-6,1])
recurrence((C1+C2*n)*(-2)**n,[4,4,1])
recurrence(C1*(-s.Rational(1,3))**n+C2*(-s.Rational(1,2))**n+s.Rational(1,4),[1,5,6],3)
phi=(1+s.sqrt(5))/2;psi=(1-s.sqrt(5))/2
zero(phi**2-phi-1);zero(psi**2-psi-1)
for k,value in [(0,1),(1,1),(12,233)]:zero((phi**(k+1)-psi**(k+1))/s.sqrt(5)-value)
# Logistica: ciclo due, schwarziana, soglia non iperbolica r=3.
f=r*x*(1-x);f2=s.expand(f.subs(x,f));Q=r*r*x*x-r*(r+1)*x+r+1
zero(s.rem(f2-x,Q,x))
zero(s.rem(s.diff(f2,x)-(-r*r+2*r+4),Q,x))
zero(s.diff(f,x,3)/s.diff(f,x)-s.Rational(3,2)*(s.diff(f,x,2)/s.diff(f,x))**2+6/(1-2*x)**2)
z=s.symbols('z');zero(f2.subs({r:3,x:z+s.Rational(2,3)})-s.Rational(2,3)-(z-18*z**3-27*z**4))
# Alla nascita del ciclo tre: f^3 - x ha tre zeri doppi interni.
rho=1+2*s.sqrt(2);h=rho*x*(1-x);h3=s.expand(h.subs(x,h).subs(x,h))
factors=s.factor_list(h3-x,x,extension=s.sqrt(2))[1]
cubics=[q for q,power in factors if s.degree(q,x)==3 and power==2]
assert len(cubics)==1;Q3=cubics[0];checks+=1
zero(s.rem(s.diff(h3,x)-1,Q3,x,extension=s.sqrt(2)))
assert s.degree(s.gcd(Q3,s.diff(h3,x,2),x,extension=s.sqrt(2)),x)==0;checks+=1
roots=s.nroots(Q3);assert len(roots)==3 and all(abs(s.im(t))<1e-15 and 0<s.re(t)<1 for t in roots);checks+=1
print({'chapter':7,'symbolic_checks':checks,'scope':'esercizi e dati selezionati; ciclo due; biforcazione periodo tre; Schwarziana; Fibonacci; refuso periodicita'})
