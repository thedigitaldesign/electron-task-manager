class DashboardSidebar extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/dashboard-sidebar/dashboard-sidebar.css);
        `;
        shadowRoot.appendChild(style);
    }
}

window.customElements.define('dashboard-sidebar', DashboardSidebar);