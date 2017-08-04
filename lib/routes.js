
Router.configure({
    layoutTemplate: 'layout',
  defaultBreadcrumbTitle: '>',
  defaultBreadcrumbLastLink: true
});
	
Router.route('/', {
	name: 'homepage',
	template:'home',
	title: 'Home'
});

Router.route('courseList', {
	path: "/courses",
	name: 'courseList',
	template:'courseList',
	title: 'Courses',
	parent: 'homepage'
});

Router.map(function () {
  this.route("coursePage", {
    path: "/courses/:id",
	name: "coursePage",
	parent: 'courseList',
	title: function() {
		
		return Session.get('currentCourseName');
		
		
		
	}
		,
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
	name: "studyPage",
	title: 'Study',
    path: "/courses/:id/study",
	parent: 'coursePage',
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
