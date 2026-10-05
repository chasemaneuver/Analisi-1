'use strict';
// La firma MV diventa anche l'icona della scheda, in tutti i capitoli.
const mvIcon=document.createElement('link');
mvIcon.rel='icon';mvIcon.type='image/svg+xml';
mvIcon.href=new URL('mv.svg',document.currentScript.src).href;
document.head.append(mvIcon);
const chapterSelect=document.querySelector('#capitolo');
if(chapterSelect){
  // Il catalogo condiviso aggiorna il menu anche nei capitoli già pubblicati.
  const chapters=[[1,'Numeri'],[2,'Funzioni'],[3,'Limiti e continuità']];
  for(const [number,title] of chapters){
    const value=`../capitolo-${number}/`;
    if(![...chapterSelect.options].some(option=>option.value===value)){
      const option=document.createElement('option');option.value=value;option.textContent=`${number} · ${title}`;chapterSelect.append(option);
    }
  }
  chapterSelect.addEventListener('change',()=>{window.location.href=chapterSelect.value;});
}
