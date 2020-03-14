document.querySelector('.left_btn').addEventListener('click', function(evt){
    
    let galler = document.querySelector('.gallery_scroll');
        galler.style.left = 0;
        galler.style.removeProperty("right");
    // evt.preventDefault();
}
)
document.querySelector('.right_btn').addEventListener('click', function(evt){
    let galler = document.querySelector('.gallery_scroll');
        galler.style.right = 0;
        galler.style.removeProperty("left");
    // evt.preventDefault();
}
)