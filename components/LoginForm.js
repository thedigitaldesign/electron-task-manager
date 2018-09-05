// Made with ❤ by Gutty Mora

class LoginForm extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <form id="login-form">
                <span>
                    <input type="text" placeholder="&nbsp;" class="username-field">
                    <label>Your username</label>
                </span>
                <span>
                    <input type="password" placeholder="&nbsp;" class="password-field">
                    <label>Your secret code</label>
                </span>
                <input type="button" id="login-button" value="i'm done" class="disabled-button">
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
                font-weight: 300;
                justify-content: center;
                align-items: center;
                z-index: 99;
                box-sizing: border-box;
            }
            
            form {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #2b2f3e;
                width: 300px;
                height: auto;
                padding: 20px 0 30px 0;
                flex-direction: column;
                flex-wrap: wrap;
                box-sizing: border-box;
            }
            
            span {
                color: #fff;
                font-size: 12px;
                width: 200px;
                display: block;
                position: relative;
                height: 40px;
                padding: 10px 0;
            }
            
            label {
                position: absolute;
                top: 25px;
                transform-origin: 0 0;
                transition: transform 0.2s;
                box-sizing: border-box;
                pointer-events:none;
                font-weight: 300;
                font-family: 'Open Sans';
                -webkit-font-smoothing: antialiased;
            }
            
            input[type="text"], input[type="password"] {
                outline: none;
                border: 0;
                display: block;
                border-bottom: 1px solid rgba(221,64,91,0.5);
                background: none;
                height: 40px;
                padding-top: 15px;
                color: #fff;
                width: 100%;
                box-sizing: border-box;
                font-weight: 300;
                font-family: 'Open Sans';
                -webkit-font-smoothing: antialiased;
            }
            
            input[type="text"]:focus, input[type="password"]:focus {
                border-bottom: 2px solid rgba(221,64,91,1);
            }
            
            input[type="text"]:not(:placeholder-shown), input[type="password"]:not(:placeholder-shown) {
                border-bottom: 2px solid rgba(221,64,91,1);
            }
            
            input:not(:placeholder-shown) + label {
                transform: scale(0.85) translateY(-20px);
            }
            
            input:focus + label {
                transform: scale(0.85) translateY(-20px);
            }
            
            input[type="button"] {
               box-sizing: border-box;
               outline: none;
               text-transform: uppercase;
               height: 30px;
               line-height: 26px;
               font-size: 12px;
               border-radius: 14px;
               width: 200px;
               margin: 40px 0 10px 0;
               letter-spacing: 1px;
               font-weight: 300;
               font-family: 'Open Sans';
               transition: all 0.2s;
               -webkit-font-smoothing: antialiased;
            }
            
            .disabled-button {
                cursor: not-allowed;
                border: 2px solid rgba(255,255,255,0.2);
                background: none;
                color: rgba(255,255,255,0.2);
            }
            
            .enabled-button {
                border: 2px solid rgba(221,64,91,1);
                background-color: rgba(221,64,91,1);
                color: #fff;
            }
            
            .enabled-button:hover {
                cursor: pointer;
            }
        `;
        shadowRoot.appendChild(style);
    }

    static get observedAttributes(){
        return ['username-filled', 'password-filled', 'filled-count'];
    }

    get usernameFilled(){
        return this.getAttribute('username-filled');
    }

    set usernameFilled(value){
        this.setAttribute('username-filled', value);
    }

    get passwordFilled(){
        return this.getAttribute('password-filled');
    }

    set passwordFilled(value){
        this.setAttribute('password-filled', value);
    }

    get filledCount(){
        return this.getAttribute('filled-count');
    }

    set filledCount(value){
        this.setAttribute('filled-count', value);
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        switch(attrName){
            case 'username-filled':
            case 'password-filled':
                if(parseInt(newValue) === 1 && parseInt(oldValue) === 0){
                    this.filledCount++;
                }else if(parseInt(newValue) === 0 && parseInt(oldValue) === 1){
                    this.filledCount--;
                }
                break;

            case 'filled-count':
                if(parseInt(newValue) === 2){
                    let loginButton = this.shadowRoot.querySelector('#login-button');
                    loginButton.classList.remove('disabled-button');
                    loginButton.classList.add('enabled-button');
                }else{
                    let loginButton = this.shadowRoot.querySelector('#login-button');
                    loginButton.classList.remove('enabled-button');
                    loginButton.classList.add('disabled-button');
                }
                break;
        }
    }

    connectedCallback(){
        this.usernameFilled = 0;
        this.passwordFilled = 0;
        this.filledCount = 0;

        let thiz = this;
        let usernameField = this.shadowRoot.querySelector('.username-field');
        let passwordField = this.shadowRoot.querySelector('.password-field');

        usernameField.focus();
        usernameField.addEventListener('input', function(){
            if(this.value != null && this.value.trim() != ''){
                thiz.usernameFilled = 1
            }else{
                thiz.usernameFilled = 0;
            }
        });
        passwordField.addEventListener('input', function(){
            if(this.value != null && this.value.trim() != ''){
                thiz.passwordFilled = 1;
            }else{
                thiz.passwordFilled = 0;
            }
        });
    }
}

window.customElements.define('login-form', LoginForm);