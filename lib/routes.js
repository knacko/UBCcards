
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('courseList');
});

Router.map(function () {
  this.route("coursePage", {
    path: "/course/:id",
	waitOn: function(){
        return Meteor.subscribe('courses')
    },
    data: function(){
		var cid = this.params.id;
		console.log("Found course: " + cid);
		var cursor = Courses.findOne({_id: cid});		
		return cursor;
    },
  })
}); 

Router.map(function () {
  this.route("studyPage", {
    path: "/study/:id",
	waitOn: function(){
        return Meteor.subscribe('courses')
    },
    data: function(){
		var cid = this.params.id;
		console.log("Found course: " + cid);
		var cursor = Courses.findOne({_id: cid});		
		return cursor;
    },
  })
}); 
