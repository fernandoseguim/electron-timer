const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require('./data');
const template = require('./template');
const manager = require('./manager');

let mainWindow = null;
let tray = null;

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore() 
		}
		mainWindow.focus();
	}
});

if (isSecondInstance) {
	app.quit();
}

app.on('ready', () => {
	console.log('Starting application...');

	mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	});

	tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
	let templateTrayMenu = template.generateTrayMenuTemplate(mainWindow, app);
	let trayMenu = Menu.buildFromTemplate(templateTrayMenu);
	tray.setContextMenu(trayMenu);

	let templateMainMenu = template.generateMainMenuTemplate(app);
	let mainMenu = Menu.buildFromTemplate(templateMainMenu)
	Menu.setApplicationMenu(mainMenu);

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);

	// mainWindow.on('minimize', (event) => {
	// 	event.preventDefault();
	// 	mainWindow.hide();
	// });
	
	mainWindow.on('close', (event) => {
		if(!app.isQuiting){
			event.preventDefault();
			mainWindow.hide();
		}
		return false;
	});
});


// app.on('window-all-closed', (event) => {
// 	if(!app.isQuiting){
// 		//event.preventDefault();
// 		mainWindow.hide();
// 	}
// 	return false;
// });


let aboutWindow = null;
ipcMain.on('open-about-window', () => {
	if (aboutWindow == null) {
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

