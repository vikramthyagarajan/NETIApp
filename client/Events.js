Events={
	onStartGame:function(user,game){
		console.log("Game Started");
	},
	onEndGame:function(user,game){
		console.log("Game Ended");
	},
	onStartRound:function(user,game,round){
		console.log("Round Started");
	},
	onEndRound:function(user,game,round){
		console.log("Round Ended");
	},
	onSubmit:function(user,game,roundno,question,answer){
	}
}
