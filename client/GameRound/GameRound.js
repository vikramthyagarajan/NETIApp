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
				alert("Time to go home MoFo!");
				Router.go('GameHome',{userid:user.id,gameid:game.id})
			}
			var dom=document.getElementById("questionArea");
			if(!dom)
				return;
			if(dom.children.length>0)
				dom.removeChild(dom.children[0]);
			UI.insert(UI.renderWithData(Template.GameQuestionArea,data),dom);
		});
		return null;
	}
});
Template.GameQuestionArea.helpers({
	getDataOfQuestion:function(question){
		if(!question)
			return;
		var options=[];
		for(var i=0;i<question.optionCount;i++)
			options.push({value:question["option"+(i+1)]});
		var templateName="Type"+question.type+"Question";
		return {Question:question,QuestionOptions:options,TemplateName:templateName}
	}
});
Template.GameQuestionArea.events({
	'click #submitButton':function(){
		var questionType=document.getElementById("question").getAttribute("data-questionType");
		Output.setOutput("<p>Awesome</p>");
		var nextQuestion=Session.get("questionNo");
		nextQuestion++;
		Session.set("questionNo",nextQuestion);
	}
});
