class DatePicker extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            
        `;
    }
}

window.customElements.define('date-picker', DatePicker);