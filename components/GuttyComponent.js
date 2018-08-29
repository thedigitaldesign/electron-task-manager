// Made with ❤ by Gutty Mora
// Example component with attributes and state changes

class GuttyComponent extends HTMLElement {
    constructor(){
        super();
        this.counter = 0;
    }

    // Getter and setter it's important to define our attribute
    // And manipulate it by callbacks
    get counter(){
        return this.counter;
    }
    set coutner(val){
        this.counter = counter;
    }

    // Define which attributes are going to be observed
    static get observedAttributes(){
        return ['counter'];
    }

    // Handle attribute changing
    attributesChangedCallback(attr, oldValue, newValue){
        switch(attr){
            case 'counter':
                console.log('Counter has changed from [' + oldValue + '] to [' + newValue + ']');
                break;
        }
    }
}

window.customElements.define('gutty-component', GuttyComponent);