class AppMenu extends HTMLElement {
    constructor(){
        super();

        this.options = [
            {
                'reference': 'dashboard',
                'item-id': '',
                'icon': 'dashboard',
                'label': 'Dashboard'
            },
            {
                'reference': 'inbox',
                'icon': 'move_to_inbox',
                'label': 'Inbox'
            },
            {
                'reference': 'tasks',
                'icon': 'assignment',
                'label': 'Mis tareas'
            },
            {
                'reference': 'smm',
                'icon': 'chrome_reader_mode',
                'label': 'SMM'
            },
        ];
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <div id="user-data">
                <img id="user-avatar">
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
        let userInfo = this.shadowRoot.getElementById('user-name');
        userInfo.textContent = sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
        this.setAvatar(sessionStorage.getItem('avatar'));

        let menu = this.shadowRoot.getElementById('menu');
        if(this.options.length === 0){

        }else{
            for (let i in this.options){
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

    setAvatar(img){
        let avatar = this.shadowRoot.querySelector('#user-avatar');
        avatar.setAttribute('src', img);
    }

    shrink(){
        this.style.width = '60px';
        // Remove user info, keep avatar
        let info = this.shadowRoot.getElementById('user-info');
        this.shadowRoot.getElementById('user-data').removeChild(info);

        // Remove list text, keep icons
        let list = this.shadowRoot.getElementById('menu').getElementsByTagName('li');
        Array.from(list).forEach(function(el){
            let span = el.getElementsByTagName('span')[0];
            el.removeChild(span);
            el.style.justifyContent = 'center';
        });
    }
}

window.customElements.define('app-menu', AppMenu);