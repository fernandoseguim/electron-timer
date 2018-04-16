const { ipcRenderer } = require('electron');
const moment = require('moment');
let seconds = 0;
let timer;
let time;

module.exports = {
    start(el) { 
        time = moment.duration(el.textContent);
        seconds = time.asSeconds();
        
        clearInterval(timer);

        timer = setInterval(()=>{
            seconds++;
            el.textContent = this.formatTime(seconds);
        }, 1000);
        
    },
    stop(course){
        clearInterval(timer);
        
        let timeUsed = this.formatTime(seconds);
        ipcRenderer.send('stoped-course', course, timeUsed);
    },
    formatTime(seconds){
        return moment().startOf('day').seconds(seconds).format("HH:mm:ss");
    }
};