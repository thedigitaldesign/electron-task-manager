function _fadeIn(el){
    el.style.display = 'flex';
    let opacity = 0;
    let timer = setInterval(function(){
        if(opacity < 1){
            el.style.opacity = opacity;
            opacity += 0.1;
        }else{
            clearInterval(timer);
        }
    }, 10);
}

function _fadeOut(el){
    let opacity = 1;
    let timer = setInterval(function(){
        if(opacity > 0){
            opacity -= 0.1;
            el.style.opacity = opacity;
        }else{
            clearInterval(timer);
            el.style.opacity = 0;
            el.style.display = 'none';
        }
    }, 10);
}

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
                            this._remove();
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
            this._remove();
        }.bind(this));

        this.shadowRoot.querySelector('.close-modal').addEventListener('click', function(){
            this._remove();
        }.bind(this));
    }

    show(){
        let container = this.shadowRoot.querySelector('.j-modal-container');
        _fadeIn(container);
        container.tabIndex = 1; // Div does not have focus. Set tab index to can be set it
        this.state = 'show';
    }

    _remove(){
        this.shadowRoot.querySelector('.j-modal-container').removeAttribute('tabIndex');
        _fadeOut(this.shadowRoot.querySelector('.j-modal-container'));
        this.state = 'hide';
    }

    hide(){
        if(this.shadowRoot.querySelector('.j-modal-container').length != 0){
            this._remove();
        }
    }
}

window.customElements.define('j-modal', Modal);