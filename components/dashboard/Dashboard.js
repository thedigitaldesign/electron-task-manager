require('../button/Button');
require('../input/Input');
require('../date-picker/DatePicker');
require('../calendar/Calendar');
const TaskProcessor = require('../../processors/TaskProcessor');
const DateUtility = require('../../utilities/DateUtility');

// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="dashboard-main" class="dashboard-section">
                <h1 class="d-title">Dashboard</h1>
                <div id="d-btn-container">
                    <button id="new-proyect-btn">
                        <i class="material-icons">add</i>
                        Crear proyecto
                    </button>
                    <button id="new-task-btn">
                        <i class="material-icons">add</i>
                        Crear tarea
                    </button>
                </div>
                <div id="card-list">
                    <div id="task-card" class="d-card">
                        <i class="d-card-icon material-icons">bookmark</i>
                        <span class="d-card-title">tareas</span>
                    </div>
                    <div id="task-list-card" class="d-card">
                        <i class="d-card-icon material-icons">calendar_today</i>
                        <span class="d-card-title">Agenda</span>
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
            <div class="dashboard-section is-shown">
                <j-calendar></j-calendar>
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

    attributeChangedCallback(attr, oldVal, newVal){
        switch(attr){
            case 'state':

                break;
        }
    }

    connectedCallback(){
        this.state = 0;

        this.shadowRoot.querySelector('#new-task-btn').addEventListener('click', function(){
            let modal = document.getElementById('new-task-modal');
            modal.show();
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