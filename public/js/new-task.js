let TaskProcessor = require('../../processors/TaskProcessor');
const DateUtility = require('../../utilities/DateUtility');

let _newTaskReqFields = {
    title: false,
    sDate: false,
    prior: false
};

// Show create-new-task modal when user press 'q' key
// as long as there exists a user session
document.addEventListener('keydown', e => {
    if(sessionStorage.getItem('email') && e.ctrlKey && e.key === 't'){
        let modal = document.getElementById('new-task-modal');
        modal.show();
    }
});

function validateTaskFields(){
    let title = document.getElementById('new-task-title');
    let startDate = document.getElementById('new-task-sd');
    let priority = document.getElementById('new-task-priority');

    title.addEventListener('input', function(){
        Bus.emit('cnt', _newTaskReqFields.title = (this.value.trim().length > 0));
    });
    startDate.addEventListener('change', function(){
        Bus.emit('cnt', _newTaskReqFields.sDate = (DateUtility.validate(this.value)));
    });

    let priorOpts = priority.getElementsByClassName('prior-opt');
    Array.from(priorOpts).forEach(function(el){
        el.addEventListener('click', function(){
            priority.setAttribute('priority-value', el.getAttribute('priority-value'));
            setTaskPriorityColor(el.getAttribute('priority-value'));
            Bus.emit('cnt', _newTaskReqFields.prior = true);
        });
    });
}

function createNewTask(){
    let btn = document.getElementById('create-task-btn');
    Bus.listen('cnt', function(){
        let completed = Object.values(_newTaskReqFields).every(function(el){
            return el === true;
        });

        if(completed){
            btn.classList.remove('btn-disabled');
        }else{
            btn.classList.add('btn-disabled');
        }
    }.bind(this));

    let title = document.getElementById('new-task-title');
    let startDate = document.getElementById('new-task-sd');
    let endDate = document.getElementById('new-task-ed');
    let priority = document.getElementById('new-task-priority');

    btn.addEventListener('click', function(){
        if(!this.classList.contains('btn-disabled')){
            let task = {
                title: title.value.trim(),
                startDate: startDate.value,
                endDate: endDate.value,
                priority: priority.getAttribute('priority-value')
            };

            btn.classList.add('btn-disabled'); // Set button disabled again to avoid duplicated calls

            let processor = new TaskProcessor(task);
           processor.save()
               .then(() => {
                   console.log('%c[!] Task created successfully', 'color: green');
                    clearFields();
                    showSuccess();

                    Bus.emit('/new-task-created', task);

               }).catch((err) => {
                   console.error('[!] Error creating task', err);
           });
        }
    }, false);
}

function setTaskPriorityColor(value){
    let priorIcon = document.getElementById('new-task-priority-icon');
    switch(parseInt(value)){
        case 1:
            priorIcon.style.color = 'rgb(222, 76, 74)';
            break;
        case 2:
            priorIcon.style.color = 'rgb(255, 163, 86)';
            break;
        case 3:
            priorIcon.style.color = 'rgb(255, 216, 116)';
            break;
    }
}

function clearFields(){
    document.getElementById('new-task-title').value = '';
    document.getElementById('new-task-sd').value = '';
    document.getElementById('new-task-ed').value = '';
    document.getElementById('new-task-priority').style.color = '#666';
    document.getElementById('new-task-priority-icon').removeAttribute('priority-value');
}

function showSuccess(){
    let taskForm = document.getElementById('new-task-form');
    let success = document.getElementById('task-created-content');

    taskForm.classList.remove('shown');
    success.classList.add('shown');
    setTimeout(function(){
        let modal = document.getElementById('new-task-modal');
        modal.hide();

        success.classList.remove('shown');
        taskForm.classList.add('shown');
    }, 2000);
}

validateTaskFields();
createNewTask();
