// Made with ❤ by Gutty Mora
/*
A little approach to global event emission
Bus is a class that helps you to emit and receive data through
a specific link (string) in a global scope.

Is the basic principle of 'Vue event bus' and is based on observer pattern.

Important! -> When you use Bus, it is attached to Window Object. Please, be careful with that
*/

let _observers = [];
let _callbacks = [];

class Bus {
    static emit(link, data=null){
        for(let i in _observers){
            if(link === _observers[i]){
                _callbacks[i](data);
            }
        }
    }

    static listen(link, callback){
        _observers.push(link);
        _callbacks.push(callback);
    }
}

window.Bus = Bus;