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
            @import url(./components/title-bar/title-bar.css);
        `;
        shadowRoot.appendChild(style);
    }
}

window.customElements.define('title-bar', TitleBar);