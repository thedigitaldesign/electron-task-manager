// Made with ❤ by Gutty Mora

// Handle template rendering
class Renderer {
    static dashboard(){
        let dashboard = document.getElementById('dashboard-section').import;
        dashboard = dashboard.getElementById('dashboard-section');
        let clone = document.importNode(dashboard.content, true);
        let container = document.getElementsByTagName('main-container')[0];
        container.appendChild(clone);
    }

    static appMenu(){
        let appMenu = document.createElement('app-menu');
        let container = document.getElementsByTagName('main-container')[0];
        container.appendChild(appMenu);
    }
}

module.exports = Renderer;