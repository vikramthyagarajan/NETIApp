UI.registerHelper('checkUser',function(userid){
	var currentUserid=Meteor.userId();
	if(currentUserid)
		return userid===currentUserid;
	else 
		return false;
});
UI.registerHelper('checkGameCreator',function(game,userid){
	if(game.creator)
		return game.creator===userid;
	else 
		return false;
});
UI.registerHelper('checkRole',function(role){
	var currentUser=Meteor.user();
	if(currentUser&&currentUser.role)
		return role===currentUser.role;
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
