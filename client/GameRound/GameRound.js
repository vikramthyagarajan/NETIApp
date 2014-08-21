GameRound={
	endRound:function(game,user,roundno){
		var fromMarathonId=Session.get("fromMarathonId");
		var answers=Session.get("answers");
		var data,dataid;
		// answerObject['rounds.'+roundno]=answers;
		if(answers.length!==0){
			if(fromMarathonId){
				data=Data.findOne({game:game._id,user:user._id,isMarathon:true,marathon:fromMarathonId});
				if(!data){
					var temp={};
					temp[roundno]={answers:answers};
					var temp1={};
					temp1[game._id]={rounds:temp};
					dataid=Data.insert({game:game._id,user:user._id,isMarathon:true,marathon:fromMarathonId,games:temp1});
				}
				else{
					var answerObject={};
					answerObject['games.'+game._id+'.rounds.'+roundno+".answers"]=answers;
					Data.update({_id:data._id},{$set:answerObject});
				}
			}
			else{
				data=Data.findOne({game:game._id,user:user._id,isMarathon:false});
				if(!data){
					var temp={};
					temp[roundno]={answers:answers};
					var temp1={};
					temp1[game._id]={rounds:temp};
					dataid=Data.insert({game:game._id,user:user._id,isMarathon:false,games:temp1});
				}
				else{
					var answerObject={};
					answerObject['games.'+game._id+'.rounds.'+roundno+".answers"]=answers;
					Data.update({_id:data._id},{$set:answerObject});
				}
			}
			ServerComm.getScoreOfRound(game._id,answers,function(error,result){
				var temp={};
				temp["games."+game._id+".rounds."+roundno+".score"]=result;
				Data.update({_id:data._id},{$set:temp});
			});
			var allrounds=[];
			if(!data&&dataid)
				data=Data.findOne({_id:dataid});
			if(data.games&&data.games[game._id]){
				var roundObj=data.games[game._id].rounds;
				for (var key in roundObj){
					if(roundObj.hasOwnProperty(key))
						allrounds.push(roundObj[key].answers);
				}
			}
			if(allrounds.length!=0)
				ServerComm.getScoreOfGame(game._id,allrounds,function(error,result){
					var temp={};
					console.log("result- "+result);
					temp["games."+game._id+".score"]=result;
					Data.update({_id:data._id},{$set:temp});
				});
		}
		alert("Round over!");
		Router.go('GameHome',{userid:user._id,gameid:game._id});
	}
};
Template.GameRound.rendered=function(){
	Output.setOutputWindow(document.getElementById("outputarea"));
	if(this.data.User&&this.data.Game)
		Events.onStartRound(this.data.User._id,this.data.Game._id,this.data.roundno);
	console.log(this.data);
	var gameIsTimed=false;
	if(gameIsTimed){
		var totalSeconds=200;
		var timer=document.getElementById('timer');
		timer.innerHTML="Round ends in :-"+totalSeconds+" seconds";
		var minutes,seconds;
		setTimeout(function(){
		},totalSeconds*1000);
	}
}
Template.GameRound.helpers({
	getQuestion:function(game,user,roundno){
		var questionNo=Session.get("questionNo");
		var prevAnswer=Session.get("prevAnswer");
		if(!game)
			return;
		ServerComm.getQuestion(game._id,roundno,questionNo,prevAnswer,function(err,res){
			dataTemplate={User:user,Game:game,roundno:roundno,Question:res};
			if(!res){
				GameRound.endRound(game,user,roundno);
			}
			var dom=document.getElementById("questionArea");
			if(!dom)
				return;
			if(dom.children.length>0)
				dom.removeChild(dom.children[0]);
			UI.insert(UI.renderWithData(Template.GameQuestionArea,dataTemplate),dom);
		});
		return null;
	},
	hasRoundStarted:function(game,roundno){
		var marathon=Session.get('fromMarathonId');
		if(marathon){
			var mar=Marathons.findOne({_id:marathon});
			if(mar&&mar.isStarted){
				if(mar.games){
					if(mar.games[game._id].isStarted)
						return mar.games[game._id].rounds[roundno].isStarted;
					else 
						return false;
				}
			}
			else
				return false;
		}
		else{
			if(game&&game.isStarted)
				return game.rounds[roundno].isStarted;
			else 
				return false;
		}
	}
});
Template.GameQuestionArea.helpers({
	getDataOfQuestion:function(question){
		if(!question)
			return;
		var options=[];
		for(var i=0;i<question.optionCount;i++)
			options.push({name:"option"+(i+1),value:question["option"+(i+1)]});
		var templateName="Type"+question.type+"Question";
		return {Question:question,QuestionOptions:options,TemplateName:templateName}
	}
});
Template.GameQuestionArea.events({
	'click #submitButton':function(elem,template){
		var questionType=document.getElementById("question").getAttribute("data-questionType");
		Output.setOutput("<p>Awesome</p>");
		var nextQuestion=Session.get("questionNo");
		var answers=Session.get('answers');
		var answer;
		var elements=document.getElementsByName('option');
		if(questionType==3){
			answer=elements[0].value;
		}
		else if(questionType==4){
			answer=elements[0].options[elements[0].selectedIndex].value;
		}
		else{
			var res=[];
			for(var i=0;i<elements.length;i++){
				var element=elements[i];
				if(element.checked)
					res.push(element.value);
			}
			answer=res.join(',');
		}
		ServerComm.processAnswer(template.data.Game._id,template.data.roundno,template.data.Question,answer);
		if(answers&&answer)
			answers.push({question:template.data.Question,answer:answer});
		ClientMethodController.onSubmit(template.data.User,template.data.Game,template.data.roundno,template.data.Question,answer);
		Session.set("answers",answers);
		nextQuestion++;
		Session.set("questionNo",nextQuestion);
	}
});
