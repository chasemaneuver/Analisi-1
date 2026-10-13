import sympy as s
x=s.symbols('x',positive=True)
checks=[
(s.exp(-3*x)*(x*x+2*x-1),s.exp(-3*x)*(-3*x*x-4*x+5)),
(s.exp(2*x)*(2*s.sin(3*x)-4*s.cos(3*x)),s.exp(2*x)*(16*s.sin(3*x)-2*s.cos(3*x))),
((x*x+3*x-2)/(2*x+1),(2*x*x+2*x+7)/(2*x+1)**2),
(x**(2*s.log(x)),4*x**(2*s.log(x))*s.log(x)/x),
((x*x+x-2)/(2*x+3),(2*x*x+6*x+7)/(2*x+3)**2),
(s.exp(3/s.log(x)),-3*s.exp(3/s.log(x))/(x*s.log(x)**2)),
(s.atan((x+1)/(x-3))+x/4,(x-3)*(x+1)/(4*((x-1)**2+4))),
((x*x+3*x+2)/(x+3),1-2/(x+3)**2),
((x**3+1)/(x+2),(2*x**3+6*x*x-1)/(x+2)**2),
((x*x+2*x-3)/(5*x*x+x),-3*(3*x*x-10*x-1)/(x*x*(5*x+1)**2)),
(s.sqrt(x)*s.log(x)**2,s.log(x)*(s.log(x)+4)/(2*s.sqrt(x))),
]
for f,df in checks:assert s.simplify(s.diff(f,x)-df)==0,(f,df)
limits=[((s.exp(x)-x-1)/x**2,s.Rational(1,2)),((x-s.sin(x))/(x*x*s.sin(x)),s.Rational(1,6)),((x*x*s.cos(x)+1-s.exp(x*x))/(x*x*s.sin(x)**2),-1),((x*s.sin(x)+s.log(1-x*x))/(x*x*(2*x+x*x)**2),s.Rational(-1,6))]
for f,L in limits:assert s.limit(f,x,0)==L
root_series=1/s.sqrt(3)*(1-x/6+x*x/24-5*x**3/432+35*x**4/10368-7*x**5/6912)
assert s.simplify(s.series(1/s.sqrt(3+x)-root_series,x,0,6).removeO())==0
assert s.simplify(s.diff(s.sqrt(x)*s.log(x)**2,x,2)-(8-s.log(x)**2)/(4*x**s.Rational(3,2)))==0
assert s.simplify(s.diff(s.sqrt((1-x)/(1+x)),x,2)-s.sqrt((1-x)/(1+x))*(1-2*x)/(1-x*x)**2)==0
print('Verificate: 11 derivate simboliche, 4 limiti con cancellazioni, sviluppo al quinto ordine, concavità dei modelli.')

z=s.symbols('z',real=True)
Q=z*z-5*z+6
assert s.simplify(s.diff(s.exp(z)*s.sqrt(Q),z)-s.exp(z)*(2*z*z-8*z+7)/(2*s.sqrt(Q)))==0
assert s.simplify(s.diff(s.exp(-z)*s.sqrt(Q),z)-s.exp(-z)*(-2*z*z+12*z-17)/(2*s.sqrt(Q)))==0
assert s.simplify((2*z*z-8*z+7).subs(z,0)/(2*s.sqrt(Q.subs(z,0)))-7/(2*s.sqrt(6)))==0
print('Verificate anche entrambe le derivate a tratti e la pendenza sinistra in zero.')

f77=(z**3+1)/(z+2)
assert s.simplify(s.diff(f77,z,2)-(2-14/(z+2)**3))==0
assert s.diff(f77,z,2).subs(z,-3)>0
assert s.diff(f77,z,2).subs(z,-1)<0
assert s.diff(f77,z,2).subs(z,1)>0
print('Verificata la concavità dei tre intervalli dell’esercizio 77.')
