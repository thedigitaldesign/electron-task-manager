class Modal extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <div class="j-modal-container">
                <div class="shadow"></div>
                <div class="modal">
                    <div class="m-header">
                        <h1 class="m-title"></h1>
                        <i class="material-icons close-modal">close</i>
                    </div>
                    <div class="m-content">
                        <slot></slot>
                    </div>
                </div> 
            </div> 
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/modal/modal.css);
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
                if(newVal === 'show'){
                    document.onkeydown = function(e){
                        if(e.key === 'Escape'){
                            this.shadowRoot.querySelector('.j-modal-container').classList.remove('is-shown');
                            this.state = 'hide';
                        }
                    }.bind(this);
                }
                break;
        }
    }

    connectedCallback(){
        this.setAttribute('state', 'hide');
        if(this.getAttribute('modal-title')){
            this.shadowRoot.querySelector('.m-title').textContent = this.getAttribute('modal-title');
        }

        this.shadowRoot.querySelector('.shadow').addEventListener('click', function(){
            this.shadowRoot.querySelector('.j-modal-container').classList.remove('is-shown');
            this.state = 'hide';
        }.bind(this));

        this.shadowRoot.querySelector('.close-modal').addEventListener('click', function(){
            this.shadowRoot.querySelector('.j-modal-container').classList.remove('is-shown');
            this.state = 'hide';
        }.bind(this));
    }

    // Add the class is-shown to modal-container to change visibility:visible and opacity:1
    show(){
        let container = this.shadowRoot.querySelector('.j-modal-container');
        container.classList.add('is-shown');
        container.tabIndex = 1; // Div does not have focus. Set tab index to can be set it
        this.state = 'show';
    }

    hide(){
        if(this.shadowRoot.querySelector('.j-modal-container').length != 0){
            this.shadowRoot.querySelector('.j-modal-container').classList.remove('is-shown');
            this.state = 'hide';
        }else{
            console.log('nada que ocultar');
        }
    }
}

window.customElements.define('j-modal', Modal);