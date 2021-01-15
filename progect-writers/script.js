addEventListener('DOMContentLoaded', function() {

let writers = [
{
  name: "Быков Василь Владимирович",
  birthdate: "19 июня 1924",
  death: "22 июня 2003",
  birthplace: "Бычки",
  direction: "военная проза", 
  genre: "повесть, рассказ, публицистика, эссе",
  achievement: "Народный писатель Беларуси, Герой Социалистического Труда",
  photo: "img/bykov.jpg",
  period: "soviet",
  works: [{
    title: "Мёртвым не больно",
    style: "реализм",
    language: "белорусский",
    publication: "1965",
    screening: "да",
    photo_book: "https://delaemvmeste.by/wp-content/uploads/2015/01/Myortvyim-ne-balits.jpg"
  },{
    title: "Знак беды",
    style: "повесть",
    language: "белорусский",
    publication: "1982",
    screening: "нет",
    photo_book: "http://kamunikat.org/assets/images/19908-1.jpg"
  }]
},
{
  name: "Алексиевич Светлана Александровна",
  birthdate: "31 мая 1948",
  birthplace: "Станислав, УССР",
  direction: "нон-фикшн", 
  genre: "повесть",
  achievement: "Нобелевская премия по литературе (2015)",
  photo: "img/Aleksievich.jpg",
  period: "actual",
  works: [{
    title: "У войны не женское лицо",
    style: "документальная литература",
    language: "русский",
    publication: "1985",
    screening: "да",
    photo_book: "https://rusbuk.ru/uploads/books/455862/b94632e631642d467dd8ed43ece3cc85b413b10aMax.jpg"

  },{
    title: "Чернобыльская молитва",
    style: "документальная проза",
    language: "русский",
    publication: "1997",
    screening: "нет",
    photo_book: "https://prioklib.ru/wp-content/uploads/2017/07/chermol.jpeg"
  }]
},
{
  name: "Короткевич Владимир Семёнович",
  birthdate: "26 ноября 1930",
  death: "25 июля 1984",
  birthplace: "Орша, БССР",
  direction: "исторический роман", 
  achievement: "Орден Дружбы Народов",
  photo: "img/korotkevich.jpg",
  period: "soviet",
  works: [{
    title: "Чёрный замок Ольшанский",
    style: "	детектив, исторический роман",
    language: "белорусский",
    publication: "1978",
    screening: "да",
    photo_book: "http://s4.gallery.aystatic.by/650/727/390/5021/5021390727_0.jpg"
  },{
    title: "Дикая охота короля Стаха",
    style: "повесть",
    language: "белорусский",
    publication: "1964",
    screening: "нет",
    photo_book: "https://goldenlib.ru/uploads/31353.jpg"
  }]
},{
  name: "Рублевская Людмила Ивановна",
  birthdate: "5 июля 1965",
  birthplace: "Минск, БССР",
  direction: "историческая проза, детектив", 
  achievement: "Лауреат Национальной литературной премии",
  photo: "http://www.movananova.by/wp-content/uploads/2016/10/BS_7297.jpg",
  period: "actual",
  works: [{
    title: "Подземелья Ромула",
    style: "Фантастика, приключения, детектив",
    language: "белорусский",
    publication: "2011",
    screening: "нет",
    photo_book: "https://cdn1.ozone.ru/multimedia/1026229766.jpg"
  },{
    title: "Авантюры Прантиша Вырвича, школяра и шпика",
    style: "приключенческо-фантасмогорический роман",
    language: "белорусский",
    publication: "2012",
    screening: "нет",
    photo_book: "https://s3-goods.ozstatic.by/2000/565/630/10/10630565_0.jpg"
  }]
}];

// установка локального сервера
if (localStorage.getItem('myDB'))
	writers = JSON.parse(localStorage.getItem('myDB'));
else 
	localStorage.setItem('myDB', JSON.stringify(writers));

  // сброс локального сервера
  document.getElementById('reset_server').addEventListener('click', function(e){
    localStorage.clear();
  })

  // сортировка по алфавиту
document.getElementById('sort_name').addEventListener('click', function(e){
  writers.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});
localStorage.setItem('myDB', JSON.stringify(writers));
window.location.reload();
});

function getObjectById(id) {
	for (let i = 0; i < writers.length; i++) {
		if (writers[i].id == id) {
			return i;
		}
	}
}

function getDivById(id) {
	let allDivs = document.getElementsByClassName('blok_writer');
	for (let i = 0; i < allDivs.length; i++) {
		if (allDivs[i].getAttribute('data-id') == id)
			return allDivs[i];
	}
}

