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
}

window.customElements.define('main-container', Container);