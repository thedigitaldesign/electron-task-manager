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
            <div id="dashboard-main" class="dashboard-section is-shown">
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
                    <div id="calendar-card" class="d-card">
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
            <j-calendar class="dashboard-section"></j-calendar>
            
            <!-- Utility button to back to dashboard -->
            <div id="back-to-dashboard-btn">
                <div id="back-to-dashboard">
                    <i class="material-icons">keyboard_arrow_left</i>
                    volver
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

        let calendarCard = this.shadowRoot.querySelector('#calendar-card');
        calendarCard.addEventListener('click', function(){
            this.showCalendar();
        }.bind(this));

        this.shadowRoot.querySelector('#back-to-dashboard-btn').addEventListener('click', function(){
            this.backToDashboard();
        }.bind(this));
    }

    switchSection(section){
        let sections = this.shadowRoot.querySelector('.is-shown');
        sections.classList.remove('is-shown');

        let createTask = this.shadowRoot.getElementById(section);
        createTask.classList.add('is-shown');
    }

    showCalendar(){
        document.getElementsByTagName('app-menu')[0].shrink();
        document.getElementsByTagName('app-content')[0].expand();
        this.shadowRoot.querySelector('#dashboard-main').classList.remove('is-shown');
        this.shadowRoot.querySelector('j-calendar').classList.add('is-shown');

        this.showBackBtn();
    }

    showBackBtn(){
        this.shadowRoot.querySelector('#back-to-dashboard-btn').style.display = 'flex';
    }

    backToDashboard(){
        let children = this.shadowRoot.querySelector('.is-shown');
        children.classList.remove('is-shown');

        this.shadowRoot.querySelector('#dashboard-main').classList.add('is-shown');

        document.getElementsByTagName('app-menu')[0].expand();
        document.getElementsByTagName('app-content')[0].shrink();

        this.shadowRoot.querySelector('#back-to-dashboard-btn').style.display = 'none';
    }
}

window.customElements.define('app-dashboard', Dashboard);