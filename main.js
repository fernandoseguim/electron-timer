const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require('./data');
const template = require('./template');

let mainWindow = null;
let tray = null;
app.on('ready', () => {
    console.log('Starting application...');

    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let templateMenu = template.generateTrayMenuTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(templateMenu);
    
    tray.setContextMenu(trayMenu);
    
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

ipcMain.on('add-new-course', (event, newCourse) => {
    let newTemplateMenu = template.addNewCourseOnTrayMenu(newCourse, mainWindow);
    let newTrayMenu = Menu.buildFromTemplate(newTemplateMenu);
    tray.setContextMenu(newTrayMenu);
});

