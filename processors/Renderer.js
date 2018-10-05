// Made with ❤ by Gutty Mora
const _container = document.getElementsByTagName('main-container')[0];

// Handle template rendering
class Renderer {
    static dashboard(){
        let dashboard = document.createElement('app-dashboard');
        while (_container.firstChild){
            _container.removeChild(_container.firstChild);
        }
        _container.appendChild(dashboard);
    }

    static appMenu(){
        let appMenu = document.createElement('app-menu');
        _container.appendChild(appMenu);
    }

    static appContent(){
        let appContent = document.createElement('app-content');
        _container.appendChild(appContent);
    }
}

module.exports = Renderer;