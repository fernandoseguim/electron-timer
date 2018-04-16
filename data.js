const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    saveChanges(course, timeUsed){
        
        let courseFilePath = `${__dirname}/data/${course}.json`;
        if(fs.existsSync(courseFilePath)){
            this.addCourseData(courseFilePath, timeUsed);
        }else{
            this.createCourseFile(courseFilePath, {})
            .then(() => {
                this.addCourseData(courseFilePath, timeUsed);
            });
        }
    },
    addCourseData(courseFilePath, timeUsed){
        let data = {
            lastTime: new Date().toString(),
            timeUsed: timeUsed
        }
        return jsonfile.writeFile(courseFilePath, data, {spaces: 2})
                .then(() => {
                    console.log("Dados salvos com sucesso.")
                })
                .catch((err) => {
                    console.log(err);
                });
    },
    createCourseFile(fileName, fileContent){
        return jsonfile.writeFile(fileName, fileContent)
                .then(() => {
                    console.log("Arquivo criado")
                })
                .catch((err) => {
                    console.log(err);
                });
    },
    getCourseData(course){
        let courseFilePath = `${__dirname}/data/${course}.json`;
        return jsonfile.readFile(courseFilePath);
    }
}