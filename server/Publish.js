Meteor.users.allow({
	'insert':function(){
		return true;
	},
	'remove':function(){
		return true;
	},
	'update':function(){
		return true;
	}
});
Meteor.publish('userData',function(){
	if(this.userId)
		return Meteor.users.find({_id:this.userId},{fields:{'createdAt':0}});
	else  
		this.ready();
});
