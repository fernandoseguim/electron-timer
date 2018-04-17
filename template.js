const data = require('./data');

module.exports = {
    initialTemplate: null,
    generateTrayMenuTemplate(win) {
        let template = [
            {
                'label': 'Cursos',
                enabled: false
            },
            {
                type: 'separator'
            }
        ];

        let courses = data.getCourseNames();
        courses.forEach((course) => {
            let menuItem = {
                'label': course,
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
    addNewCourseOnTrayMenu(newCourse, win){
        data.saveChanges(newCourse, '00:00:00');
        
        let newMenuItem = {
            'label': newCourse,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('changed-course', newCourse);
                console.log(newCourse);
            }
        }
        this.initialTemplate.push(newMenuItem);
        return this.initialTemplate;
    }
}