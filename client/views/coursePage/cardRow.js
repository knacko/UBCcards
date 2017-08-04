import './cardRow';


Template.cardRow.onCreated(function() {
  
  if (!this.blank) {
	  
	console.log("card id: " + this._id);
	  
  }  
});

Template.cardRow.helpers ({
	getStats() {
		var n = Cards.find({"courseCode": this.courseCode}).count();
		console.log("Found " + n + " cards in " + this.name);
		return n;	
	},
	
	isBlank(){
		return this.blank=="true";
		
	}
});

Template.cardRow.events({
	
	"click .btn-saveCard": function (e) {
		
	e.preventDefault();
    e.stopPropagation();

	if (!Meteor.user()) {
			
		toastr["error"]("You must be logged in to do this");
		return;

	}
	
	if (this.blank=="true")	{
		Cards.insert({
			courseCode: this.code,
			flipfront: $("#front").html(),
			flipback: $("#back").html(),
			tags: $("#tags").html(),
			dataType: "flip"
		});
		
		$("#front").html(""); 
		$("#back").html(""); 
		$("#tags").html(""); 
	
	} else {
		Cards.update(
			this._id
		,{
			$set: {
				flipfront: $("#front"+this._id).html(),
				flipback: $("#back"+this._id).html(),
				tags: $("#tags"+this._id).html(),
				updated: new Date()
			}
		});
	}
	
  },
		

		
	"click .btn-deleteCard": function (e) {
		
		if (!Meteor.user()) {
			
			toastr["error"]("You must be logged in to do this");
		
	} else {
		
		Cards.remove({_id: this._id});
				
		//console.log("Dropped " + Meteor.userId() + " from " + this.name);
		
	}
		
		e.preventDefault();
		e.stopPropagation();
	},	
	
	
	});
	