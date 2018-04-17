const {	ipcMain } = require('electron');
const data = require('./data');

module.exports = {
	initialTemplate: null,
	generateTrayMenuTemplate(win, app) {
		let template = [{
				label: 'Abrir timer',
				click: () => {
					win.show();
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Fechar timer',
				click: () => {
					app.isQuiting = true;
        			app.quit();
				}
			},
			{
				type: 'separator'
			}
		];

		let courses = data.getCourseNames();
		courses.forEach((course) => {
			let menuItem = {
				label: course,
				type: 'radio',
				click: () => {
					win.send('changed-course', course);
					console.log(course);
				}
			}
			template.push(menuItem);
		});

		this.initialTemplate = template;
		return template;
	},
	addNewCourseOnTrayMenu(newCourse, win) {
		data.saveChanges(newCourse, '00:00:00');

		let newMenuItem = {
			label: newCourse,
			type: 'radio',
			checked: true,
			click: () => {
				win.send('changed-course', newCourse);
				console.log(newCourse);
			}
		}
		this.initialTemplate.push(newMenuItem)
		return this.initialTemplate;
	},
	generateMainMenuTemplate(app) {
		let templateMainMenu = [{
				label: 'Arquivo',
				submenu: [{
					label: 'Fechar',
					click: () => {
						app.isQuiting = true;
						app.quit();
					},
					accelerator: 'CmdOrCtrl+Q'
				}]
			},
			{
				label: 'View',
				submenu: [{
						role: 'reload'
					},
					{
						role: 'toggledevtools'
					}
				]
			},
			{
				label: 'Window',
				submenu: [{
						role: 'minimize'
					},
					{
						role: 'close'
					}
				]
			},
			{
				label: 'Sobre',
				submenu: [{
					label: 'Sobre o Alura Timer',
					click: () => {
						ipcMain.emit('open-about-window');
					},
					accelerator: 'CmdOrCtrl+I'
				}]
			}
		];
		if (process.platform == 'darwin') {
			templateMainMenu.unshift({
				label: app.getName(),
				submenu: [{
					label: 'Estou rodando no Mac!'
				}]
			})
		}
		return templateMainMenu;
	}
}