Template.ManageGame.events({
	'click #startGame':function(element,template){
		var gameid=template.data.Game._id;
		var toggle=element.currentTarget.getAttribute("data-currentValue");
		toggle=(toggle=="true"?false:true);
		Games.update({_id:gameid},{$set:{isStarted:toggle}});
	},
	'click .startRound':function(element,template){
		var gameid=element.currentTarget.getAttribute("data-gameid");
		var roundno=element.currentTarget.getAttribute("data-roundno");
		var toggle=element.currentTarget.getAttribute("data-currentValue");
		toggle=(toggle=="true"?false:true);
		Games.update({_id:gameid,'rounds.srno':roundno},{$set:{'rounds.$.isStarted':toggle}});
	}
});
Template.ManageGame.helpers({
	getStringOfBoolean:function(val){
		if(val!==null&&val!==undefined)
			return val.toString();
	}
});
