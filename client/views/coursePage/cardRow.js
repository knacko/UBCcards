

import './cardRow';

Template.cardRow.helpers ({
	getStats() {
		var n = Cards.find({"courseCode": this.courseCode}).count();
		console.log("Found " + n + " cards in " + this.name);
		return n;	
	},

});

Template.cardRow.events({
	
	"click .btn-saveCard": function (e) {
	
	var front = $("#front").val(); 
	var back = $("#back").val(); 
	var tags = $("#tags").val(); 

    Cards.insert({
	  courseCode: this.courseCode,
	  "dataType.$.flipfront": front,
	  "dataType.$.flipback": back,
	  tags: tags,
    }, (error, result) => {});

	event.preventDefault();
  },
		

		
	"click .btn-dropCourse": function (e) {
		
		Courses.update({_id: this._id}, {$pull: {students: Meteor.userId()}});
		
		toastr["info"]("Removed you from " + this.name);
		
		console.log("Dropped " + Meteor.userId() + " from " + this.name);
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
	