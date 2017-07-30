
import { Courses } from '/imports/collections/courses.js';

import './courseList.html';

Template.courseList.events({

  'submit .new-course'(event) {
	  
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Courses.insert({
      name: text,
	  courseCode: "blah",
	  creator: "todd",
      created: new Date(), // current time

    }, (error, result) => {});

    target.text.value = '';

  },

});
