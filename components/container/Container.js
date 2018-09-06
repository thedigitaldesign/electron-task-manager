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
            :host {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
                padding-top: 30px;
                position: relative;
                top: 0;
                box-sizing: border-box;
            }
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
        let session = JSON.parse(sessionStorage.getItem('user-session'));
        if(!session){
            this.shadowRoot.querySelector('slot').remove();
            this.shadowRoot.innerHTML = '<login-form></login-form>';
        }
    }
}

window.customElements.define('main-container', Container);