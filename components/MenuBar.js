// Made with ❤ by Gutty Mora

class MenuBar extends HTMLElement {
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
                -webkit-app-region: drag;
            }
        `;
        shadowRoot.appendChild(style);
    }
}

window.customElements.define('menu-bar', MenuBar);