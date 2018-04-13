const { ipcRenderer } = require('electron');
const temporizador = require('./timer');

let aboutLink = document.querySelector('#about-link');
let playButton = document.querySelector(".play-button");
let timeSpan = document.querySelector(".time-clock");


aboutLink.addEventListener('click', function(){
    ipcRenderer.send('open-about-window');
});

let images = ['img/play-button.svg', 'img/stop-button.svg'];
playButton.addEventListener('click', function(){
    images = images.reverse();
    temporizador.inciar(timeSpan);
    playButton.src = images[0];
});