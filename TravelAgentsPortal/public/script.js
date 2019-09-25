addEventListener('DOMContentLoaded', function() {

    let input = document.getElementById('search__input-where');
    input.addEventListener('click', function(){
        input.placeholder = 'Italy, China, etc.';
        input.classList.add('search__input_red-color');
        // input.placeholder.style.color = 'red';
        let elements = document.getElementsByClassName('search__elem_none');
        for(let i = 0; i<elements.length; i++){
            elements[i].style.display = 'block';
        }
    })

});