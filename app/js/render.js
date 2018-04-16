const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let aboutLink = document.querySelector('#about-link');
let playButton = document.querySelector('.play-button');
let timeSpan = document.querySelector('.time-clock');
let courseSpan = document.querySelector('.course');

window.onload = () => {
    data.getCourseData(courseSpan.textContent)
        .then((courseData) => {
            timeSpan.textContent = courseData.timeUsed;
        });
}

aboutLink.addEventListener('click', function(){
    ipcRenderer.send('open-about-window');
});

let images = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
playButton.addEventListener('click', function(){
    images = images.reverse();

    if(play){
        timer.stop(courseSpan.textContent);
        play = false;
    }else{
        timer.start(timeSpan);
        play = true;
    }

    playButton.src = images[0];
});