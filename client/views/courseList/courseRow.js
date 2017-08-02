import './courseRow';

Template.courseRow.helpers ({
	getNumCards() {
		var n = Cards.find({"courseCode": this.courseCode}).count();
		console.log("Found " + n + " cards in " + this.name);
		return n;	
	},
	
	getNumEnrolled() {
		return this.students.length;
	},
	
	enrollOrDrop() {
		return (this.students).includes(Meteor.userId()) ? "Drop" : "Enroll";
	},
	
	enrollOrDropAction() {
		return (this.students).includes(Meteor.userId()) ? "btn-dropCourse" : "btn-enrollCourse";
	},

});

Template.courseRow.events({
	
	"click .btn-enrollCourse": function (e) {
		
		Courses.update({_id: this._id}, {$push: {students: Meteor.userId()}});
		
		toastr["success"]("Added you to " + this.name);
		
		console.log("Enrolled " + Meteor.userId() + " in " + this.name + "/" + this._id);
		
		e.preventDefault();
		e.stopPropagation();
	},
		
	"click .btn-dropCourse": function (e) {
		
		Courses.update({_id: this._id}, {$pull: {students: Meteor.userId()}});
		
		toastr["info"]("Removed you from " + this.name);
		
		console.log("Dropped " + Meteor.userId() + " from " + this.name);
		
		e.preventDefault();
		e.stopPropagation();
	},	
	
	"click .btn-courseRow": function (e,t) {
		//Session.set("selectedCourse",this._id);
		var courseID = $(e.target).closest('tr').data('id');
		
		console.log("Clicked on course: " + $(e.target).closest('tr').data('name') + "/" + courseID);
		
		Router.go('/course/' + courseID);
		
		e.preventDefault();
        e.stopPropagation();
    },
	
	});
	