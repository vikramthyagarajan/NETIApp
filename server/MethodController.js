MethodController={
	checkOverridden:function(game,methodName){
		if(game.hasOwnProperty("serverCode"))
			return game.serverCode.hasOwnProperty(methodName);
		else return false;
	}
};
XLSX=Meteor.require("xlsx");
Meteor.methods({
	getQuestion:function(gameid,roundno,questionNo,prevAnswer){
		var game=Games.findOne({_id:gameid});
		var overridden=MethodController.checkOverridden(game,"getQuestion");
		if(overridden)
			return eval(game.serverCode.getQuestion)(game,roundno,questionNo,prevAnswer);
		else
			return QuestionBank.getQuestion(game,roundno,questionNo,prevAnswer);
	},
	processAnswer:function(gameid,roundno,question,answer){
		var game=Games.findOne({_id:gameid});
		var overridden=MethodController.checkOverridden(game,"processAnswer");
		if(overridden)
			return eval(game.serverCode.processAnswer)(game,roundno,question,answer);
		else
			return QuestionBank.processAnswer(game,roundno,question,answer);
	},
	getScoreOfRound:function(gameid,roundAnswers){
		var game=Games.findOne({_id:gameid});
		var overridden=MethodController.checkOverridden(game,"getScoreOfRound");
		if(overridden)
			return eval(game.serverCode.getScoreOfRound)(roundAnswers);
		else
			return Score.getScoreOfRound(roundAnswers);
	},
	getScoreOfGame:function(gameid,rounds){
		var game=Games.findOne({_id:gameid});
		var overridden=MethodController.checkOverridden(game,"getScoreOfGame");
		if(overridden)
			return eval(game.serverCode.getScoreOfGame)(rounds);
		else
			return Score.getScoreOfGame(rounds);
	},
	processServerCodeForGame:function(gameid,serverCode){
		var data=Games.findOne({_id:gameid});
		var game=new NetiGame(data);
		eval(serverCode);
		game.flushMethods();
	},
	// processExcelIntoData:function(game,fileid,fileObj){
	// 	Files.on('stored',function(fileObj
	// 	var file=ExcelFiles.findOne({_id:fileid});
	// 	var reader=file.createReadStream('excelFiles');
	// 	var data="";
	// 	reader.on('data',function(buffer){
	// 		console.log("working");
	// 		data+=buffer.toString();
	// 	});
	// 	reader.on('end',function(){
	// 		ExcelParser.parseExcelData(data);
	// 	});
	// }
});
