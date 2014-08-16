Score={
	//questions here are the Game.questions object, and the roundAnswers is an 
	//array of the answers given by the user per round.
	getScoreOfGame:function(questions,roundAnswers){
		var score=0;
		roundAnswers.forEach(round,function(){
			score+=this.getScoreOfRound(questions,round);
		});
		return score;
	},
	//questions contain all question of the game, and round contains all answers in
	//the round.
	getScoreOfRound:function(questions,round){
		var score=0;
		round.forEach(answer,function(){
			score+=this.getScoreOfAnswer(questions[answer.questionno],answer);
		});
	},
	//the argument answer is the answer given by the user for question question.
	getScoreOfAnswer:function(question,answer){
		if(question.correct==answer.value)
			return 1;
		else return 0;
	}
}
