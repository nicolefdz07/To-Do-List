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
    checkUI();
    
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
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
    }
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

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        if(checkbox.checked){
            checkbox.parentElement.style.textDecoration = 'line-through';
        }else{
            checkbox.parentElement.style.textDecoration = 'none';
        }
    });

    // console.log(checkbox.checked);
    // if(this.checked){
    //     this.parentElement.style.textDecoration = 'line-through';
        
    // }else{
    //     this.parentElement.style.textDecoration = 'none';
    // }
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


checkUI();
// console.log(document.querySelector('li').firstElementChild.textContent);

// Event Listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clear);
filter.addEventListener('input', filterTasks);
// checkboxes.addEventListener('click', checkCheckBox);
document.addEventListener('DOMContentLoaded',checkUI);
checkboxes.forEach(checkbox =>{
    checkbox.addEventListener('change', checkCheckBox)
});

