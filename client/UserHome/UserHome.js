Template.UserGames.helpers({
	getGamesOfUser:function(user){
		var allgames=[];
		if(user.games){
			user.games.forEach(function(game){
				allgames.push(Games.findOne({_id:game}));
			});
		}
		return allgames;
	},
	getDataContextOfGame:function(user,game){
		return {
			userid:user,
			Game:game,
			gameid:game._id
		}
	}
});
Template.UserMarathons.helpers({
	getMarathonsOfUser:function(user){
		var allmarathons=[];
		if(user.marathons){
			user.marathons.forEach(function(game){
				allmarathons.push(Games.findOne({_id:game._id}));
			});
		}
		return allmarathons;
	},
	getDataContextOfMarathon:function(userid,marathon){
		return {userid:userid,Marathon:marathon,marathonid:marathon._id}
	}
});
