const { ipcRenderer, shell } = require('electron');
const  process = require('process');

let aboutLink = document.querySelector('#close-link');
let socialMediaLink = document.querySelector("#social-media-link");
let electronVersionSpan = document.querySelector("#electron-version");
let nodeVersionSpan = document.querySelector("#node-version");

window.onload = function(){
    electronVersionSpan.textContent = process.versions.electron;
    nodeVersionSpan.textContent = process.version;
}

aboutLink.addEventListener('click', function(){
    ipcRenderer.send('close-about-window');
});

socialMediaLink.addEventListener('click', function() {
    shell.openExternal("https://linkedin.com/in/fernandoseguim");
});