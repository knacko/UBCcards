
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

function goToNextCard(bool, template) {
	
	selectRandomCard(bool);
	template.showCard.set(false);
	
}

function showCard(template) {
	
	template.showCard.set(!template.showCard.get());
	
}


Template.cardHolder.onCreated(function() {
	selectRandomCard(true);
	Session.set('showCard',false);
	this.showCard = new ReactiveVar(false);
	
	var test = "inside template"
	var template = this;
	
	Mousetrap.bind('left', function() {
       goToNextCard(false, template);
    });

    Mousetrap.bind('right', function() {
       goToNextCard(true, template);
    });
	
	Mousetrap.bind('up', function() {
       showCard(template);
    });
	
	Mousetrap.bind('down', function() {
       showCard(template);
    });
	
	Mousetrap.bind('space', function() {
       showCard(template);
    });
	
	
});

Template.cardHolder.events({
	
	"click .btn-nextCard, keypress": function (e,t) {
		goToNextCard(true, t)
		
	},
	"click .btn-prevCard": function (e,t) {
		goToNextCard(false, t)
		
	},
	
	"click .btn-flipCard": function(e, t){
		showCard(t);
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

    