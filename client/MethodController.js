ClientMethodController={
	checkOverridden:function(game,methodName){
		if(game.hasOwnProperty("clientCode"))
			return game.clientCode.hasOwnProperty(methodName);
		else return false;
	},
	onStartGame:function(user,game){
		var overridden=ClientMethodController.checkOverridden(game,"onStartGame");
		if(overridden)
			return eval(game.clientCode.onStartGame)(user,game);
		else
			return Events.onStartGame(user,game);
		console.log("Game Started");
	},
	onEndGame:function(user,game){
		var overridden=ClientMethodController.checkOverridden(game,"onEndGame");
		if(overridden)
			return eval(game.clientCode.onEndGame)(user,game);
		else
			return Events.onEndGame(user,game);
	},
	onStartRound:function(user,game,round){
		var overridden=MethodController.checkOverridden(game,"onStartRound");
		if(overridden)
			return eval(game.clientCode.onStartRound)(user,game,round);
		else
			return Events.onStartRound(user,game,round);
	},
	onEndRound:function(user,game,round){
		var overridden=MethodController.checkOverridden(game,"onEndRound");
		if(overridden)
			return eval(game.clientCode.onEndRound)(user,game,round);
		else
			return Events.onEndRound(user,game,round);
	},
	onSubmit:function(user,game,roundno,question,answer){
		var overridden=MethodController.checkOverridden(game,"onSubmit");
		if(overridden)
			return eval(game.clientCode.onSubmit)(user,game,roundno,question,answer);
		else
			return Events.onSubmit(user,game,roundno,question,answer);
	},
	processClientCodeForGame:function(gameid,clientCode){
		var data=Games.findOne({_id:gameid});
		var game=new NetiClient(data);
		eval(clientCode);
		game.flushMethods();
	}
}
