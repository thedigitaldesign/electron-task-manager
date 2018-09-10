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

    showLoginForm(){
        let node = document.createElement('login-form');
        if(this.shadowRoot.firstChild){
            this.shadowRoot.insertBefore(node, this.shadowRoot.firstChild);
        }else{
            this.shadowRoot.appendChild(node);
        }
    }

    connectedCallback(){
        let session = JSON.parse(sessionStorage.getItem('sessionId'));
        if(!session){ // Change for: !session
            this.showLoginForm();
        }
    }
}

window.customElements.define('main-container', Container);