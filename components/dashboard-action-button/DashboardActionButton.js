// Made with ❤ by Gutty Mora

class DashboardActionButton extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <span class="module-title"></span>
        `;
    }

    connectedCallback(){
        let moduleTitle = this.shadowRoot.firstChild;
        if(this.getAttribute('icon-type')){
        }else{
            // A material design icon was defined
            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('module-icon');
            icon.textContent = this.getAttribute('icon');
            this.shadowRoot.insertBefore(icon, moduleTitle);
        }

        if(this.getAttribute('title')){
            this.shadowRoot.querySelector('.module-title').textContent = this.getAttribute('title');
        }

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/dashboard-action-button/dashboard-action-button.css);
        `;
        this.shadowRoot.appendChild(style);
    }
}

window.customElements.define('da-button', DashboardActionButton);