if(Meteor.isServer){
	//Get all courses
	Meteor.publish('courses', function() {
	  return Courses.find({});
	});

	//Get specific course by code
	Meteor.publish('course', function(code) {
	  return Courses.find({courseCode: code});
	});

	//Get all cards for a specific course (by code)
	Meteor.publish('courseCards', function(code) {
	  return Cards.find({courseCode: code});
	}); 
	
	//Get all cards for a specific course (by code)
	Meteor.publish('cards', function() {
	  return Cards.find({});
	});
}