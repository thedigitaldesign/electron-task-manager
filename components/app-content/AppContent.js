class AppContent extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <slot></slot>
        `;

        let style = document.createElement('style');
        style.innerHTML = `
            * {
                box-sizing: border-box;
            }
            
            :host{
                width: calc(100% - 180px);
                height: 100%;
                position: relative;
                transition: width .5s;
            }
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        if(!this.firstChild){
            let dashboard = document.createElement('app-dashboard');
            this.appendChild(dashboard);
        }
    }

    expand(){
        this.style.width = 'calc(100% - 60px)';
    }
}

window.customElements.define('app-content', AppContent);