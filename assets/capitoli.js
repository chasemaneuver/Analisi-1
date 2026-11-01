'use strict';
// La firma MV diventa anche l'icona della scheda, in tutti i capitoli.
const mvIcon=document.createElement('link');
mvIcon.rel='icon';mvIcon.type='image/svg+xml';
mvIcon.href=new URL('mv.svg',document.currentScript.src).href;
document.head.append(mvIcon);
const chapterSelect=document.querySelector('#capitolo');
if(chapterSelect){
  // Il catalogo condiviso aggiorna il menu anche nei capitoli già pubblicati.
  const chapters=[["1", "Numeri", "capitolo-1"], ["2", "Funzioni", "capitolo-2"], ["3", "Limiti e continuità", "capitolo-3"], ["4", "Calcolo differenziale", "capitolo-4"], ["5", "Serie", "capitolo-5"], ["6", "Calcolo integrale", "capitolo-6"], ["7", "Modelli dinamici discreti", "capitolo-7"], ["A", "Formule utili", "appendice-a"], ["B", "Grafici", "appendice-b"]];
  for(const [number,title,path] of chapters){
    const value=`../${path}/`;
    let option=[...chapterSelect.options].find(option=>option.value===value);
    if(!option){option=document.createElement('option');option.value=value;option.textContent=`${number} · ${title}`;}
    chapterSelect.append(option);
  }
  chapterSelect.addEventListener('change',()=>{window.location.href=chapterSelect.value;});
}
