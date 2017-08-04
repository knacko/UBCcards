
Template.home.events({
		
		"click .btn-courseList": function (e,t) {
		//Session.set("selectedCourse",this._id);

		Router.go('/courses/');
		
		e.preventDefault();
        e.stopPropagation();
    },

});