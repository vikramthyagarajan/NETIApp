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
		if(game)
			return {
				userid:user,
				Game:game,
				gameid:game._id
			};
	}
});
Template.UserMarathons.helpers({
	getMarathonsOfUser:function(user){
		var allmarathons=[];
		if(user.marathons){
			user.marathons.forEach(function(marathon){
				allmarathons.push(Marathons.findOne({_id:marathon}));
			});
		}
		return allmarathons;
	},
	getDataContextOfMarathon:function(userid,marathon){
		if(!marathon)
			return;
		return {userid:userid,Marathon:marathon,marathonid:marathon._id}
	}
});
