'use strict';
const chapterSelect=document.querySelector('#capitolo');
if(chapterSelect)chapterSelect.addEventListener('change',()=>{window.location.href=chapterSelect.value;});
