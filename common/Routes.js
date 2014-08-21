Router.map(function(){
	this.route('UserHome',{
		path:'/users/:userid',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'UserHomeHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('userGames',this.params.userid),Meteor.subscribe('userMarathons',this.params.userid)];
		},
		data:function(){
			return {
				User:Meteor.users.findOne({_id:this.params.userid}),
				userid:this.params.userid
			};
		}
	});
	this.route('GameHome',{
		path:'users/:userid/playGame/:gameid',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'GameHomeHeader':{to:'header'}
		},
		waitOn:function(){
			var marathonid=this.params.fromMarathonId;
			if(marathonid)
				return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificGame',this.params.gameid),Meteor.subscribe('userMarathons',marathonid)];
			else
				return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificGame',this.params.gameid)];
		},
		onRun:function(){
			Events.onStartGame(this.params.userid,this.params.gameid);
			if(this.params.fromMarathonId)
				Session.set('fromMarathonId',this.params.fromMarathonId);
		},
		onStop:function(){
			Events.onEndGame(this.params.userid,this.params.gameid);
			Session.set('fromMarathonId',null);
		},
		data:function(){
			if(this.params.fromMarathonId)
				return {
					User:Meteor.users.findOne({_id:this.params.userid}),
					Game:Games.findOne({_id:this.params.gameid}),
					fromMarathonId:this.params.fromMarathonId
				};
			else
				return {
					User:Meteor.users.findOne({_id:this.params.userid}),
					Game:Games.findOne({_id:this.params.gameid})
				};
		}
	});
	this.route('GameRound',{
		path:'users/:userid/playGame/:gameid/round/:roundno',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'GameRoundHeader':{to:'header'}
		},
		waitOn:function(){
			var marathon=this.params.fromMarathonId;
			if(marathon)
				return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificGame',this.params.gameid),Meteor.subscribe('dataValue',this.params.gameid,this.params.userid,true,marathon)];
			else
				return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificGame',this.params.gameid),Meteor.subscribe('dataValue',this.params.gameid,this.params.userid,false,null)];
		},
		onRun:function(){
			Session.set("questionNo",1);
			Session.set("answers",[]);
			Session.set("fromMarathonId",this.params.fromMarathonId);
		},
		onStop:function(){
			Events.onEndRound(this.params.userid,this.params.gameid,this.params.roundno);
			Session.set("fromMarathonId",null);
			Session.set("questionNo",1);
			Session.set('answers',[]);
		},
		data:function(){
			if(this.params.marathonid)
				return {
					User:Meteor.users.findOne({_id:this.params.userid}),
					Game:Games.findOne({_id:this.params.gameid}),
					roundno:this.params.roundno-1,
					fromMarathonId:this.params.marathonid
				};
			else
				return {
					User:Meteor.users.findOne({_id:this.params.userid}),
					Game:Games.findOne({_id:this.params.gameid}),
					roundno:this.params.roundno-1
				};
		}
	});
	this.route('DeveloperConsole',{
		path:'users/:userid/developerConsole',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'DeveloperConsoleHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('developerGames',this.params.userid),Meteor.subscribe('developerMarathons',this.params.userid)];
		},
		data:function(){
			return {
			  User:Meteor.users.findOne({_id:this.params.userid}),
				DeveloperGames:Games.find({creator:this.params.userid}),
				DeveloperMarathons:Marathons.find({creator:this.params.userid})
			};
		}
	});
	this.route('NewGame',{
		path:'users/:userid/newGame',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'NewGameHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('allUsers')];
		},
		data:function(){
			return {
			  User:Meteor.users.findOne({_id:this.params.userid})
			};
		}
	});
	this.route('Login',{
		path:'/',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'LoginHeader':{to:'header'}
		}
	});
	this.route('ManageGame',{
		path:'users/:userid/manageGame/:gameid',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'ManageGameHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificGame',this.params.gameid)];
		},
		data:function(){
			return {
				User:Meteor.users.findOne({_id:this.params.userid}),
			  Game:Games.findOne({_id:this.params.gameid})
			};
		}
	});
	this.route('ManageMarathon',{
		path:'users/:userid/manageMarathon/:marathonid',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'ManageMarathonHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificMarathon',this.params.marathonid),Meteor.subscribe('marathonGames',this.params.marathonid)];
		},
		data:function(){
			return {
			  User:Meteor.users.findOne({_id:this.params.userid}),
				Marathon:Marathons.findOne({_id:this.params.marathonid})
			};
		}
	});
	this.route('NewMarathon',{
		path:'users/:userid/newMarathon',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'NewMarathonHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('allGames'),Meteor.subscribe('allUsers')];
		},
		data:function(){
			return {
			  User:Meteor.users.findOne({_id:this.params.userid})
			};
		}
	});
	this.route('PlayMarathon',{
		path:'users/:userid/playMarathon/:marathonid',
		layoutTemplate:'LayoutTemplate',
		yieldTemplates:{
			'PlayMarathonHeader':{to:'header'}
		},
		waitOn:function(){
			return [Meteor.subscribe('currentUser'),Meteor.subscribe('specificMarathon',this.params.marathonid)];
		},
		data:function(){
			return {
			  User:Meteor.users.findOne({_id:this.params.userid}),
				Marathon:Marathons.findOne({_id:this.params.marathonid})
			};
		}
	});
});
