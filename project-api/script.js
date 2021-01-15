let mainurl = 'https://api.themoviedb.org/3'

function sendRequest(addurl, cb) {
    let xhr = new XMLHttpRequest();
	xhr.open('GET', mainurl + addurl);
	xhr.send();
    
	xhr.addEventListener('load', cb);
}

addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('button');
    let count = 1;
    
 
    document.addEventListener('keydown', function(e) {
       if (e.keyCode === 13) {
        cleanCreateMovie();
        search();
       }
    });


	btn.addEventListener('click', function() {
        cleanCreateMovie();
        search();
    })

    function search(){
                // очистка блока от предыдущего вызова
                let element = document.getElementById('result');
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }  
                count = 1;
                let val = document.querySelector('input').value;
                let addurl = '/search/movie?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=' + val + '&page=1';
                    
                // формировани карточек из API
                sendRequest(addurl, function() {
                    let search = JSON.parse(this.response);
                    resSearch = search.results;
                    console.log(resSearch);
        
                    // вплытие кнопки вывода следующей страницы по клику + скролл
                    if(search.total_pages > 1){
                        document.getElementById('btn-show-more').style.display = 'block';
                        window.addEventListener('scroll', endlessScroll);
                    }
        
                    for (let i = 0; i < resSearch.length; i++) {
                        createCard(i); 
                        // console.log(resSearch[i].id);
                    }
                });
    }

// функция вывода следующей страницы по клику
let btn_showMore = document.getElementById('btn-show-more');

btn_showMore.addEventListener('click', showNextPage);

function showNextPage() {
    count++;
    window.removeEventListener('scroll', endlessScroll);

    let val = document.querySelector('input').value;
    let addurl = '/search/movie?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=' + val + '&page=' + count;
    sendRequest(addurl, function() {
        let search = JSON.parse(this.response);
        resSearch = search.results;

        for (let i = 0; i < resSearch.length; i++) {
            createCard(i); 
        }

        // условие на закрытие кнопки show-more
        if(count >= search.total_pages){
            document.getElementById('btn-show-more').style.display = 'none';
        } else {
            window.addEventListener('scroll', endlessScroll);
        }


    });
}

function endlessScroll() {
    if (Math.ceil(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
        showNextPage();
    }
}

});

