
import arbitrary from 'arbitrary';

var Mousetrap = require('mousetrap');

let generate = new arbitrary.Generator(42);

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

Template.cardHolder.onCreated(function() {
	selectRandomCard(true);
	Session.set('showCard',false);
	this.showCard = new ReactiveVar(false);
	
	var test = "inside template"
	
	Mousetrap.bind('left', function() {
        console.log('Pressed left from ' + test);
    });

    Mousetrap.bind('right', function() {
        console.log('Pressed right');
    });
	
	
	
});

Template.cardHolder.events({
	
	"click .btn-nextCard, keypress": function (e,t) {
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

    