const Schema = {};

import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

Courses = new Mongo.Collection('courses');

if ( Meteor.isServer ) {
  Courses._ensureIndex( { courseCode: 1, name: 1} );
}

Courses.attachSchema(new SimpleSchema({
	
	//Course code, ie. COSC 355
	courseCode: {
		type: String,
		label: "Course Code",
		max: 10		
	},
	
	//Name of the course
	name: {
		type: String,
		label: "Course Name",
		max: 50
	},
	
	//The user who created the course
	creator: {
		type: String,
		label: "Creator ID",		
		autoValue: function() {
			if(this.isInsert) {
				return this.userId;				
			}
		}
	},
	
	//The date of creation
	created: {
		type: Date,
		label: "Date Created",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			} 
		}		
	},
	
	//The list of student IDs in the course
	students: {
		type: Array, 
		defaultValue: []
	},
	
	'students.$': {
		type: String,
	},
}));

console.log("Created courses schema")
