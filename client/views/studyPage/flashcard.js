

Template.cardHolder.onCreated(function() {
		
	selectRandomCard();
	Session.set('showCard',false);
	this.showCard = new ReactiveVar(false);
});
	

function selectRandomCard(){
  	
	var code = Session.get("currentCourseCode");

	console.log("Looking for cards in " + code);

	var c = Cards.find({"courseCode": code});
	
	console.log("Found " + c.count() + " cards");
	
	Session.set('randomCard', Random.choice(c.fetch()));
}

Template.cardHolder.events({
	
	"click .btn-nextCard": function (e,t) {
		selectRandomCard();
		t.showCard.set(false);
		
	},
	
	"click .btn-flipCard": function(e, t){
		t.showCard.set(!Template.instance().showCard.get());
	},
	
});
	
Template.cardHolder.helpers ({
	
	  randomCard: function () {
			return Session.get('randomCard');
  },
  
  showCard: function(){
		return Template.instance().showCard.get();
  }
	
});
