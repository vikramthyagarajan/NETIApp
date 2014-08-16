ServerComm={
	getQuestion:function(gameid,roundno,questionNo,prevAnswer,callback){
		Meteor.call('getQuestion',gameid,roundno,questionNo,prevAnswer,callback);
	},
	processExcelIntoData:function(game,fileid,callback){
		Meteor.call('processExcelIntoData',game,fileid,callback);
	},
	processServerCodeForGame:function(gameid,serverCode,callback){
		Meteor.call('processServerCodeForGame',gameid,serverCode,callback);
	}
}

