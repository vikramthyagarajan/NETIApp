Template.PlayMarathon.helpers({
	getMarathonGames:function(games,userid){
		// var game;
		for(var key in games){
			if(games.hasOwnProperty(key)){
				var game=Games.findOne({_id:key});
				return {Game:game,gameid:game._id,userid:userid};
			}
		}
	},
	hasMarathonStarted:function(marathon){
		return marathon.isStarted;
	},
	isGameStarted:function(marathongames,gameid){
		return marathongames[gameid].isStarted;
	}
});
