require('../button/Button');
require('../input/Input');
require('../date-picker/DatePicker');
const TaskProcessor = require('../../processors/TaskProcessor');
const ResponseCodes = require('../../utilities/ResponseCodes');
const Render = require('../../processors/Renderer');

// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="dashboard-main" class="dashboard-section">
                <h1 class="d-title">Dashboard</h1>
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
            
            <div id="create-task" class="dashboard-section is-shown">
                <h1 class="d-title">Nueva tarea</h1>
                <app-input icon="default" icon-align="left" placeholder="Título"></app-input>
                <div class="date-container">
                    <date-picker placeholder="¿Cuándo empieza?"></date-picker>
                    <date-picker placeholder="¿Cuándo termina?"></date-picker>
                </div>
                <div id="task-priority">
                    <i class="material-icons">flag</i>
                    <div id="priority-selection">
                        <i class="material-icons">flag</i>
                        <i class="material-icons">flag</i>
                        <i class="material-icons">flag</i>
                    </div>
                </div>
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
                console.log('dashboard state has chaged');
                break;
        }
    }

    connectedCallback(){
        this.state = 0;
        this.showCreateTaskView();
    }

    getTasks(){
        let processor = new TaskProcessor();
        let response = processor.getTasksByUser();
        if(response.rc != ResponseCodes.PROCESS_OK){
            let tasks = this.shadowRoot.querySelector('#tasks-card');
            tasks.querySelector('.results').textContent = '0 tareas';
            tasks.style.alignItems = 'center';
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