// функция формирования карточки
function createCard(i){
    let div = document.createElement('div');
    div.classList.add('card_movie');
    document.getElementById('result').appendChild(div);

    if(resSearch[i].title){
        let h3 = document.createElement('h3');
        h3.classList.add('card-movie_title');
        h3.innerHTML = resSearch[i].title;
        div.appendChild(h3);
    }

    if(resSearch[i].poster_path){
        let img = document.createElement('img');
        img.classList.add('movie_img');
        img.src = "https://image.tmdb.org/t/p/original" + resSearch[i].poster_path;
        div.appendChild(img);
    }

    if(resSearch[i].release_date){
        let year = document.createElement('p');
        year.classList.add('movie_year-genre');
        year.innerHTML = "<span class='card-span'>Release year: </span>" + resSearch[i].release_date;
        div.appendChild(year);
    }


    let btnCard = document.createElement('button');
    btnCard.classList.add('card-movie__btn');
    btnCard.id = 'read_more';
    btnCard.href="#top";
    btnCard.innerHTML = '<a href="#top">Read more</a>';
    div.appendChild(btnCard);


//  расширенный запрос
    btnCard.addEventListener('click', function() {
        // очистка блока от предыдущего вызова
        let element = document.getElementById('create_movie');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }  
        let idElement = resSearch[i].id;
        let addurl = '/movie/' + idElement + '?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=';
        sendRequest(addurl, function() {
            let search = JSON.parse(this.response);
            // console.log(search);

            document.getElementById('create_movie').style.display = 'block';

            let createDiv = document.getElementById('create_movie');

            // кнопка close
            let close = document.createElement('img');
            close.src = "cancel.png";
            close.classList.add('create_movie_btn-close');
            createDiv.appendChild(close);

            close.addEventListener('click', function(){
                cleanCreateMovie();
            });

            // заголовок фильма
            if(search.original_title){
                let newH3 = document.createElement('h3');
                newH3.classList.add('create-movie_title');
                newH3.innerHTML = search.original_title;
                createDiv.appendChild(newH3);
            }


            // постер фильма
            if(search.poster_path){
                let img = document.createElement('img');
                img.classList.add('create_movie__img');
                img.src = "https://image.tmdb.org/t/p/original" + search.poster_path;
                createDiv.appendChild(img);
            }
            // описание сюжета
            if(search.overview){
                let text = document.createElement('p');
                text.classList.add('create_movie__text');
                text.innerHTML = search.overview;
                createDiv.appendChild(text);
            }
 
            // линия под описание сюжета
            let line = document.createElement('span');
            line.classList.add('line');
            createDiv.appendChild(line);
            // наименование информации + дата релиза
            if(search.release_date){
                let date = document.createElement('p');
                date.classList.add('create_movie__elem');
                date.innerHTML = "<span class='create_movie__span'>Release date: </span>" + search.release_date;
                createDiv.appendChild(date);
            }

            // Срана производитель
            if(search.production_countries != 0){
                let country = crElement(search.production_countries[0].name, "Production country: ");
                createDiv.appendChild(country);
            }

            // перебор жанров
            if(search.genres != 0){
                let genre = document.createElement('p');
                genre.classList.add('create_movie__elem-gen-act');
                let gen = search.genres;
                let arr = [];
                for(let j=0; j < gen.length; j++){
                    arr.push(gen[j].name);
                }
                let newArr = arr.join(', ');
                let genreSpan = document.createElement('span');
                genreSpan.innerHTML = newArr;
                genreSpan.classList.add('create_movie__span-gen-act');
                genre.innerHTML = 'Genre: ';
                genre.appendChild(genreSpan);
                createDiv.appendChild(genre);
            }
            
            // бюджет фильма
            if(search.budget){
                let budget = crElement(search.budget, "Budget: ");
                createDiv.appendChild(budget);
            }
            // длительность фильма
            if(search.runtime){
                let runtime = crElement(search.runtime, "Runtime: ");
                createDiv.appendChild(runtime);
            }

            // перебор актеров (число 13, я так захотел)
            let credits = '/movie/' + idElement + '/credits?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=';
            let actors = document.createElement('p');
            actors.classList.add('create_movie__elem-gen-act');
            sendRequest(credits, function() {
                let getCredits = JSON.parse(this.response);
                let act = getCredits.cast;
                if(act != 0){
                    let arrActor = [];
                    if(act.length >= 13){
                        for(let j=0; j < 13; j++){
                            arrActor.push(act[j].name);
                        }
                    } else {
                        for(let j=0; j < act.length; j++){
                            arrActor.push(act[j].name);
                        }
                    }
                    let newArrActor = arrActor.join(', ');
                    let actorsSpan = document.createElement('span');
                    actorsSpan.innerHTML = newArrActor;
                    actors.innerHTML = 'Actors: ';
                    actorsSpan.classList.add('create_movie__span-gen-act');
                    actors.appendChild(actorsSpan);
                }
            }); 
            createDiv.appendChild(actors);
            /*конецстроки перебора актеров*/

            // очистка float: :left
            let clear = document.createElement('div');
            clear.classList.add('clearfix');
            createDiv.appendChild(clear);

            // перебор картинок для фильма
            let wrapImg = document.createElement('div');
            wrapImg.classList.add('create_movie__wrap-img');
            
            let images= '/movie/' + idElement + '/images?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=';
            sendRequest(images, function() {
                let getImages = JSON.parse(this.response);
                let img = getImages.backdrops;
                if(img != 0){
                    if(img.length >= 4){
                        for(let i = 0; i < 4; i++){
                            let newImg = document.createElement('img');
                            newImg.classList.add('images-film');
                            newImg.src = "https://image.tmdb.org/t/p/original" + getImages.backdrops[i].file_path;
                            wrapImg.appendChild(newImg);

                            newImg.onmouseover = function(){
                                let imgHover = document.createElement('img');
                                imgHover.id = 'images-film_hover';
                                imgHover.src = this.src;
                                wrapImg.appendChild(imgHover);
                            }
                            newImg.onmouseout = function(){
                                let imgHover = document.getElementById('images-film_hover');
                                imgHover.remove();
                            }

                        }
                    } else {
                        for(let i = 0; i < img.length; i++){
                            let newImg = document.createElement('img');
                            newImg.classList.add('images-film');
                            newImg.src = "https://image.tmdb.org/t/p/original" + getImages.backdrops[i].file_path;
                            wrapImg.appendChild(newImg);

                            newImg.onmouseover = function(){
                                let imgHover = document.createElement('img');
                                imgHover.id = 'images-film_hover';
                                imgHover.src = this.src;
                                createDiv.appendChild(imgHover);
                            }
                            newImg.onmouseout = function(){
                                let imgHover = document.getElementById('images-film_hover');
                                imgHover.remove();
                            }
                        }
                    }
                }
            });
            createDiv.appendChild(wrapImg);
            
            // добавляем видос
            let video = document.createElement('div');
            video.classList.add('create_movie__video');
            let film = '/movie/' + idElement + '/videos?api_key=a920020b8a37e76c3fb84f76eaa7fba2&query=';
            sendRequest(film, function() {
                let getFilm = JSON.parse(this.response);
                let showFilm = getFilm.results
                if(showFilm != 0){
                    let newGetFilm = getFilm.results[0].key
                    video.innerHTML = '<iframe src="https://www.youtube.com/embed/' + newGetFilm + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                }
                

            });
            createDiv.appendChild(video);




        });
    })
}

function crElement(text, value) {
    let newElement = document.createElement('p');
    newElement.classList.add('create_movie__elem');
    newElement.innerHTML = "<span class='create_movie__span'>" + value + "</span>" + text;
    return newElement;
  }

function cleanCreateMovie(){
    document.getElementById('create_movie').style.display = 'none';
    // очистка блока от предыдущего вызова
    let element = document.getElementById('create_movie');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }  
}
