import './cardRow';

Template.cardRow.onCreated(function() {
  
  if (!this.blank) {
	  
	console.log("card id: " + this._id);
	
	$("#front"+this._id).val(this.flipfront); 
	$("#back"+this._id).val(this.flipback); 
	$("#tags"+this._id).val(this.tags); 
	  
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

	if (this.blank=="true")	{
		Cards.insert({
			courseCode: this.code,
			flipfront: $("#front").val(),
			flipback: $("#back").val(),
			tags: $("#tags").val(),
			dataType: "flip"
		});
		
		$("#front").val(""); 
		$("#back").val(""); 
		$("#tags").val(""); 
	
	} else {
		Cards.update(
			this._id
		,{
			$set: {
				flipfront: $("#front"+this._id).val(),
				flipback: $("#back"+this._id).val(),
				tags: $("#tags"+this._id).val(),
				updated: new Date()
			}
		});
	}

	e.preventDefault();
    e.stopPropagation();
	
	
	
	console.log("Done things");
	
  },
		

		
	"click .btn-deleteCard": function (e) {
		
		Cards.remove({_id: this._id});
				
		//console.log("Dropped " + Meteor.userId() + " from " + this.name);
		
		e.preventDefault();
		e.stopPropagation();
	},	
	
	
	});
	