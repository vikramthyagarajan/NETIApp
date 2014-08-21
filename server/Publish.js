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
Meteor.publish('currentUser',function(){
	if(this.userId)
		return Meteor.users.find({_id:this.userId},{fields:{'createdAt':0}});
	else  
		this.ready();
});
Meteor.publish('allUsers',function(){
	return Meteor.users.find({});
});
Meteor.publish('allGames',function(){
	return Games.find({},{fields:{'name':1}});
});
Meteor.publish('specificGame',function(gameid){
	return Games.find({name:gameid},{fields:{'serverCode':0}});
});
Meteor.publish('specificMarathon',function(marathonid){
	return Marathons.find({_id:marathonid},{});
});
Meteor.publish('marathonGames',function(marathonid){
	var games=[];
	var mar=Marathon.findOne({_id:marathonid});
	for(var key in mar.games){
		games.push(Games.findOne({_id:key}));
	}	
	return games;
});
Meteor.publish('userGames',function(userid){
	var games=[];
	var user=Meteor.users.findOne({_id:userid});
	user.games.forEach(function(game){
		games.push(Games.findOne({_id:game}));
	});
	return games;
});
Meteor.publish('userMarathons',function(userid){
	var marathons=[];
	var user=Meteor.users.findOne({_id:userid});
	user.marathons.forEach(function(marathon){
		marathons.push(Marathons.findOne({_id:marathon}));
	});
	return marathons;
});
Meteor.publish('developerGames',function(userid){
	return Games.find({creator:userid});
});
Meteor.publish('developerMarathons',function(userid){
	return Marathons.find({creator:userid});
});
Meteor.publish('dataValue',function(gameid,userid,isMar,marid){
	if(isMar&&marid)
		return Marathons.find({game:gameid,user:userid,isMarathon:true,marathon:marid});
	else
		return Marathons.find({game:gameid,user:userid});
});
