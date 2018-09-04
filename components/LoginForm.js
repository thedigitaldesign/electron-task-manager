// Made with ❤ by Gutty Mora

class LoginForm extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <form>
                <input type="text">
                <input type="password">
                <input type="button" value="I'm done">
            </form>
        `;

        let style = document.createElement('style');
        style.textContent = `
            :host {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99;
            }
            
            form {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #2b2f3e;
                width: 280px;
                height: auto;
                flex-direction: column;
                flex-wrap: wrap;
            }
            
            form input[type="button"] {
                
            }
        `;
        shadowRoot.appendChild(style);
    }

    observedAttributes(){
        return ['completed'];
    }

    get completed(){
        return this.completed;
    }

    set completed(value){
        this.completed = value;
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        switch(attrName){
            case 'completed':
                console.log('Attribute [completed] changed to: ' + newValue);
                let sendButton = this.shadowRoot.querySelector('#send-login');
                if(newValue){
                    sendButton.removeAttribute('disabled');
                }else{
                    sendButton.setAttribute('disabled', 'disabled');
                }
                break;
        }
    }
}

window.customElements.define('login-form', LoginForm);