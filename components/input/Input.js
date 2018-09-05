// Made with ❤ by Gutty Mora

class Input extends HTMLInputElement {
    constructor(){
        super();
    }

    observedAttributes(){
        return ['complete'];
    }

    attributeChangedCallback(attr, newValue, oldValue){
    }
}

window.customElements.define('custom-input', Input);