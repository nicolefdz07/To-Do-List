const taskForm = document.querySelector('.task-form');
const taskInput = document.getElementById('task-input');

//ul que contiene los li de las tareas
const taskList = document.getElementById('task-list');
const listItemsDiv = document.querySelector('list-items');
//boton para limpiar la lista
const clearBtn = document.querySelector('.clear-list');

//boton para añadir tarea
const addBtn = document.querySelector('.add-task');


//function to add a task (to DOM for the moment)
function addTask(e){
    e.preventDefault();

    const newTask = taskInput.value;
    if(newTask === ''){
        alert('Please, add a task');
        return;
    }
    console.log('success');

    //create li element
    const li = document.createElement('li');
    let checkbox = createCheckbox(newTask);
    li.appendChild(checkbox);
    const deleteIcon = createTrash();
    li.appendChild(deleteIcon);

    //append li to ul
    taskList.appendChild(li);
    taskInput.value = '';
    // console.log(li);
}

//function create checkbox
function createCheckbox(text){
    const div = document.createElement('div');
    div.classList.add('text-checkbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    checkbox.id = 'checkbox';

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

//function to remove task (from DOM)
function removeTask(e){
    if(e.target.parentElement.classList.contains('remove-task')){
        // console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
    checkUI();
}

//function to clear all tasks
function clear(){


    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    checkUI();
    
}

//function to check UI
function checkUI(){
    const tasks = document.querySelectorAll('li');
    if( tasks.length === 0){
        clearBtn.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
    }
    console.log(clearBtn);
}

checkUI();

// Event Listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clear);
document.addEventListener('DOMContentLoaded',checkUI);