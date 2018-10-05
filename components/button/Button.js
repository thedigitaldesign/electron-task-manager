class Button extends HTMLElement {
    constructor(){
        super();

        let shadowRoot = this.attachShadow({ mode: 'open' });

        if(this.getAttribute('icon')){
            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.textContent = this.getAttribute('icon');

            if(!this.getAttribute('icon-color')){
                icon.style.color = 'rgba(221,64,91,1)';
            }else{
                icon.style.color = this.getAttribute('icon-color');
            }

            shadowRoot.appendChild(icon);
        }

        if(this.textContent){
            let span = document.createElement('span');
            span.textContent = this.textContent;
            this.textContent = null;

            if(this.getAttribute('icon')){ // Avoid create unnecessary element
                span.style.flexGrow = 3;
            }else{
                span.style.flexGrow = 1;
            }
            shadowRoot.appendChild(span);
        }

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/button/button.css);
        `;
        shadowRoot.appendChild(style);
    }

    static get observedAttributes(){
        return ['state'];
    }

    connectedCallback(){}
}

window.customElements.define('app-button', Button);