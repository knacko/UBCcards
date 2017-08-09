const Schema = {};

import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

Cards = new Mongo.Collection('cards');

//This is a workaround for bug documented at   https://github.com/aldeed/meteor-autoform/issues/1582#issuecomment-291031956
const defaultValue = value => function autoValue() {
  if (!this.isUpdate && !this.isUpsert && !this.isSet) {
    return value;
  }
};

if ( Meteor.isServer ) {
  Cards._ensureIndex( { flipfont: 1, flipback: 1, tags: 1} );
}

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
			if ( this.isUpdate || this.isInsert ) {
				return new Date;
			} 
		}
	},
	
	//Number of flags by users to investigate the card
	flags: {
		type: Number,
		label: "Number of Flags",
		autoValue: defaultValue(0),
		optional: true 
	},
	
	//Get the actual rating by (rating/numberOfRatings)
	rating: {
		type: Number,
		label: "Total Rating",
		autoValue: defaultValue(0),
		optional: true 
	},
	
	numberOfRatings: {
		type: Number,
		label: "Number of Ratings",
		autoValue: defaultValue(0),
		optional: true 
	},
	
	//The extra search terms
	tags: {
		type: String,
		label: "Tags",
		optional: true,
		autoValue: defaultValue("")
	},
	
	/*The type of flashcard
	* flip: standard card with a front question and a back answer
	*/
	dataType: {
		type: String,
		label: "Type of Card",
		max: 20,
		autoValue:defaultValue("flip"),
		optional: true 
	},
	
	//Flip card data
	flipfront: {
		type: String,
		label: "Front of flip card",
		max: 250,
		optional: true
	},
	
	flipback: {
		type: String,
		label: "Back of flip card",
		max: 250,
		optional: true
	}
	
	//Other card data
	
}))

console.log("Created cards schema")





































