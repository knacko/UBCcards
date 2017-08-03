
import './courseRowTable';

Template.courseRowTable.helpers ({
	
	nonEmpty: function(collection) {
		return collection.count() != 0;		
	},
	
});