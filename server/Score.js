Score={
	//questions here are the Game.questions object, and the roundAnswers is an 
	//array of the answers given by the user per round.
	getScoreOfGame:function(rounds){
		var score=0;
		rounds.forEach(function(round){
			score+=Score.getScoreOfRound(round);
		});
		return score;
	},
	//roundAnswers is an array which contains objects. These objects have keys-
	//question:- the question this is an answer to. Has everything from the excel file
	//answer:- the answer,which is a string.
	getScoreOfRound:function(roundAnswers){
		var score=0;
		roundAnswers.forEach(function(answerObject){
			score+=Score.getScoreOfAnswer(answerObject.question,answerObject.answer);
		});
		return score;
	},
	//the argument answer is the answer given by the user for question question,
	//which is a string value containing the answer.
	getScoreOfAnswer:function(question,answer){
		if(question.correct==answer)
			return 1;
		else return 0;
	}
}
