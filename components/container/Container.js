// Made with ❤ by Gutty Mora
const ResponseCodes = require('../../utilities/ResponseCodes');

class Container extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <slot></slot>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/container/container.css);
        `;

        shadowRoot.appendChild(style);
    }

    static get observedAttributes(){
        return ['session-required'];
    }

    get sessionRequired(){
        return this.getAttribute('session-required');
    }

    set sessionRequired(val){
        this.setAttribute('session-required', val);
    }

    connectedCallback(){
        let session = JSON.parse(sessionStorage.getItem('sessionId'));
        let slot = this.shadowRoot.querySelector('slot');
        if(!session){
            slot.innerHTML = '<login-form></login-form>';
        }
        Bus.listen('login', function(data){
            if(data.rc === ResponseCodes.PROCESS_OK){
                let user = data.bean;
                sessionStorage.setItem('sessionId', user.sessionId);
                sessionStorage.setItem('firstName', user.firstName);
                sessionStorage.setItem('lastName', user.lastName);
                sessionStorage.setItem('email', user.email);

                slot.innerHTML = '<a-dashboard></a-dashboard>';
            }
        });
    }
}

window.customElements.define('main-container', Container);