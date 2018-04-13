const moment = require('moment');
let  seconds;

module.exports = {
    inciar: function(el){
        let time = moment.duration(el.textContent);
        seconds = time.asSeconds();
        
        setInterval(() => {
            seconds++;
            el.textContent = this.formatTime(seconds);
        }, 1000);
    },
    stop: function(el){

    },
    formatTime: function(seconds){
        return moment().startOf('day').seconds(seconds).format("HH:mm:ss");
    }
}