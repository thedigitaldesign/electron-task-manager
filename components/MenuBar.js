// Made with ❤ by Gutty Mora

class MenuBar extends HTMLElement {
    constructor(){
        super();

        let showRoot = this.attachShadow({mode: 'open'});

        // Style
        this.style.height = '30px';
        this.style.width = '100%';
        this.style.display = 'block';
        this.style.background = '#ccc';
        this.style['-webkit-app-region'] = 'drag';

        // Events
    }
}

window.customElements.define('menu-bar', MenuBar);