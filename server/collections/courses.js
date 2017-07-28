Courses = new Meteor.Collection('courses');

CourseScheme = new SimpleSceme({
	
	name: {
		type: String,
		label: "Course Name",
		max: 50
	},
	
	code: {
		type: String,
		label: "Course Code",
		max: 10		
	},
	
	creator: {
		type: String,
		label: "Creator Name",		
		autoValue: function() {
			if(this.isInsert) {
				return this.userId;				
			}
		}
	},
	
	created: {
		type: Date,
		label: "Date Created",
		denyUpdate: true,
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			} 
		}		
	}
})

Courses.attachSchema(CourseSchema);