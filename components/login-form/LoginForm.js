// Made with ❤ by Gutty Mora
let AuthorizationService = require('../../services/AuthorizationService');
const ResponseCodes = require('../../utilities/ResponseCodes');

class LoginForm extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <form id="login-form">
                <i class="material-icons login-logo disabled-logo">fingerprint</i>
                <span>
                    <i class="material-icons user-field-icon">account_circle</i>
                    <input type="text" placeholder="&nbsp;" class="username-field">
                    <label>Your username</label>
                </span>
                <span>
                    <i class="material-icons password-field-icon">vpn_key</i>
                    <input type="password" placeholder="&nbsp;" class="password-field">
                    <label>Your secret code</label>
                </span>
                <input type="button" id="login-button" text="i'm done" class="disabled-button">
            </form>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/login-form/login-form.css);
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

                    let loginLogo = this.shadowRoot.querySelector('.login-logo');
                    loginLogo.classList.remove('disabled-logo');
                    loginLogo.classList.add('enabled-logo');

                    // Enable login process
                    let usernameField = this.shadowRoot.querySelector('.username-field');
                    let passwordField = this.shadowRoot.querySelector('.password-field');
                    this.login(usernameField.value, passwordField.value);
                }else{
                    let loginLogo = this.shadowRoot.querySelector('.login-logo');
                    loginLogo.innerHTML = 'fingerprint';
                    loginLogo.classList.remove('enabled-logo');
                    loginLogo.classList.add('disabled-logo');

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

        let loginButton = this.shadowRoot.querySelector('#login-button');
        loginButton.value = loginButton.getAttribute('text');
    }

    login(username, password){
        let logo = this.shadowRoot.querySelector('.login-logo');
        let loginButton = this.shadowRoot.querySelector('#login-button');
        loginButton.addEventListener('click', async function(){
            logo.innerHTML = 'schedule';
            loginButton.classList.remove('enabled-button');
            loginButton.classList.add('disabled-button');
            loginButton.value = 'waiting...';

            let response = await AuthorizationService.startSession(username, password);
            console.log('response:', response);
            switch(response.rc){
                case ResponseCodes.PROCESS_OK:
                    logo.innerHTML = 'check_circle';
                    break;
                case ResponseCodes.ERROR_CREATING_SESSION:
                default:
                    logo.innerHTML = 'error';
                    loginButton.value = loginButton.getAttribute('text');
                    loginButton.classList.remove('disabled-button');
                    loginButton.classList.add('enabled-button');
                    break;
            }
        });
    }


}

window.customElements.define('login-form', LoginForm);