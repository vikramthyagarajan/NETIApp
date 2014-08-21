Template.PlayMarathon.helpers({
	getMarathonGames:function(games,userid){
		var allGames=[];
		for(var key in games){
			if(games.hasOwnProperty(key)){
				allGames.push(Games.findOne({_id:key}));
			}
		}
		return allGames;
	},
	hasMarathonStarted:function(marathon){
		return marathon.isStarted;
	},
	isGameStarted:function(marathongames,gameid){
		return marathongames[gameid].isStarted;
	}
});
Template.PlayMarathon.events({
	'click .playGame':function(element,template){
		var gameid=element.currentTarget.getAttribute('data-gameid');
		Router.go('GameHome',{userid:template.data.User._id,gameid:gameid},{query:{fromMarathonId:template.data.Marathon._id}});
	}
});
