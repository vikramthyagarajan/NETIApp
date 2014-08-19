Template.GameHome.helpers({
	getDataContextOfGame:function(user,game,round){
	  return {
	  userid:user,
	  gameid:game,
	  Round:round,
	  roundno:round.srno
	  }
  },
	hasGameStarted:function(game){
		var marathon=Session.get('fromMarathonId');
		if(marathon){
			var mar=Marathons.findOne({_id:marathon});
			if(mar&&mar.games){
				if(mar.isStarted)
					return mar.games[game._id].isStarted;
				else 
					return false;
			}
		}
		else
			return game.isStarted
	},
	isRoundStarted:function(roundIsStarted){
		return eval(roundIsStarted);
	}
});
Template.GameHome.events({
	'click .playRound':function(element,template){
		var roundno=element.currentTarget.getAttribute('data-roundno');
		var marathon=Session.get('fromMarathonId');
		if(marathon)
			Router.go('GameRound',{userid:template.data.User._id,gameid:template.data.Game._id,roundno:roundno},{query:{fromMarathonId:marathon}});
		else
			Router.go('GameRound',{userid:template.data.User._id,gameid:template.data.Game._id,roundno:roundno});
	}
});
