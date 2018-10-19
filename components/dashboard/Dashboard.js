require('../button/Button');
require('../input/Input');
require('../date-picker/DatePicker');
const TaskProcessor = require('../../processors/TaskProcessor');
const DateUtility = require('../../utilities/DateUtility');
const Modal = require('../modal/Modal');

let _newTaskReqFields = {
    title: false,
    sDate: false,
    prior: false
};

// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="dashboard-main" class="dashboard-section is-shown">
                <h1 class="d-title">Dashboard</h1>
                <div id="action-btn-container">
                    <button id="show-task-modal">Crear tarea</button>
                </div>
                <div id="card-list">
                    <div id="task-card" class="d-card">
                        <i class="d-card-icon material-icons">bookmark</i>
                        <span class="d-card-title">tareas</span>
                    </div>
                    <div id="task-list-card" class="d-card">
                        <i class="d-card-icon material-icons">list</i>
                        <span class="d-card-title">listas</span>
                    </div>
                    <div id="task-lists-card" class="d-card">
                        <i class="d-card-icon material-icons">autorenew</i>
                        <span class="d-card-title">sync</span>
                    </div>
                    <div class="d-card new-card">
                        <i class="d-card-icon material-icons">add</i>
                        <span class="d-card-title">nueva app</span>
                    </div>
                </div>
            </div> 
            
            <div id="create-task" class="dashboard-section">
                <h1 class="d-title">Nueva tarea</h1>
                <app-input id="new-task-title" icon="default" icon-align="left" placeholder="Título"></app-input>
                <date-picker placeholder="¿Cuándo empieza?" id="new-task-sd"></date-picker>
                <date-picker placeholder="¿Cuándo termina?" id="new-task-ed"></date-picker>
                <div id="new-task-priority">
                    <div id="priority-icons-wrapper">
                        <i class="material-icons" id="new-task-priority-icon">flag</i>
                        <i class="material-icons prior-opt" priority-value="1">flag</i>
                        <i class="material-icons prior-opt" priority-value="2">flag</i>
                        <i class="material-icons prior-opt" priority-value="3">flag</i>
                    </div>
                </div>
                <button id="create-task-btn" class="btn-disabled">Crear tarea</button>
            </div>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/dashboard/dashboard.css);
        `;
        shadowRoot.appendChild(style);
    }

    static get observedAttributes(){
        return ['state'];
    }

    get state(){
        return this.getAttribute('state');
    }

    set state(val){
        this.setAttribute('state', val);
    }

    attributeChangedCallback(attr, newVal, oldVal){
        switch(attr){
            case 'state':

                break;
        }
    }

    connectedCallback(){
        this.state = 0;
        this.showCreateTaskView();
        this.validateTaskFields();
        this.createNewTask();

        this.shadowRoot.querySelector('#show-task-modal').addEventListener('click', function(){
            let modal = new Modal();
            modal.build('prueba', '<span>hola</span>');
            modal.show();
        })
    }

    validateTaskFields(){
        let title = this.shadowRoot.querySelector('#new-task-title');
        let startDate = this.shadowRoot.querySelector('#new-task-sd');
        let priority = this.shadowRoot.querySelector('#new-task-priority');

        title.addEventListener('input', function(){
            Bus.emit('cnt', _newTaskReqFields.title = (this.value.trim().length > 0));
        });
        startDate.addEventListener('change', function(){
            Bus.emit('cnt', _newTaskReqFields.sDate = (DateUtility.validate(this.value)));
        });

        let thiz = this;
        let priorOpts = priority.getElementsByClassName('prior-opt');
        Array.from(priorOpts).forEach(function(el){
            el.addEventListener('click', function(){
                priority.setAttribute('priority-value', el.getAttribute('priority-value'));
                thiz.setTaskPriorityColor(el.getAttribute('priority-value'));
                Bus.emit('cnt', _newTaskReqFields.prior = true);
            });
        });
    }

    createNewTask(){
        let btn = this.shadowRoot.querySelector('#create-task-btn');
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

        let title = this.shadowRoot.querySelector('#new-task-title');
        let startDate = this.shadowRoot.querySelector('#new-task-sd');
        let endDate = this.shadowRoot.querySelector('#new-task-ed');
        let priority = this.shadowRoot.querySelector('#new-task-priority');

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
                   }).catch((err) => {
                       console.error('[!] Error creating task', err);
               });
            }
        }, false);
    }

    setTaskPriorityColor(value){
        let priorIcon = this.shadowRoot.getElementById('new-task-priority-icon');
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

    showCreateTaskView(){
        this.shadowRoot.querySelector('#task-card').addEventListener('click', function(){
            this.switchSection('create-task');
        }.bind(this));
    }

    switchSection(section){
        let sections = this.shadowRoot.querySelector('.is-shown');
        sections.classList.remove('is-shown');

        let createTask = this.shadowRoot.getElementById(section);
        createTask.classList.add('is-shown');
    }
}

window.customElements.define('app-dashboard', Dashboard);