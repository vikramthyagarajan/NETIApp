Template.UserHome.helpers({
	getGamesOfUser:function(userid){
		allgames=[];
		user=Meteor.users.findOne({_id:userid});
		// console.log(this.params.userid);
		if(user){
			user.games.forEach(function(game){
				allgames.push(Games.findOne({id:game.id}));
			});
		}
		return allgames;
	},
	getDataContextOfGame:function(user,game){
		return {
			userid:user,
			Game:game,
			gameid:game.id
		}
	}
});
