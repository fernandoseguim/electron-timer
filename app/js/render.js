const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let aboutLink = document.querySelector('#about-link');
let playButton = document.querySelector('.play-button');
let timeSpan = document.querySelector('.time-clock');
let courseSpan = document.querySelector('.course');
let addButton = document.querySelector('.add-button');
let addField = document.querySelector('.add-field');

window.onload = () => {
	console.log(courseSpan.textContent)
	data.getCourseData(courseSpan.textContent)
		.then((courseData) => {
			timeSpan.textContent = courseData.timeUsed;
		});
}

aboutLink.addEventListener('click', function () {
	ipcRenderer.send('open-about-window');
});

let images = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
playButton.addEventListener('click', function () {
	
	images = images.reverse();

	if (play) {
		timer.stop(courseSpan.textContent);
		play = false;
		new Notification('Electron Timer', {
			body: `O curso ${courseSpan.textContent} foi parado!!`,
			icon: 'img/stop-button.png',
			silent: true
		});
	} else {
		timer.start(timeSpan);
		play = true;
		new Notification('Electron Timer', {
			body: `O curso ${courseSpan.textContent} foi iniciado!!`,
			icon: 'img/play-button.png',
			silent: true
		});
	}

	playButton.src = images[0];
});

addButton.addEventListener('click', function () {
	let newCourse = addField.value;
	if (newCourse) {
		courseSpan.textContent = newCourse;
		timeSpan.textContent = '00:00:00';
		addField.value = '';
		ipcRenderer.send('add-new-course', newCourse);
	}
});

ipcRenderer.on('changed-course', (event, course) => {
	
	timer.stop(courseSpan.textContent);
	playButton.src = 'img/play-button.svg';
	play = false;
	images = images.reverse();
	playButton.src = images[0];
	
	data.getCourseData(course)
		.then((courseData) => {
			timeSpan.textContent = courseData.timeUsed;
		});
	courseSpan.textContent = course;
});

ipcRenderer.on('start-stop-timer-shortchut', () => {
	console.log("Atalho clicado");
	let click = new MouseEvent('click');
	playButton.dispatchEvent(click);
});
