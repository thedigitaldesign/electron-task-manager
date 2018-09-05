// Made with ❤ by Gutty Mora

class TitleBar extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <slot></slot>
        `;

        let style = document.createElement('style');
        style.textContent = `
            :host {
                height: 30px;
                width: 100%;
                display: block;
                position: fixed;
                -webkit-app-region: drag;
                align-self: flex-start;
                z-index: 100;
            }
        `;
        shadowRoot.appendChild(style);
    }
}

window.customElements.define('title-bar', TitleBar);