
import { Courses } from '/imports/collections/courses.js';

import './courseRowTable';

Template.courseRowTable.helpers ({
	course() {
		var c = Courses.find({});
		console.log("Found courses: " + c.count());	
		return c;
	},
	

	
	
});