const data = require('./data');

module.exports = {
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

        return template;
    }
}