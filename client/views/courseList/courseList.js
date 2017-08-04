import './courseList.html';

Template.courseList.events({
  
  'click #addCourse': function(e) {
    e.preventDefault();
    
    $('#courseAddModal').modal('show');
  }
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

Template.courseAddModalTemplate.events({
	
  'click #saveCourse': function(e) {
	  
    e.preventDefault();
    
	var modalName = $('#courseName').val();
	var modalCourseCode = $('#courseCode').val();
		
		
	var c = Courses.find({$or: [{name: modalName},{courseCode: modalCourseCode}]}, {});
	if (c.count() != 0) {
		toastr["error"]("Course already exists with that name or code");
		return;
	}
		
	Courses.insert({
      name: modalName,
	  courseCode: modalCourseCode,
	  creator: Meteor.userId(),
      created: new Date(), // current time
	  students: [],
    }, (error, result) => {});
	
    toastr["success"]("Added " + modalCourseCode + "<br>   " + modalName);
	
    $('#courseAddModal').modal('hide');
  }
});

