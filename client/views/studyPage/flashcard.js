
import arbitrary from 'arbitrary';

let generate = new arbitrary.Generator(42);

Template.cardHolder.onCreated(function() {
	selectRandomCard(true);
	Session.set('showCard',false);
	this.showCard = new ReactiveVar(false);
});
	

function selectRandomCard(selectNext){
  	
	var code = Session.get("currentCourseCode");

	console.log("Looking for cards in " + code);

	var c = Cards.find({"courseCode": code});
	
	console.log("Found " + c.count() + " cards");
	
	var n = 0;
	
	if (selectNext) {
		n = generate.next.percent();
	} else{
		n = generate.prev.percent();
	}
	
	n = Math.floor(n*c.count());
	
	console.log("Picked card " + n);
	
	Session.set('randomCard', c.fetch()[n]);
}

Template.cardHolder.events({
	
	"click .btn-nextCard": function (e,t) {
		selectRandomCard(true);
		t.showCard.set(false);
		
	},
	"click .btn-prevCard": function (e,t) {
		selectRandomCard(false);
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
