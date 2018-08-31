// Made with ❤ by Gutty Mora

class SidebarTools extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <ul>
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
            :host {
                background-color: #38285a;
                display: flex;
                width: 25%;
                max-width: 250px;
                min-width: 200px;
                height: 100vh;
                align-items: center;
                padding: 0 20px;
                position: relative;
                left: -30px;
                opacity: 0;
                animation: appearSidebar 0.5s;
                animation-fill-mode: forwards;
                animation-delay: 0.3s;
            }
            
            @keyframes appearSidebar {
                0% {
                    left: -30px;
                    opacity: 0;
                }
                100% {
                    left: 0px;
                    opacity: 1;
                }
            }
            
            ul {
                margin: 0;
                padding: 0;
                display: block;
                width: 100%;
                text-align: right;
                list-style: none;
            }
            
            ul li {
                display: block;
                width:100%;
                height: 40px;
                font-weight: 300;
                -webkit-font-smoothing: antialiased;
                color: #999999;
                font-size: 14px;
                letter-spacing: 1px;
                line-height: 40px;
                margin: 20px 0;
                transition: all 0.3s;
            }
            
            ul li:hover {
                cursor: pointer;
                color: #ffffff;
            }
            
            li span {
                width: 100%;
                height: 2px;
                background-color: #45326d;
                display: block;
                position: relative;
                transition: all 0.3s;
            }
            
            ul li:hover span {
                background-color: #a854a1;
            }
        `;
        shadowRoot.appendChild(style);
    }
}

window.customElements.define('sidebar-tools', SidebarTools);