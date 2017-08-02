import './courseList.html';

Template.courseList.events({

  'submit .new-course'(event) {
	  
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Courses.insert({
      name: text,
	  courseCode: ("" + Math.floor((Math.random() * 10000) + 1)),
	  creator: "todd",
      created: new Date(), // current time
	  students: [],
    }, (error, result) => {});

    target.text.value = '';

  },

});
