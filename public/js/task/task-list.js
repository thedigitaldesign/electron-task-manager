let TaskProcessor = require('../../../processors/TaskProcessor');
const DateUtility = require('../../../utilities/DateUtility');
const ResponseCodes = require('../../../utilities/ResponseCodes');

async function getAllTask(container){
    let processor = new TaskProcessor();
    let response = await processor.getTasksByUser();
    container.innerHTML = '';

    if(response.rc === ResponseCodes.PROCESS_OK){
        // Append list inside container
        let list = document.createElement('ul');
        list.id = 'task-list';

        response.bean.forEach(function(el){
            let priority = 0;
            if(el.priority){
                priority = el.priority;
            }

            let li = document.createElement('li');
            li.classList.add('task-element', 'flex', 'justify-content-space-between', 'align-items-center');
            li.innerHTML = `
                <div class="flex align-items-center task-el">
                    <div class="check-task-circle flex justify-content-center align-items-center" priority=${priority}>
                        <i class="material-icons" priority=${priority}>done</i>
                    </div>
                    <span class="task-title">${el.title}</span>
                </div>
                <div class="flex align-items-center task-el">
                    <span class="task-deadline">${DateUtility.setFormat(el.deadline, 'dd Month yyyy')}</span>
                    <i class="material-icons task-more flex justify-content-center align-items-center" data-toggle="hola">more_horiz</i>
                </div>
                <div class="task-menu">
                    <div class="task-menu-item flex align-items-center" data-action="reminder">
                        <i class="material-icons">alarm</i>
                        <span>Recordatorios</span>
                    </div>
                    <div class="task-menu-item flex align-items-center" data-action="edit">
                        <i class="material-icons">edit</i>
                        <span>Editar</span>
                    </div>
                    <div class="task-menu-item flex align-items-center" data-action="delete">
                        <i class="material-icons">delete</i>
                        <span>Eliminar</span>
                    </div>
                </div> 
            `;

            list.appendChild(li);
        });

        container.appendChild(list);
    }else{
        // Show message inside container
        let span = document.createElement('span');
        span.textContent = 'No hay tareas para mostrar';

        container.appendChild(span);
    }

    // Show menu
    Array.from(container.querySelectorAll('.task-more')).forEach(function(el){
        el.addEventListener('click', function(){
            let menu = el.parentNode.parentNode.querySelector('.task-menu');
            menu.classList.add('display-block');
            menu.tabIndex = -1;
            menu.focus();

            menu.onblur = function(){
                this.classList.remove('display-block');
            }
        });
    });

    // Click on menu item and hide menu
    Array.from(container.querySelectorAll('.task-menu-item')).forEach(function(el){
        el.addEventListener('click', function(){
            taskAction(el.parentNode.parentNode, el.dataset.action);
            el.parentNode.classList.remove('display-block');
        });
    });
}

function taskAction(task, action){
    switch(action){
        case 'edit': // edit current task
            let title = task.querySelector('.task-title').textContent;
            Array.from(task.querySelectorAll('.task-el')).forEach(function(el){
                el.style.display = 'none';
            });
            let editElement = document.createElement('div');
            editElement.className = 'flex align-items-center edit-task-container';
            editElement.innerHTML = `
                <j-input class="edit-task-input" icon="default" value="${title}"></j-input>
                <date-picker class="edit-task-deadline"></date-picker>
                <button class="edit-task-btn generic-btn">Guardar</button>
                <button class="cancel-edit-task-btn empty-btn">Cancelar</button>
            `;
            task.appendChild(editElement);

            task.querySelector('.cancel-edit-task-btn').addEventListener('click', function(){
                restoreTask(task);
            });
            task.querySelector('.edit-task-btn').addEventListener('click', function(){
                updateTaskBasicInfo(task);
            });

            break;
        case 'delete': // delete current task
            break;
        case 'reminder': // add a new reminder to task
            break;
    }
}

function restoreTask(task){
    task.querySelector('.edit-task-container').remove();
    Array.from(task.querySelectorAll('.task-el')).forEach(function(el){
        el.style.display = 'flex';
    });
}

async function updateTaskBasicInfo(task){
    let title = task.querySelector('.edit-task-input').value;
    let deadline = task.querySelector('.edit-task-deadline').value;

    console.log(title);
    console.log(deadline);

    let processor = new TaskProcessor({
        title,
        deadline
    });
    //let response = await processor.update();
}

module.exports = {
    getAllTask,
};