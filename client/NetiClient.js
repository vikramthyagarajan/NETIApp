NetiClient=function(game){
	this.game=game;
	this.overriddenMethods=new Object();
};
NetiClient.prototype={
	//This method provides ability to do bulk writes. Every methods must be overridden
	//with the override method, and then when this function is called, all the new
	//method data is written into database together.
	flushMethods:function(){
		Games.update({_id:this.game._id},{$set:{clientCode:this.overriddenMethods}});
	},
	overrideMethod:function(name,functionDef){
		if(!this.game)
			return null;
		this.overriddenMethods[name]="("+functionDef.toString()+")";
	}
}
