// Made with ❤ by Gutty Mora

class Input extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <input type="text" id="input">
            <i class="material-icons icon">edit</i>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/input/input.css);
        `;
        shadowRoot.appendChild(style);
    }

    observedAttributes(){
        return ['state', 'config'];
    }

    attributeChangedCallback(attr, newValue, oldValue){
        switch(attr){
        }
    }

    connectedCallback(){
        if(this.getAttribute('icon')){
            if(this.getAttribute('icon') != 'default'){
                let icon = this.shadowRoot.querySelector('.icon');
                icon.textContent = this.getAttribute('icon');
            }
            if(this.getAttribute('icon-align') === 'left'){
                this.setIconToLeft();
            }else{
                this.setIconToRight();
            }
        }else{
            this.shadowRoot.querySelector('.icon').remove();
        }

        if(this.getAttribute('placeholder')){
            this.shadowRoot.getElementById('input').setAttribute('placeholder', this.getAttribute('placeholder'));
        }
    }

    setIconToLeft(){
        let icon = this.shadowRoot.querySelector('.icon');
        icon.style.left = 0;
        icon.style.background = 'rgba(0,0,0,0.1)';
        let input = this.shadowRoot.getElementById('input');
        input.style.paddingLeft = '28px';
    }

    setIconToRight(){
        let icon = this.shadowRoot.querySelector('.icon');
        icon.style.right = 0;
        let input = this.shadowRoot.getElementById('input');
        input.style.paddingRight = '24px';
    }
}

window.customElements.define('app-input', Input);