
Template.cardRowTable.onCreated(function() {
  Meteor.subscribe('cards', this._id);
});

Template.cardRowTable.helpers ({
	card() {
			
	console.log("Looking for cards in " + Session.get("currentCourseCode"));
			
	var c = Cards.find({$and:[{courseCode: Session.get("currentCourseCode")}, {flags: 0}]});
		console.log("Found cards: " + c.count());	
		return c;
	},
	
	flaggedCard() {
		var c = Cards.find({$and:[{courseCode: Session.get("currentCourseCode")}, {flags: ($gt: 0)}]});
		console.log("Found flagged cards: " + c.count());	
		return c;
	},
});

