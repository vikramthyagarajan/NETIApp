UI.registerHelper('checkUser',function(userid){
	var currentUserid=Meteor.userId();
	if(currentUserid)
		return userid===currentUserid;
	else 
		return false;
});
UI.registerHelper('checkUserRole',function(userRole){
	var currentUser=Meteor.user();
	if(currentUser)
		return currentUser.role===userRole;
	else 
		return false;
});
UI.registerHelper('checkUserAndRole',function(userid,userRole){
	var currentUser=Meteor.user();
	if(currentUser)
		if(currentUser._id===userid&&currentUser.role===userRole)
			return true;
	return false;
});