let wrap_blok_writer = document.createElement('div');
document.body.appendChild(wrap_blok_writer);
wrap_blok_writer.classList.add('wrap_blok_writer');
wrap_blok_writer.id = 'wrap_blok_writer';

let counter = 0;
writers.forEach(function(el) {
  el.id = counter++;
})


for(let i = 0; i < writers.length; i++){
  getWriter(i);
}


function getWriter(i){
  // добавляем див и ему класс
let div = document.createElement('div');
wrap_blok_writer.appendChild(div);
div.classList.add('blok_writer');
div.classList.add(writers[i].period);
div.setAttribute('data-id', writers[i].id);
// добавляем фотку и ей класс
let img = document.createElement('img');
img.classList.add('cl_blok_writer_img');
img.src = writers[i].photo;
div.appendChild(img);
// добавляем имя писателя + класс
let nameWriter = document.createElement('h3');
div.appendChild(nameWriter);
nameWriter.innerHTML = writers[i].name;

// добавляем дату рождения
div.appendChild(crElement('Дата рождения: ', writers[i].birthdate));
// добавляем дату смерти
if(writers[i].death){
  div.appendChild(crElement('Дата смерти: ', writers[i].death));
} 
//добавляем место рождения
div.appendChild(crElement('Место рождения: ', writers[i].birthplace));
//добавляем направление деятельности
div.appendChild(crElement('Направление: ', writers[i].direction));

//добавляем жанр
if(writers[i].genre){
  div.appendChild(crElement('Жанр: ', writers[i].genre));
}
//Добавляем награды
if(writers[i].achievement){
  div.appendChild(crElement('Достижение: ', writers[i].achievement));
}

// добавляем произведения
let works = document.createElement('p');
div.appendChild(works);
works.innerHTML = 'Избранные произведения: ';
for(let j=0; j < writers[i].works.length; j++){
    let worksA = document.createElement('a');
    worksA.classList.add('books');
    works.appendChild(worksA);
    worksA.href = '#';
    worksA.title = writers[i].works[j].title;
    worksA.innerHTML = writers[i].works[j].title + " ";


    // вывод на экран карточки с информацией о книге
    worksA.addEventListener('click', function(e){
      // фон для окна
      let overlay = document.createElement('div');
      document.body.appendChild(overlay);
      overlay.classList.add('overlay');
      // окно
      let wrap_forbook = document.createElement('div');
      document.body.appendChild(wrap_forbook);
      wrap_forbook.classList.add('wrap-for-book-null');
      wrap_forbook.classList.add('wrap-for-book');
      // добавляем фотку и ей класс
      let photo_book = document.createElement('img');
      photo_book.classList.add('wrap-for-book__img');
      photo_book.src = writers[i].works[j].photo_book;
      wrap_forbook.appendChild(photo_book);
      //название книги
      let titleBook = document.createElement('h2');
      wrap_forbook.appendChild(titleBook);
      titleBook.innerHTML = writers[i].works[j].title;
      // жанр
      wrap_forbook.appendChild(crElement('Жанр: ', writers[i].works[j].style));
      //язык исполнения
      wrap_forbook.appendChild(crElement('Язык исполнения: ', writers[i].works[j].language));
      // первая публикация
      wrap_forbook.appendChild(crElement('Первая публикация: ', writers[i].works[j].publication));
      // Экранизация
      wrap_forbook.appendChild(crElement('Экранизация: ', writers[i].works[j].screening));
      // иконка для отключения
      let closeIcon = document.createElement('img');
      closeIcon.classList.add('wrap-for-book__icon-close');
      closeIcon.src = "img/close.png";
      wrap_forbook.appendChild(closeIcon);
      // сворачивание окна
      closeIcon.addEventListener('click', function(evt) {
        wrap_forbook.classList.remove('wrap-for-book');
        overlay.classList.remove('overlay');
      });
      this.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
            wrap_forbook.classList.remove('wrap-for-book');
            overlay.classList.remove('overlay');
        }
      });
    });
}
    // добавляет обертку для кнопок карточки
    let div_btn_cards = document.createElement('div');
    div_btn_cards.classList.add('div_btn_cards');
    div.appendChild(div_btn_cards);

    // добавляем кнопку удаления карточки с данными писателями
    let delete_writer = document.createElement('img');
    delete_writer.classList.add('btn-delete_writer');
    div_btn_cards.appendChild(delete_writer);
     delete_writer.src = 'img/icons8-удалить-файл-64.png';

    // добавляем кнопку редактирования карточки
    let updateCard = document.createElement('img');
    updateCard.classList.add('btn-update-card');
    div_btn_cards.appendChild(updateCard);
    updateCard.src = 'https://img.icons8.com/ultraviolet/40/000000/installing-updates.png';
    
    // добавляем кнопку для добавления произведения
    let addBook = document.createElement('a');
    addBook.id = 'id_new_book';
    addBook.classList.add('new-book');
    div_btn_cards.appendChild(addBook);
    addBook.href = '#';
    addBook.innerHTML = 'Добавить книгу ';
    let imgAddBook = document.createElement('img');
    addBook.appendChild(imgAddBook);
    imgAddBook.src = 'img/icons8-плюс-2-30.png';

    
