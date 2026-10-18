"""Controlli indipendenti delle stime e degli svolgimenti del capitolo 5; richiede SymPy."""
import sympy as s
n=s.symbols('n',positive=True,integer=True)
x=s.symbols('x',real=True)
checks=0
def zero(e):
 global checks
 assert s.simplify(s.expand_complex(e))==0,e
 checks+=1
limits=[((n+3)/(2*n**3+2*n+2)*n**2,s.Rational(1,2)),(n**s.Rational(1,3)/s.sqrt(n*n+n+1)*n**s.Rational(2,3),1),((n/(n+1))**n,s.exp(-1)),(s.log((n+2)/(n+4))*n,-2),(s.log((n*n+2)/(n*n-2))*n*n,4),(s.sin((n+2)/(n**3+4))*n*n,1),((n+s.log(n))/(n+s.cos(n))**3*n*n,1),((2**n+1)/(3**n+n)/(s.Rational(2,3)**n),1)]
for expr,expected in limits:
 assert s.simplify(s.limit(expr,n,s.oo)-expected)==0
 checks+=1
z=x+s.I*s.symbols('y',real=True);y=s.im(z)
zero(z*z-(x*x-y*y+2*s.I*x*y))
zero(s.exp(s.I*y)*(s.cos(y)-s.I*s.sin(y))-1)
zero((2-s.I)*(s.cos(x)-s.I*s.sin(x))-(2*s.cos(x)-s.sin(x)-s.I*(2*s.sin(x)+s.cos(x))))
zero((5+2*s.I)*(s.cos(2*x)+s.I*s.sin(2*x))-(5*s.cos(2*x)-2*s.sin(2*x)+s.I*(5*s.sin(2*x)+2*s.cos(2*x))))
a,b,L,t=s.symbols('a b L t',real=True)
zero((a+s.I*b)*(L+s.I*t)-(a*L-b*t+s.I*(b*L+a*t)))
zero((a-s.I*b)*(L+s.I*s.pi)-(a*L+b*s.pi+s.I*(a*s.pi-b*L)))
print({'symbolic_checks':checks})
