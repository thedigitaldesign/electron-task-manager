// Made with ❤ by Gutty Mora

class LoginForm extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <slot></slot>
        `;

        let style = document.createElement('style');
        style.textContent = `
            :host {
            }
        `;
        shadowRoot.appendChild(style);
    }

    login(){

    }
}

window.customElements.define('login-form', LoginForm);