// открытие формы для добавления книги
addBook.addEventListener('click', function(evt) {
  openWindow('form_new_book', 'form-for-new-book', 'overlay_add_new_book_writer', 'overlay');
  addEventListener('keydown', function (evt) {
    closeWindow('form_new_book', 'form-for-new-book', 'overlay_add_new_book_writer', 'overlay', evt);
  });
  document.getElementById('img-close_form-for-new-book').addEventListener('click', function(evt) {
    closeWindowImg('form_new_book', 'form-for-new-book', 'overlay_add_new_book_writer', 'overlay');
  });
  document.getElementById('get_book').addEventListener('click', function(evt) {
    closeWindowImg('form_new_book', 'form-for-new-book', 'overlay_add_new_book_writer', 'overlay');
  });
});


// карточка для удаления писателя
let overlay_delete_wind = document.createElement('div');
overlay_delete_wind.id = 'overlay_delete_wind';
document.body.appendChild(overlay_delete_wind); /* темный фон для карточки*/
let delete_wind = document.createElement('div');
delete_wind.id = 'id_delete_wind';
delete_wind.classList.add('modal_del_writer_null');
document.body.appendChild(delete_wind);
let text_delete_wind = document.createElement('p');
text_delete_wind.classList.add('text_modal_del_writer');
text_delete_wind.innerHTML = 'Карточка и все её данные будут удалены!';
delete_wind.appendChild(text_delete_wind);
let btn_delete_yes = document.createElement('a');
let btn_delete_no = document.createElement('a');
btn_delete_yes.classList.add('btn_delete_yes');
btn_delete_no.classList.add('btn_delete_no');
btn_delete_yes.href = '#';
btn_delete_no.href = '#';
btn_delete_yes.id = 'btn_delete_yes';
btn_delete_yes.innerHTML = 'Удалить';
btn_delete_no.innerHTML = 'Отмена';
delete_wind.appendChild(btn_delete_yes);
delete_wind.appendChild(btn_delete_no);
// div.appendChild(overlay_delete_wind);
// открытие формы для удаления карточки с данными писателя
delete_writer.addEventListener('click', function() {
  // openWindow('id_delete_wind', 'modal_del_writer', 'overlay_delete_wind', 'overlay');
  // addEventListener('keydown', function (evt) {  
  //   closeWindow('id_delete_wind', 'modal_del_writer', 'overlay_delete_wind', 'overlay', evt);
  // });
  // btn_delete_no.addEventListener('click', function () {
  //   closeWindowImg('id_delete_wind', 'modal_del_writer', 'overlay_delete_wind', 'overlay');
  // });
  //   btn_delete_yes.addEventListener('click', function () {
  //   closeWindowImg('id_delete_wind', 'modal_del_writer', 'overlay_delete_wind', 'overlay');
  // });
  let id = div.getAttribute('data-id');
  let index = getObjectById(id);
  writers.splice(index, 1);
localStorage.setItem('myDB', JSON.stringify(writers));
  div.remove();

});

// РЕДАКТИРОВАНИЕ КАРТОЧКИ С ПИСАТЕЛЕМ

