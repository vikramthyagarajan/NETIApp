MethodController={
	checkOverridden:function(game,methodName){
		if(game.hasOwnProperty("serverCode"))
			return game.serverCode.hasOwnProperty(methodName);
		else return false;
	}
};
XLSX=Meteor.require("xlsx");
Meteor.users.allow({
	'insert':function(){
		return true;
	},
	'remove':function(){
		return true;
	},
	'update':function(){
		return true;
	}
});
Meteor.methods({
	getQuestion:function(gameid,roundno,questionNo,prevAnswer){
		var game=Games.findOne({_id:gameid});
		var overridden=MethodController.checkOverridden(game,"getQuestion");
		if(overridden)
			return eval(game.serverCode.getQuestion)();
		else
			return QuestionBank.getQuestion(game,roundno,questionNo,prevAnswer);
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
	// },
	processServerCodeForGame:function(gameid,serverCode){
		var data=Games.findOne({_id:gameid});
		var game=new NetiGame(data);
		eval(serverCode);
		game.flushMethods();
	}
});
