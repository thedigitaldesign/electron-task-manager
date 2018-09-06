// Made with ❤ by Gutty Mora

class Dashboard extends HTMLElement{
    constructor(){
        super();
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

window.customElements.define('dashboard', Dashboard);