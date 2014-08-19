Template.ManageMarathon.helpers({
	getGamesOfMarathon:function(marathon){
		var allgames=[];
		if(!marathon)
			return allgames;
		var games=marathon.games;
		// games.forEach(function(game){
		for(var key in games){
			if(games.hasOwnProperty(key)){
				var game=games[key];
				var tempGame=Games.findOne({_id:key});
				var rounds=[];
				for(var srno in game.rounds){
					if(game.rounds.hasOwnProperty(srno))
						rounds.push(game.rounds[srno]);
				}
				if(tempGame)
					allgames.push({Game:tempGame,isStarted:game.isStarted,Rounds:rounds});
			}
		}
		return allgames;
	},
	getStringOfMarathon:function(arg){
		if(arg!==null&&arg!==undefined)
			return arg.toString();
	}
});
Template.ManageMarathon.events({
	'click #startMarathon':function(element,template){
		var toggle=template.data.Marathon.isStarted;
		toggle=toggle?false:true;
		Marathons.update({_id:template.data.Marathon._id},{$set:{isStarted:toggle}});
	},
	'click .startGame':function(element,template){
		var gameid=element.currentTarget.getAttribute('data-gameid');
		var toggle=element.currentTarget.getAttribute('data-currentValue');
		toggle=(toggle=="true"?false:true);
		var temp={};
		temp["games."+gameid+".isStarted"]=toggle;
		Marathons.update({_id:template.data.Marathon._id},{$set:temp});
	},
	'click .startRound':function(element,template){
		var roundno=element.currentTarget.getAttribute('data-currentRound');
		var gameid=element.currentTarget.getAttribute('data-gameid');
		var toggle=element.currentTarget.getAttribute('data-currentValue');
		toggle=(toggle=="true"?false:true);
		var temp={};
		temp['games.'+gameid+'.rounds.'+roundno+'.isStarted']=toggle;
		Marathons.update({_id:template.data.Marathon._id},{$set:temp});
	}
});
