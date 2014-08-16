Template.GameHome.helpers({
	getDataContextOfGame:function(user,game,round){
	  return {
	  userid:user,
	  gameid:game,
	  Round:round,
	  roundno:round.srno
	  }
  },
	isRoundStarted:function(roundIsStarted){
		return eval(roundIsStarted);
	}
});
