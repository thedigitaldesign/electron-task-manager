class SwitchModeButton extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
           <div id="button"></div>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/switch-mode-button/switch-mode-button.css);
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

    attributeChangedCallback(attr, oldVal, newVal){
        switch(attr){
            case 'state':
                switch(newVal){
                    case 'normal':
                        break;
                    case 'night':
                        break;
                }
                break;
        }
    }

    connectedCallback(){
        this.addEventListener('click', function(){
            this.switch();
        });
    }

    switch(){
        let button = this.shadowRoot.getElementById('button');
        let pos = 0;
        let finalPos = 15;
        let initialOffset = button.offsetLeft;
        if(initialOffset === 15){
            pos = 15;
            finalPos = 0;
        }
        let interval = setInterval(function(){
            if(pos === finalPos){
                clearInterval(interval);
            }else {
                if(initialOffset === 0){
                    pos++;
                    button.style.left = pos + 'px';
                }else if(initialOffset === 15){
                    pos--;
                    button.style.left = pos + 'px';
                }
            }
        },10);
    }

    nightMode(){

    }

    normalMode(){

    }
}

window.customElements.define('switch-mode-button', SwitchModeButton);