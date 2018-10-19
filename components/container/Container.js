const ResponseCodes = require('../../utilities/ResponseCodes');
const Render = require('../../processors/Renderer');

// Made with ❤ by Gutty Mora

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
        let user = sessionStorage.getItem('userId');
        if(!user){
            this.showLoginForm();
        }else{
            Render.appMenu();
            Render.appContent();
        }

        // Listen when login is successfully
        Bus.listen('login-success', function(){
            Render.appMenu();
            Render.appContent();
        });
    }
}

window.customElements.define('main-container', Container);