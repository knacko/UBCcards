

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
		return isEnrolled() ? "Drop" : "Enroll";
	},
	
	enrollOrDropAction() {
		return isEnrolled() ? "btn-dropCourse" : "btn-enrollCourse";
	},

});

	isEnrolled = function() {
		
		return true;
		/*
		if (Meteor.user() && $.inArray(Session.get("selectedCourse"), Meteor.user().courses) !== -1) {
			return true;
		} else {
			return false;
		}*/
	};	