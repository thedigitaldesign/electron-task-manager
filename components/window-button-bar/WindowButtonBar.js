// Made with ❤ by Gutty Mora

class WindowButtonBar extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="minimize-window" class="window-btn">
                <span>&#xE921;</span>
            </div>
            <div id="restore-window" class="window-btn">
                <span>&#xE922;</span>
            </div>
            <div id="close-window" class="window-btn">
                <span>&#xE8BB;</span>
            </div>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/window-button-bar/window-button-bar.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        this.init();
    }

    init(){
        const remote = require('electron').remote;
        let window;
        // Minimize button
        let minimizeBtn = this.shadowRoot.querySelector('#minimize-window');
        minimizeBtn.addEventListener('click', function(){
            window = remote.getCurrentWindow();
            window.minimize();
        });
        // Maximize and restore button
        let restoreBtn = this.shadowRoot.querySelector('#restore-window');
        restoreBtn.addEventListener('click', function(){
            window = remote.getCurrentWindow();
            if(window.isMaximized()){
                window.unmaximize();
            }else{
                window.maximize();
            }
        });
        // Close window button
        let closeBtn = this.shadowRoot.querySelector('#close-window');
        closeBtn.addEventListener('click', function(){
            window = remote.getCurrentWindow();
            window.close();
        });
    }
}

window.customElements.define('window-button-bar', WindowButtonBar);