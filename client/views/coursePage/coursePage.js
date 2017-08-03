Template.coursePage.events({
		
		"click .btn-study": function (e,t) {
		//Session.set("selectedCourse",this._id);
		var courseID = this._id;
		
		console.log("Clicked on course: " + courseID);
		
		Router.go('/study/' + courseID);
		
		e.preventDefault();
        e.stopPropagation();
    },
	
	
});