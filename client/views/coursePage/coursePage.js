ReactiveTabs.createInterface({
  template: 'basicTabs',
  onChange: function (slug, template) {
    // This callback runs every time a tab changes.
    // The `template` instance is unique per {{#basicTabs}} block.
    //console.log('[tabs] Tab has changed! Current tab:', slug);
    //console.log('[tabs] Template instance calling onChange:', template);
  }
}); 

Template.cardHolder.onCreated(function() {

});
	
Template.coursePage.events({
		
		"click .btn-study": function (e,t) {
		//Session.set("selectedCourse",this._id);
		var courseID = this._id;
		
		console.log("Clicked on course: " + courseID);
		
		Router.go('/courses/' + courseID + '/study/');
		
		e.preventDefault();
        e.stopPropagation();
    },

});


Template.coursePage.helpers({
	
	tabs: function () {
    // Every tab object MUST have a name and a slug!
    return [
      { name: 'Add New Card', slug: 'addNew' },
      { name: 'Active Cards', slug: 'active' },
      { name: 'Flagged Cards', slug: 'flagged' },
    ];
  },
 
  
});