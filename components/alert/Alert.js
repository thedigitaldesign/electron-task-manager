class Alert extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <span class="alert-text"></span>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/alert/alert.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        if(this.textContent){
            this.shadowRoot.querySelector('.alert-text').textContent = this.textContent;
        }
    }

    show(msg, timer){
        let self = this;
        let tr = timer || 2000;
        self.shadowRoot.querySelector('.alert-text').textContent = msg;
        self.classList.add('shown');
        setTimeout(function(){
            self.classList.remove('shown');
        }, tr);
    }
}

window.customElements.define('j-alert', Alert);