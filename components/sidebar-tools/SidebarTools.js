// Made with ❤ by Gutty Mora
const AuthService = require('../../services/AuthorizationService');

class SidebarTools extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <ul>
                <li id="login">
                    Iniciar sesión
                    <span></span>
                </li>
                <li>
                    Nueva tarea
                    <span></span>
                </li>
                <li>
                    Ver lista de tareas
                    <span></span>
                </li>
                <li>
                    Configuración
                    <span></span>
                </li>
            </ul>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/sidebar-tools/sidebar-tools.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
    }
}

window.customElements.define('sidebar-tools', SidebarTools);