Template.NewGame.events({
	'click #submitGame':function(event,template){
		var gameName=document.getElementById("newGameName").value;
		var rounds=document.getElementById("rounds");
		var totalRounds=rounds[rounds.selectedIndex].value;
		rounds=[];
		for(var i=0;i<totalRounds;i++)
		{
			rounds[i]={srno:i+1,isStarted:true};
		}
		var questionFile=document.getElementById("questions").files[0];
		var serverCode=document.getElementById("serverCode").value;
		var clientCode=document.getElementById("clientCode").value;
		var userid=template.data.User._id;
		var gameId;
		if(clientCode)
			gameId=Games.insert({name:gameName,rounds:rounds,isStarted:true,creator:userid,code:{client:clientCode}});
		else 
			gameId=Games.insert({name:gameName,rounds:rounds,isStarted:true,creator:userid});
		ExcelParser.parseExcelData(questionFile,function(result){
			Games.update({_id:gameId},{$set:{questions:result}});
		});
		var usersString=document.getElementById('users').value;
		var users=usersString.split(',');
		users.forEach(function(username){
			var user=Meteor.users.findOne(username);
			if(user)
				user.update({username:username},{$push:{games:gameid}});
			ServerComm.processServerCodeForGame(gameId,serverCode);
		});
	}
});
