// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <slot></slot>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/dashboard/dashboard.css);
        `;
        shadowRoot.appendChild(style);
    }

    static get observedAttributes(){
        return ['state'];
    }

    get state(){
        return this.getAttribute('state');
    }

    set state(val){
        this.setAttribute('state', val);
    }

    attributeChangedCallback(attr, newVal, oldVal){
        switch(attr){
            case 'state':
                console.log('dashboard state has chaged');
                break;
        }
    }

    connectedCallback(){
        this.state = 0;
    }
}

window.customElements.define('j-dashboard', Dashboard);