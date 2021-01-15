addEventListener('DOMContentLoaded', function() {
var arrTasks = [];
if (localStorage.getItem('LinkTasc'))
  arrTasks = JSON.parse(localStorage.getItem('LinkTasc'));
else 
  localStorage.setItem('LinkTasc', JSON.stringify(arrTasks));
// Главный блок
let listCases = document.createElement('div');
listCases.classList.add('box-cases');
document.body.appendChild(listCases);
// заголовок приложения, инпут для сортировки
listCases.innerHTML = `<h2>Список дел<h2/>
                        <select name="sort" id="sort"> 
                          <option>Сортировать :</option>
                          <option value="done">выпоненные</option>
                          <option value="unfulfilled">невыполненные</option>
                          <option value="abc">по алфавиту</option>
                        </select>`;

//кнопка добавления новой задачи
let btnAdd = document.createElement('button');
btnAdd.innerText = 'Добавить';
btnAdd.classList.add('box-cases_btn');
listCases.appendChild(btnAdd);
// обработка событий кнопки
btnAdd.addEventListener('click', function(){
  wrapTasks.style.display = 'none';
  popup.style.display = 'block';
  popupText.value = '';
});

// оболочка для задач
let wrapTasks = document.createElement('div');
wrapTasks.classList.add('wrap-tasks');
listCases.appendChild(wrapTasks);

for(let i = 0; i < arrTasks.length; i++){
getTask(i);
}
// модальное окно создания задачи
let popup = document.createElement('div');
popup.classList.add('box-popup');
listCases.appendChild(popup);
// заголовок
let popupTitle = document.createElement('h4');
popupTitle.innerText = 'Придумай себе занятие';
popup.appendChild(popupTitle);
// поле для текста
let popupText = document.createElement('textarea');
popupText.id = 'new_task';
popup.appendChild(popupText);
// кнопка сохранить
let saveBtn = document.createElement('button');
saveBtn.innerText = 'Сохранить';
saveBtn.classList.add('btn-save');
popup.appendChild(saveBtn);
// кнопка отмены
let cancelBtn = document.createElement('button');
cancelBtn.innerText = 'Отмена';
cancelBtn.classList.add('btn-cancel');
popup.appendChild(cancelBtn);
// обработка событий кнопки отмена
cancelBtn.addEventListener('click', function(){
  popup.style.display = 'none';
  wrapTasks.style.display = 'flex';
});

function getTask(i){
    var newElement = document.createElement('div');
    newElement.classList.add('block-task');
    wrapTasks.appendChild(newElement);

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('check');
    newElement.appendChild(checkbox);

    if(arrTasks[i].status == 'done'){
      newElement.classList.add('color-green');
      checkbox.checked = true;
    }       
    if(arrTasks[i].status == 'none'){
      newElement.classList.remove('color-green');
      checkbox.checked = false;
    }
  // отметка о выпонении
    checkbox.addEventListener('change', function(){
      if(checkbox.checked){
        arrTasks[i].status = 'done';
        newElement.classList.add('color-green');
        localStorage.setItem('LinkTasc', JSON.stringify(arrTasks));
      }
       else {
        arrTasks[i].status = 'none';
        newElement.classList.remove('color-green');
        localStorage.setItem('LinkTasc', JSON.stringify(arrTasks));
      }
    });

// добавление текста к задаче
    let span = document.createElement('span');
    span.classList.add('span_class');
    span.innerText = arrTasks[i].text;
    newElement.appendChild(span);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Удалить';
    newElement.appendChild(deleteBtn); 
// удаление задачи
    deleteBtn.addEventListener('click', function(){
      newElement.remove();
      arrTasks.splice(i, 1);
      localStorage.setItem('LinkTasc', JSON.stringify(arrTasks));
    })
}

// создание задачи
saveBtn.addEventListener('click', function(){
  if(document.getElementById('new_task').value){
    let newTask = {
      text: document.getElementById('new_task').value
    }
    arrTasks.push(newTask);
    getTask(arrTasks.length-1);
    localStorage.setItem('LinkTasc', JSON.stringify(arrTasks));
  }
    if(document.getElementById('new_task').value.length > 0){
    popup.style.display = 'none';
    wrapTasks.style.display = 'flex';
  }
});
// сортировка элементов
let sort_select = document.getElementById('sort');
sort_select.addEventListener('change', function(){
  let collectionElements = wrapTasks.getElementsByClassName('block-task');
  let sumCollectionElements = collectionElements.length;
  for(let i = 0; i < sumCollectionElements; i++){
  let collectionCheckbox = collectionElements[i].getElementsByClassName('check');
// выполненные дела
  if(this.value == 'done'){
    if(collectionCheckbox[0].checked){
      collectionElements[i].style.order = '0';
    } else {
      collectionElements[i].style.order = '1';
    }
  } 
  // невыполненные дела
  if(this.value == 'unfulfilled') {
      if(collectionCheckbox[0].checked){
        collectionElements[i].style.order = '1';
      } else {
        collectionElements[i].style.order = '0';
      }
      // по алфавиту
    } 
    if(this.value == 'abc'){
      if(collectionElements[i].style.order == 1){
        collectionElements[i].style.order = '0';
      }
      let items = document.getElementsByClassName('block-task');
      let itemsArr = [];
      for (let i in items) {
        if (items[i].nodeType == 1) {
          itemsArr.push(items[i]);
        }
      }
      itemsArr.sort(function(a, b) {
        if(a.innerText > b.innerText){return 1;}
        if(a.innerText < b.innerText){return -1;}
        else{return 0;}
      });
      for (i = 0; i < itemsArr.length; ++i) {
       wrapTasks.appendChild(itemsArr[i]);
      }
    }
  }
});
})