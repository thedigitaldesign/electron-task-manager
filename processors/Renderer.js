// Made with ❤ by Gutty Mora

// Handle template rendering
class Renderer {
    static dashboard(){
        let dashboard = document.createElement('app-dashboard');
        let container = document.getElementsByTagName('app-content')[0];
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
        container.appendChild(dashboard);
    }

    static appMenu(){
        let appMenu = document.createElement('app-menu');
        let container = document.getElementsByTagName('main-container')[0];
        container.appendChild(appMenu);
    }

    static appContent(){
        let appContent = document.createElement('app-content');
        let container = document.getElementsByTagName('main-container')[0];
        container.appendChild(appContent);
    }
}

module.exports = Renderer;