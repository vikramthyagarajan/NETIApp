UI.registerHelper('checkUser',function(userid){
	var currentUserid=Meteor.userId();
	if(currentUserid)
		return userid===currentUserid;
	else 
		return false;
});
UI.registerHelper('canUserPlayGame',function(user,game,marid){
	return true;
	if(user.games.indexOf(game._id)==-1)
		return false;
	if(!game.isSinglePlay)
		return true;
	else
	var played;
	if(!marid)
		played=Data.findOne({user:user._id,game:game._id});
	else
		played=Data.findOne({user:user._id,game:game._id,marathon:marid});
	if(played&&played.games[game._id]){
		var playedRounds=played.games[game._id].rounds;
		return false;
	}
});
UI.registerHelper('canUserPlayRound',function(user,game,marid,roundno){
	return true;
	// var played=Data.
	// if(
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
