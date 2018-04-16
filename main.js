const { app, BrowserWindow, ipcMain } = require("electron");
const data = require('./data');

app.on('ready', () => {
    console.log('Starting application...');

    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});


app.on('window-all-closed', () => {
    app.quit();
});


let aboutWindow = null;
ipcMain.on('open-about-window', () => {
    if(aboutWindow == null){
        aboutWindow = new BrowserWindow({
            width: 300,
            height: 250,
            alwaysOnTop: true,
            frame: false
        });
        
        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });
    }

    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-about-window', () => {
    aboutWindow.close();
});

ipcMain.on('stoped-course', (event, course, timeUsed) => {
    console.log(course);
    console.log(timeUsed);
    data.saveChanges(course, timeUsed);
});