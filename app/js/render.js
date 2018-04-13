const { ipcRenderer } = require('electron');

let aboutLink = document.querySelector('#about-link');

aboutLink.addEventListener('click', function(){
    ipcRenderer.send('open-about-window');
});