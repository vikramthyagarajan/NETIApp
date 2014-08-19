Games=new Meteor.Collection("games");
Marathons=new Meteor.Collection("marathons");
Data=new Meteor.Collection("data");
ExcelStore=new FS.Store.FileSystem("excelStore",{path:"~/uploads/excel"});
ExcelFiles=new FS.Collection("excelFiles",{
	stores:[ExcelStore]
});
