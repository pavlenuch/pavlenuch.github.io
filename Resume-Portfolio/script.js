addEventListener('DOMContentLoaded', function() {
"use strict";

  let wrapBigImg = document.createElement('div');
  document.body.appendChild(wrapBigImg);
  let bigImg = document.createElement('img');
  wrapBigImg.appendChild(bigImg);
  wrapBigImg.classList.add('bigImg-class');

  let close = document.createElement('img');
  wrapBigImg.appendChild(close);
  close.classList.add('close-class');
  close.src="https://img.icons8.com/material-sharp/48/000000/close-window.png"

  let elements = document.getElementsByClassName('certificate');

  for(let i =0; i<elements.length; i++){
    elements[i].addEventListener('click', function(){
      bigImg.src = this.src;
      wrapBigImg.style.display = 'block';
    })
  }

  close.addEventListener('click', () => {
    wrapBigImg.style.display = 'none';
  });

  this.addEventListener('keydown', evt => {
    if (evt.keyCode === 27) {
      wrapBigImg.style.display = 'none';
    }
  });

});