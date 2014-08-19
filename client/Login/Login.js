Template.Login.events({
	'click #signIn':function(){
		var username=document.getElementById('username').value;
		var password=document.getElementById('password').value;
		Meteor.loginWithPassword({username:username},password,function(err){
			if(err)
				alert("Username/password was incorrect. Try again.");
			else(Router.go("UserHome",{userid:Meteor.userId()}));
		});
	}
});
Template.Login.helpers({
	goToUser:function(){
		Router.go("UserHome",{userid:Meteor.userId()});
	}
});