updateCard.addEventListener('click', function(){
  openWindow('form-create_id', 'create_form-writer', 'overlay_delete_wind', 'overlay');

  addEventListener('keydown', function (evt) {
    closeWindow('form-create_id', 'create_form-writer', 'overlay_delete_wind', 'overlay', evt);
  });
  document.getElementById('img-close_form-create_id').addEventListener('click', function () {
    closeWindowImg('form-create_id', 'create_form-writer', 'overlay_delete_wind', 'overlay');
  });

  let id = div.getAttribute('data-id');
  let index = getObjectById(id);
  let editForm = document.getElementsByName('edit')[0];

editForm.elements.create_name.value = writers[index].name;
editForm.elements.create_birthdate.value = writers[index].birthdate;
editForm.elements.create_death.value = writers[index].death;
editForm.elements.create_birthplace.value = writers[index].birthplace;
editForm.elements.create_direction.value = writers[index].direction;
editForm.elements.create_genre.value = writers[index].genre;
editForm.elements.create_achievement.value = writers[index].achievement;
editForm.elements.create_photo.value = writers[index].photo;

editForm.setAttribute('data-dbid', index);

editForm.elements.saveBtn.addEventListener('click', function(event){
  let formSave = this.parentElement;

  let newName = formSave.elements.create_name.value;
  let newBirthdate = formSave.elements.create_birthdate.value;
  let newDeath = formSave.elements.create_death.value;
  let newBirthplace = formSave.elements.create_birthplace.value;
  let newDirection = formSave.elements.create_direction.value;
  let newGenre = formSave.elements.create_genre.value;
  let newAchievement = formSave.elements.create_achievement.value;
  let newPhoto = formSave.elements.create_photo.value;

  let dbid = formSave.getAttribute('data-dbid');

  writers[dbid].name = newName;
  writers[dbid].birthdate = newBirthdate;
  writers[dbid].death = newDeath;
  writers[dbid].birthplace = newBirthplace;
  writers[dbid].direction = newDirection;
  writers[dbid].genre = newGenre;
  writers[dbid].achievement = newAchievement;
  writers[dbid].photo = newPhoto;
  localStorage.setItem('myDB', JSON.stringify(writers));
	let newDiv = getWriter(writers[dbid]);
  let oldDiv = getDivById(writers[dbid].id);
  oldDiv.div.replaceChild(newDiv, oldDiv);
  closeWindowImg('form-create_id', 'create_form-writer', 'overlay_delete_wind', 'overlay');
  event.preventDefault();
  console.log(dbid);
});
});

return div;
}
// конец функции добавления карточки





// открытие формы для добавления писателя
let add_writer = document.getElementById('add_writer');
add_writer.addEventListener('click', function(evt) {
  openWindow('form_add_writer', 'form-for-add-writer', 'overlay_add_writer', 'overlay');
  addEventListener('keydown', function (evt) {
    closeWindow('form_add_writer', 'form-for-add-writer', 'overlay_add_writer', 'overlay', evt);
  });
});
document.getElementById('img-close_form-for-add-writer').addEventListener('click', function(evt) {
  closeWindowImg('form_add_writer', 'form-for-add-writer', 'overlay_add_writer', 'overlay');
});

let writer = document.getElementById('get_writer');
writer.addEventListener('click', function(e){
  let newWriter = {
    name: document.getElementById('name').value,
    birthdate: document.getElementById('birthdate').value,
    death: document.getElementById('death').value,
    birthplace: document.getElementById('birthplace').value,
    direction: document.getElementById('direction').value,
    genre: document.getElementById('genre').value,
    achievement: document.getElementById('achievement').value,
    photo: document.getElementById('photo').value,
    works:[{
      title: document.getElementById('title').value,
      style: document.getElementById('style').value,
      language: document.getElementById('language').value,
      publication: document.getElementById('publication').value,
      screening: document.getElementById('screening').value,
      photo_book: document.getElementById('photo_book').value
    }]
  };
  writers.push(newWriter);
  getWriter(writers.length - 1);
  localStorage.setItem('myDB', JSON.stringify(writers));
    closeWindowImg('form_add_writer', 'form-for-add-writer', 'overlay_add_writer', 'overlay');
})



// функция для фильтра
let filter_select = document.getElementById('filter');
let items_el = document.getElementById('wrap_blok_writer');
filter_select.onchange = function () {
  console.log(this.value);
  let items = items_el.getElementsByClassName('blok_writer');
  for(let i = 0; i<items.length; i++){
    if(items[i].classList.contains(this.value)){
      items[i].style.display = 'block';
    } else {
      items[i].style.display = 'none';
    }
  }
}
});


function crElement(text, value) {
  let newElement = document.createElement('p');
  newElement.innerHTML = text;
  let newElementSpan = document.createElement('span');
  newElement.appendChild(newElementSpan);
  newElementSpan.innerHTML = value;
  return newElement;
}

// функции закрытия окна
function closeWindow(idOne, classOne, idTwo, classTwo, evt){
  if (evt.keyCode === 27) {
    document.getElementById(idOne).classList.remove(classOne);
    document.getElementById(idTwo).classList.remove(classTwo);
  }
}
function closeWindowImg(idOne, classOne, idTwo, classTwo){
    document.getElementById(idOne).classList.remove(classOne);
    document.getElementById(idTwo).classList.remove(classTwo);
}
// функция открытия окна
function openWindow(idOne, classOne, idTwo, classTwo){
  document.getElementById(idOne).classList.add(classOne);
  document.getElementById(idTwo).classList.add(classTwo);
}