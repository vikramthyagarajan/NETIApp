QuestionBank={
	//getQuestion retrieves a question required. In the default implementation,
	//all questions are retrieved in all rounds.
	//Here, game is the game object of the current game, round is current round
	//being played. questionno is just an integer denoting which question user is
	//answering. Note- prevAnswer can be null.
	//Also, when the function returns null, no further questions will be shown
	//to the user, and round will be over. Next round will be called.
	getQuestion:function(game,round,questionno,prevAnswer){
		if(game.questions.length>=questionno)
			return game.questions[questionno-1];
		else return null;
	},
	processAnswer:function(game,round,question,answer){
	}
}
