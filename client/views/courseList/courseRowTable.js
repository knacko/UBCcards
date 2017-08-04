
import './courseRowTable';

Template.courseRowTable.helpers ({
	
	nonEmpty: function(collection) {
		return collection.count() != 0;		
	},
});

Template.courseRowTable.events({
  
  'click #btn-addCourse': function(e) {
    
	console.log("adding course");
	
    $('#courseAddModal').modal('show');
	
    e.preventDefault();
  },
});


Template.courseAddModalTemplate.events({
	
  'click #btn-saveCourse': function(e) {
	  
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
