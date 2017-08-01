const Schema = {};

import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

export const Cards = new Mongo.Collection('cards');

Cards.attachSchema(new SimpleSchema({
	
	//The user that created the card
	creator: {
		type: String,
		label: "Creator Name",		
		autoValue: function() {
			if(this.isInsert) {
				return this.userId;				
			}
		}
	},
	
	//The course the card is used for
	courseCode: {
		type: String,
		label: "Card Course Code"
	},
	
	//Date of creation
	created: {
		type: Date,
		label: "Date Created",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			} 
		}		
	},
	
	//Date of last update
	updated: {
		type: Date,
		label: "Date Updated",
		autoValue: function() {
			if ( this.isUpdate ) {
				return new Date;
			} 
		}
	},
	
	//Number of flags by users to investigate the card
	flags: {
		type: Number,
		label: "Number of Flags",
		defaultValue: 0
	},
	
	//Get the actual rating by (rating/numberOfRatings)
	rating: {
		type: Number,
		label: "Total Rating",
		defaultValue: 0
	},
	
	numberOfRatings: {
		type: Number,
		label: "Number of Ratings",
		defaultValue: 0
	},
	
	//The extra search terms
	tags: {
		type: String,
		label: "Tags",
		optional: true,
		defaultValue: ""
	},
	
	/*The type of flashcard
	* flip: standard card with a front question and a back answer
	*/
	dataType: {
		type: String,
		label: "Type of Card",
		max: 20
	},
	
	//Flip card data
	"dataType.$.flipfront": {
		type: String,
		label: "Front of flip card",
		max: 250,
		optional: true
	},
	
	"dataType.$.flipback": {
		type: String,
		label: "Back of flip card",
		max: 250,
		optional: true
	}
	
	//Other card data
	
}))

console.log("Created cards schema")





































