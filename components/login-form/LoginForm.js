// Made with ❤ by Gutty Mora
let AuthProcessor = require('../../processors/AuthProcessor');
const ResponseCodes = require('../../utilities/ResponseCodes');

class LoginForm extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <form id="login-form">
                <i class="material-icons login-logo disabled-logo">fingerprint</i>
                <span class="input-container">
                    <i class="material-icons user-field-icon">account_circle</i>
                    <input type="text" placeholder="&nbsp;" class="username-field">
                    <label>Your username</label>
                </span>
                <span class="input-container">
                    <i class="material-icons password-field-icon">vpn_key</i>
                    <input type="password" placeholder="&nbsp;" class="password-field">
                    <label>Your secret code</label>
                </span>
                <input type="button" id="login-button" text="i'm done" class="disabled-button">
                <span text="Nothing to show" id="login-message"></span>
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

    attributeChangedCallback(attr, oldVal, newVal){
        switch(attr){
            case 'username-filled':
            case 'password-filled':
                if(parseInt(newVal) === 1 && parseInt(oldVal) === 0){
                    this.filledCount++;
                }else if(parseInt(newVal) === 0 && parseInt(oldVal) === 1){
                    this.filledCount--;
                }
                break;

            case 'filled-count':
                if(parseInt(newVal) === 2){
                    let loginButton = this.shadowRoot.querySelector('#login-button');
                    loginButton.classList.remove('disabled-button');
                    loginButton.classList.add('enabled-button');

                    let loginLogo = this.shadowRoot.querySelector('.login-logo');
                    loginLogo.classList.remove('disabled-logo');
                    loginLogo.classList.add('enabled-logo');
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
        let emailField = this.shadowRoot.querySelector('.username-field');
        let passwordField = this.shadowRoot.querySelector('.password-field');

        emailField.focus();
        emailField.addEventListener('input', function(){
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

        // Enable login process
        loginButton.addEventListener('click', async function(){
            thiz.login();
        });
    }

    async login(){
        let thiz = this;
        let logo = this.shadowRoot.querySelector('.login-logo');
        let loginButton = this.shadowRoot.querySelector('#login-button');
        let loginMessage = this.shadowRoot.querySelector('#login-message');
        let emailField = this.shadowRoot.querySelector('.username-field');
        let passwordField = this.shadowRoot.querySelector('.password-field');

        logo.innerHTML = 'schedule';
        loginButton.classList.remove('enabled-button');
        loginButton.classList.add('disabled-button');
        loginButton.value = 'waiting...';

        let response = await AuthProcessor.startSession(emailField.value, passwordField.value);
        switch(response.rc){
            case ResponseCodes.PROCESS_OK:
                logo.innerHTML = 'check_circle';
                loginMessage.style.display = 'none';

                thiz.fadeOut();
                // Emit event when login is successfully
                Bus.emit('login-success', null);
                break;
            case ResponseCodes.INVALID_LOGIN:
                logo.innerHTML = 'error_outline';
                loginButton.value = loginButton.getAttribute('text');
                loginButton.classList.remove('disabled-button');
                loginButton.classList.add('enabled-button');
                loginMessage.style.display = 'block';
                loginMessage.textContent = '¡Hey, te equivocaste!';
                break;
            case ResponseCodes.SERVER_CONNECTION_ERROR:
                logo.innerHTML = 'report';
                loginButton.value = loginButton.getAttribute('text');
                loginButton.classList.remove('disabled-button');
                loginButton.classList.add('enabled-button');
                loginMessage.style.display = 'block';
                loginMessage.textContent = 'Hubo un error al conectar con el servidor';
                break;
            default:
                logo.innerHTML = 'error';
                loginButton.value = loginButton.getAttribute('text');
                loginButton.classList.remove('disabled-button');
                loginButton.classList.add('enabled-button');
                loginMessage.style.display = 'block';
                loginMessage.textContent = 'Ocurrió un error. ¿Por qué no lo intentas más tarde?';
                break;
        }
    }

    fadeOut(time=20) {
        let thiz = this;
        let fadeEffect = setInterval(function () {
            if (!thiz.style.opacity) {
                thiz.style.opacity = 1;
            }
            if (thiz.style.opacity > 0) {
                thiz.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
                thiz.style.display = 'none';
            }
        }, time);
    }
}

window.customElements.define('login-form', LoginForm);