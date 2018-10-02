require('../button/Button');
const TaskProcessor = require('../../processors/TaskProcessor');
const ResponseCodes = require('../../utilities/ResponseCodes');

// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="keypad">
                <app-button icon="add">Nueva tarea</app-button>
                <app-button icon="add">Nueva lista</app-button>
            </div>
            <div id="card-list">
                <div id="tasks-card" class="card">
                    <div class="title">
                        <i class="material-icons">bookmark</i>
                        <span>tareas</span>
                    </div>
                    <div class="results"></div>
                </div>
                <div id="task-lists-card" class="card">
                    <div class="title">
                        <i class="material-icons">list_alt</i>
                        <span>lista de tareas</span>
                    </div>
                    <div class="results"></div>
                </div>
                <div id="another-card" class="card">
                    <div class="title">
                        <i class="material-icons">autorenew</i>
                        <span>sincronización</span>
                    </div>
                    <div class="results"></div>
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
        this.getTasks();
        this.getTaskLists();
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

    getTaskLists(){
        let taskLists = this.shadowRoot.querySelector('#task-lists-card');
        taskLists.querySelector('.results').textContent = '0 listas';
        taskLists.style.alignItems = 'center';
    }
}

window.customElements.define('app-dashboard', Dashboard);