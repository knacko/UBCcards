Cards = new Meteor.Collection('cards');

CardSchema = new SimpleSchema({
	creator: {
		type: String,
		label: "Creator Name",		
		autoValue: function() {
			if(this.isInsert) {
				return this.userId;				
			}
		}
	},
	
	created: {
		type: Date,
		label: "Date Created",
		denyUpdate: true,
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			} 
		}		
	},
	
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
	
	numberOfRatings {
		type: Number,
		label: "Number of Ratings",
		defaultValue: 0
	},
	
	//The extra search terms
	tags {
		type: [Object],
		label: "Tags",
		optional: true,
		defaultValue: []
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
	"dataType.$.flipfront" {
		type: String,
		label: "Front of flip card",
		max: 250,
		optional: true
	},
	
	"dataType.$.flipback" {
		type: String,
		label: "Back of flip card",
		max: 250,
		optional: true
	}
	
	//Other card data
	
})

Cards.attachSchema(CardSchema);






































