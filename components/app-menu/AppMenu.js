class AppMenu extends HTMLElement {
    constructor(){
        super();

        this.options = [
            {
                'reference': 'inbox',
                'icon': 'move_to_inbox',
                'label': 'Inbox'
            },
            {
                'reference': 'dashboard',
                'item-id': '',
                'icon': 'dashboard',
                'label': 'Dashboard'
            },
            {
                'reference': 'tasks',
                'icon': 'assignment',
                'label': 'My tasks'
            },
            {
                'reference': 'smm',
                'icon': 'chrome_reader_mode',
                'label': 'SSM'
            },
        ];
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <div id="user-data">
                <div id="user-avatar"></div>
                <div id="user-info">
                    <span id="user-name"></span>
                </div>
            </div>
            <ul id="menu"></ul>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/app-menu/app-menu.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback() {
        // Set user info
        let session = JSON.parse(sessionStorage.getItem('session'));
        let userInfo = this.shadowRoot.getElementById('user-name');
        userInfo.textContent = session.firstName + ' ' + session.lastName;

        let menu = this.shadowRoot.getElementById('menu');
        if (this.options.length === 0) {

        } else {
            for (let i in this.options) {
                let li = document.createElement('li');
                li.setAttribute('reference', this.options[i].reference);

                let label = document.createElement('span');
                label.textContent = this.options[i].label;

                let icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.textContent = this.options[i].icon;

                li.appendChild(icon);
                li.appendChild(label);

                menu.appendChild(li);
            }
        }
    }
}

window.customElements.define('app-menu', AppMenu);