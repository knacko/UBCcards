

import { Courses } from '/imports/collections/courses.js';

import { Cards } from '/imports/collections/cards.js';

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
	
	"click .btn-enrollCourse": function () {
		
		Courses.update({_id: this._id}, {$push: {students: Meteor.userId()}});
		
		console.log("Enrolled " + Meteor.userId() + " in " + this.name + "/" + this._id);
		
	},
		
	"click .btn-dropCourse": function () {
		
		Courses.update({_id: this._id}, {$pull: {students: Meteor.userId()}});
		
		console.log("Dropped " + Meteor.userId() + " from " + this.name);
	},	
	
	
	});
	