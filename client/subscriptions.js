  if(Meteor.isClient){	  
	  Meteor.subscribe('courses');
	  Meteor.subscribe('cards');
  }