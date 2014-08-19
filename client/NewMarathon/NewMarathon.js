Template.NewMarathon.events({
	'click #submitMarathon':function(element,template){
		var name=document.getElementById('newMarathonName').value;
		var gameName=document.getElementById('gameName').value;
		var game;
		var games={};
		if(gameName)
			game=Games.findOne({name:gameName});
		if(game){
			var rounds={};
			game.rounds.forEach(function(round){
				rounds[round.srno]={srno:round.srno,isStarted:false};
			});
			games[game._id]={isStarted:false,rounds:rounds};
		}
		var userid=template.data.User._id;
		var marathonid=Marathons.insert({name:name,isStarted:false,games:games,creator:userid});
		var usersString=document.getElementById('users').value;
		var users=usersString.split(',');
		users.forEach(function(username){
			var user=Meteor.users.findOne({username:username});
			if(user)
				Meteor.users.update({_id:user._id},{$push:{marathons:marathonid}});
		});
	}
});
