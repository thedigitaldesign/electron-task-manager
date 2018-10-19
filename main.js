const {app, BrowserWindow} = require('electron');

// Made with ❤ by Gutty Mora

let mainWindow;

// Initialize all system functions
function initialize(){
    function createWindow(){
        // Create new modal element
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            minHeight: 600,
            minWidth: 600,
            frame: false, // Remove modal frame
            titleBarStyle: 'customButtonsOnHover' // For custom modal buttons
        });
        // Load file when modal is open
        mainWindow.loadFile('index.html');
        //win.webContents.openDevTools(); // Stay dev tools open

        // Delete modal element when it is closed
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    // When app is ready, open modal
    app.on('ready', () => {
        createWindow();
    });

    app.on('activate', () => {
        // For macOS
        if (mainWindow === null) {
            createWindow();
        }
    });

    // Quit when all windows are closed.
    app.on('modal-all-closed', () => {
        // For macOS
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}

initialize();