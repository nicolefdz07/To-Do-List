const taskForm = document.querySelector('.task-form');
const taskInput = document.getElementById('task-input');

//ul que contiene los li de las tareas
const taskList = document.getElementById('task-list');
const listItemsDiv = document.querySelector('.list-items');
//boton para limpiar la lista
const clearBtn = document.querySelector('.clear-list');
const filter = document.getElementById('filter');

//boton para añadir tarea
const addBtn = document.querySelector('.add-task');
// const checkBox = document.getElementById('checkbox');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//function to display tasks from local storage
function displayTasks(){
    const tasksFromStorage = getTasksFromStorage();

    tasksFromStorage.forEach(task => {
        addTaskToDOM(task);
    });
    checkUI();
    
}
//handler function that calls the function to add tasks to the DOM and local storage
function onAddItemSubmit(e){
    e.preventDefault();

    const newTask = taskInput.value;
    if(newTask === ''){
        alert('Please, add a task');
        return;
    }

    //add task to DOM
    addTaskToDOM(newTask);
    

    //add task to local storage
    addTaskToStorage(newTask);
    checkCheckBox();
    taskInput.value = '';
    // console.log(li);
    checkUI();
    
}
//el parametro es el texto de la tarea
function addTaskToDOM(task){
    
    //create li element
    const li = document.createElement('li');
    let checkbox = createCheckbox(task);
    li.appendChild(checkbox);
    const deleteIcon = createTrash();
    li.appendChild(deleteIcon);

    //append li to ul (D0M)
    taskList.appendChild(li);
    
}

//function to add tasks to local storage
function addTaskToStorage(task){
    const tasksFromStorage = getTasksFromStorage();

    //add the new task to the array
    tasksFromStorage.push(task);

    //convert to JSON string and set to local storage
    localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));

}

//function to get tasks from local storage returns an array if there are tasks, otherwise an empty array
function getTasksFromStorage(){
    let tasksFromStorage;

    if(localStorage.getItem('tasks') === null){
        tasksFromStorage = [];
    }else{
        // originalmente nos devuelve un string, aqui lo convertimos a un array
        tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));   
    }
    return tasksFromStorage;
}

//===============================================================================================
//function to add a task (to DOM for the moment)
// function addTask(e){
//     e.preventDefault();

//     const newTask = taskInput.value;
//     if(newTask === ''){
//         alert('Please, add a task');
//         return;
//     }
//     console.log('success'); 

//     //create li element
//     const li = document.createElement('li');
//     let checkbox = createCheckbox(newTask);
//     li.appendChild(checkbox);
//     const deleteIcon = createTrash();
//     li.appendChild(deleteIcon);

//     //append li to ul
//     taskList.appendChild(li);
//     taskInput.value = '';
//     // console.log(li);
//     checkUI();
    
// }
//===============================================================================================
//function create checkbox


function createCheckbox(text){
    const div = document.createElement('div');
    div.classList.add('text-checkbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    checkbox.id = 'checkbox';

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            div.style.textDecoration = 'line-through';
        } else {
            div.style.textDecoration = 'none';
        }
    });
    const taskText =  document.createTextNode(text);

    div.appendChild(checkbox);
    div.appendChild(taskText);

    return div;
}
// function create button
function createTrash(){
    const trash = document.createElement('button');
    trash.classList.add('remove-task');
    const icon = createIcon();
    trash.appendChild(icon);
    return trash;


}
//function create icon

function createIcon(){
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash');
    return icon;
}

function onClickTask(e){
    if(e.target.parentElement.classList.contains('remove-task')){
    removeTask(e.target.parentElement.parentElement);
}
}

//function to remove task (from DOM)
function removeTask(task){
        if(confirm('Are you sure?')){
            //remove task from DOM
        task.remove();

        //remove task from storage
        removeTaskFromStorage(task.textContent);
    }
    checkUI();
}

//function to remove task from storage
function removeTaskFromStorage(task){
    let tasksFromStorage = getTasksFromStorage();

    //filter out tasks to be removed(an array that contains all the tasks except the one that is been passed as an argument)
    tasksFromStorage = tasksFromStorage.filter(i => i !== task);

    //reset to local storage
    localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));

    
}
    



//function to clear all tasks
function clear(){


    while(taskList.firstChild){
        
        taskList.removeChild(taskList.firstChild);
    }
    // localStorage.removeTask('tasks');
    // localStorage.clear();
    localStorage.clear();  
    checkUI();
    
    
}


//function to filter tasks
function filterTasks(e){
    const tasks = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    // console.log(text);
    tasks.forEach(task => {
        const taskName = task.firstElementChild.textContent.trim().toLowerCase();
        // console.log(taskName);


        //if what we type is in the task name, display the task
        if(taskName.indexOf(text) != -1){
            task.style.display = 'flex';
        }else{
            task.style.display = 'none';
        }
    });
    

}

//function to check checkbox
function checkCheckBox(){

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        if(checkbox.checked){
            checkbox.parentElement.style.textDecoration = 'line-through';
        }else{
            checkbox.parentElement.style.textDecoration = 'none';
        }
    });

}



//function to check UI
function checkUI(){
    const tasks = document.querySelectorAll('li');
    
    if( tasks.length === 0){
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
    // console.log(clearBtn);
    checkCheckBox();
    // 
    
    
    
}
// console.log(document.querySelector('li').firstChild.textContent);
// console.log(document.querySelector('li > .text-checkbox').textContent.trim());
// console.log(document.querySelector('li').firstElementChild.textContent.trim());
init();
//function to initialize app

function init(){
    
    
   
    document.addEventListener('DOMContentLoaded', () => {
        displayTasks();  // Primero cargamos las tareas
        checkUI();      // Luego ejecutamos checkUI
        
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', checkCheckBox)
        });
    });
    
    taskForm.addEventListener('submit', onAddItemSubmit);
    taskList.addEventListener('click', onClickTask);
    clearBtn.addEventListener('click', clear);
    filter.addEventListener('input', filterTasks);
}

