const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    // Create new window element
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false, // Remove window frame
        titleBarStyle: 'hidden' // Remove frame for macOS
    });
    // Load file when window is open
    win.loadFile('index.html');
    //win.webContents.openDevTools(); // Stay dev tools open

    // Delete window element when it is closed
    win.on('closed', function() {
        win = null;
    });
}

// When app is ready, open window
app.on('ready', createWindow);

app.on('activate', () => {
    // For macOS
    if (win === null) {
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