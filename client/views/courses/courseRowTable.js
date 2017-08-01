
import { Courses } from '/imports/collections/courses.js';

import './courseRowTable';

Template.courseRowTable.helpers ({
	course() {
		var c = Courses.find({});
		console.log("Found courses: " + c.count());	
		return c;
	},
	
	enrolledCourse() {
		var c = Courses.find({students: Meteor.userId()});
		console.log("Found enrolled courses: " + c.count());	
		return c;
	},

	enrolledInACourse(){
		var n = Courses.find({students: Meteor.userId()}).count();	
		console.log("User is enrolled in " + n + " courses.");
		return n != 0;
		
	}
	
});