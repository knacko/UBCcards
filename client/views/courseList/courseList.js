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
Template.courseList.helpers ({
	
	course() {
	var c = Courses.find({},{sort:{name: 1}});
	console.log("Found courses: " + c.count());	
		return c;
	},
	
	notEnrolledCourse() {
		var c = Courses.find({students: { $not: Meteor.userId()}},{sort:{name: 1}});
		console.log("Found courses: " + c.count());	
		return c;
	},	
	
	enrolledCourse() {
		var c = Courses.find({students: Meteor.userId()}, {sort:{name: 1}});
		console.log("Found enrolled courses: " + c.count());	
		return c;
	},

	enrolledInACourse(){
		var n = Courses.find({students: Meteor.userId()}).count();	
		console.log("User is enrolled in " + n + " courses.");
		return n != 0;
		
	},
});
