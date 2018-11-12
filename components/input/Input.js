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
        return ['state', 'value'];
    }

    get value(){
        return this.getAttribute('value');
    }

    set value(val){
        this.setAttribute('value', val);
        this.shadowRoot.querySelector('#input').value = val;
    }

    attributeChangedCallback(attr, oldVal, newVal){
        switch(attr){
        }
    }

    connectedCallback(){
        if(this.getAttribute('icon')){
            if(this.getAttribute('icon') != 'default'){
                let icon = this.shadowRoot.querySelector('.icon');
                icon.textContent = this.getAttribute('icon');
            }
            if(this.getAttribute('icon-align') === 'right'){
                this.setIconToRight();
            }else{
                this.setIconToLeft();
            }
        }else{
            this.shadowRoot.querySelector('.icon').remove();
        }

        if(this.getAttribute('placeholder')){
            this.shadowRoot.getElementById('input').setAttribute('placeholder', this.getAttribute('placeholder'));
        }
        if(this.getAttribute('value')){
            this.shadowRoot.getElementById('input').value = this.getAttribute('value');
        }

        let self = this;
        this.shadowRoot.querySelector('#input').addEventListener('input', function(){
            self.value = this.value;
        });
    }

    setIconToLeft(){
        let icon = this.shadowRoot.querySelector('.icon');
        icon.style.left = 0;
        let input = this.shadowRoot.getElementById('input');
        input.style.paddingLeft = '25px';
    }

    setIconToRight(){
        let icon = this.shadowRoot.querySelector('.icon');
        icon.style.right = 0;
        let input = this.shadowRoot.getElementById('input');
        input.style.paddingRight = '25px';
    }
}

window.customElements.define('j-input', Input);