Template.GameRound.rendered=function(){
	Output.setOutputWindow(document.getElementById("outputarea"));
}
Template.GameRound.helpers({
	getQuestion:function(game,user,roundno){
		var questionNo=Session.get("questionNo");
		var prevAnswer=Session.get("prevAnswer");
		if(!game)
			return;
		ServerComm.getQuestion(game._id,roundno,questionNo,prevAnswer,function(err,res){
			data={Question:res};
			if(!res){
				var fromMarathonId=Session.get("fromMarathonId");
				var answers=Session.get("answers");
				// var answerObject={};
				// answerObject['rounds.'+roundno]=answers;
				if(answers.length!==0){
					if(fromMarathonId){
						var data=Data.findOne({game:game._id,user:user._id,isMarathon:true,marathon:fromMarathonId});
						if(!data){
							var temp={};
							temp[roundno]=answers;
							Data.insert({game:game._id,user:user._id,isMarathon:true,marathon:fromMarathonId,rounds:temp});
						}
						else{
							var answerObject={};
							answerObject['rounds.'+roundno]=answers;
							Data.update({_id:data._id},{$set:answerObject});
						}
					}
					else{
						var data=Data.findOne({game:game._id,user:user._id,isMarathon:false});
						if(!data){
							var temp={};
							temp[roundno]=answers;
							Data.insert({game:game._id,user:user._id,isMarathon:false,rounds:temp});
						}
						else{
							var answerObject={};
							answerObject['rounds.'+roundno]=answers;
							Data.update({_id:data._id},{$set:answerObject});
						}
					}
				}
				alert("Round over!");
				Router.go('GameHome',{userid:user._id,gameid:game._id});
			}
			var dom=document.getElementById("questionArea");
			if(!dom)
				return;
			if(dom.children.length>0)
				dom.removeChild(dom.children[0]);
			UI.insert(UI.renderWithData(Template.GameQuestionArea,data),dom);
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
			if(game.isStarted)
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
	'click #submitButton':function(){
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
		if(answers&&answer)
			answers.push(answer);
		Session.set("answers",answers);
		nextQuestion++;
		Session.set("questionNo",nextQuestion);
	}
});
