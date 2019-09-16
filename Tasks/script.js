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
// кнопка отменв
let cancelBtn = document.createElement('button');
cancelBtn.innerText = 'Отмена';
cancelBtn.classList.add('btn-cancel');
popup.appendChild(cancelBtn);
// обработка событий кнопки отмена
cancelBtn.addEventListener('click', function(){
  popup.style.display = 'none';
  wrapTasks.style.display = 'flex';
});

// создание задачи
saveBtn.addEventListener('click', function(){
  let textTask = document.getElementById('new_task').value;

  if(textTask){
    var newElement = document.createElement('div');
    newElement.classList.add('block-task');
    wrapTasks.appendChild(newElement);

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('check');
    newElement.appendChild(checkbox);
  // отметка о выпонении
    checkbox.addEventListener('change', function(){
      if(checkbox.checked){
        newElement.classList.add('color-green');
      } else {
        newElement.classList.remove('color-green');
      }
    });
// добавление текста к задаче
    let span = document.createElement('span');
    span.innerText = `${textTask}`;
    newElement.appendChild(span);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Удалить';
    newElement.appendChild(deleteBtn); 
// удаление задачи
    deleteBtn.addEventListener('click', function(){
      newElement.remove();
    })
  }
  if(textTask.length > 0){
    popup.style.display = 'none';
    wrapTasks.style.display = 'flex';
    localStorage.setItem('myDB', JSON.stringify(bookmark));
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
// невыполненные дела
  } else if(this.value == 'unfulfilled') {
      if(collectionCheckbox[0].checked){
        collectionElements[i].style.order = '1';
      } else {
        collectionElements[i].style.order = '0';
      }
    }
  }
});
if (localStorage.getItem('myDB'))
 listCases = JSON.parse(localStorage.getItem('myDB'));
else 
	localStorage.setItem('myDB', JSON.stringify(listCases));