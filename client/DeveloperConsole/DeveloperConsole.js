Template.DeveloperConsole.helpers({
	getDataContextOfNewGame:function(userid){
		return {userid:userid}
	}
});
Template.DeveloperConsoleGames.helpers({
	getDataContextOfManageGame:function(userid,gameid){
		return {userid:userid,gameid:gameid}
	}
});
