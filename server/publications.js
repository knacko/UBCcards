//Get all courses
Meteor.publish('courses', function() {
  return Courses.find();
});

//Get specific course by code
Meteor.publish('course', function(courseCode) {
  return Courses.find(courseCode);
});

//Get all cards for a specific course (by code)
Meteor.publish('cards', function(courseCode) {
  return Cards.find({courseCode: courseCode});
});