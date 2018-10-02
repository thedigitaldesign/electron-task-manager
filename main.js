const {app, BrowserWindow} = require('electron');

// Made with ❤ by Gutty Mora

let mainWindow;

// Initialize all system functions
function initialize(){
    function createWindow(){
        // Create new window element
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            minHeight: 600,
            minWidth: 600,
            frame: false, // Remove window frame
            titleBarStyle: 'customButtonsOnHover' // For custom window buttons
        });
        // Load file when window is open
        mainWindow.loadFile('index.html');
        //win.webContents.openDevTools(); // Stay dev tools open

        // Delete window element when it is closed
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    // When app is ready, open window
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
    app.on('window-all-closed', () => {
        // For macOS
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}

initialize();