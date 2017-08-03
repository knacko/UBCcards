
import './courseRowTable';

Template.courseRow.onCreated(function() {
  Meteor.subscribe('courses');
});


Template.courseRowTable.helpers ({
	course() {
	var c = Courses.find({},{sort:{name: 1}});
		console.log("Found courses: " + c.count());	
		return c;
	},
	
	notEnrolledCourse() {
		var c = Courses.find({},{sort:{name: 1}});
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
		
	}
	
});