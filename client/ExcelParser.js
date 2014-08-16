ExcelParser={
	parseQuestions:function(questions){
		var result=[];
		questions.forEach(function(question){
			var questionObject=question;
			var optionCount=null;
			for(property in questionObject){
				var value=questionObject[property].toString();
				if(value.match("///")){
					var optionData=value.split("///");
					var number=parseInt(optionData[1]);
					optionCount=number>optionCount?number:optionCount;
					questionObject["option"+number]=optionData[0];
					delete questionObject[property];
				}
				else if(value.match("[*][*][*]")){
					questionObject["correct"]=value.split("***")[1];
					delete questionObject[property];
				}
			}
			if(optionCount)
				questionObject["optionCount"]=optionCount;
			else 
				questionObject["optionCount"]=0;
			result.push(questionObject);
		});
		return result;
	},
	parseExcelData:function(file,callback){
		var fileReader=new FileReader();
		var result;
		fileReader.onload=function(file){
			var workbook=XLSX.read(file.target.result,{type:'binary'});
			var sheetName=workbook.SheetNames[0];
			var worksheet=workbook.Sheets[sheetName];
			result=ExcelParser.parseQuestions(XLSX.utils.sheet_to_json(worksheet));
			callback(result);
		}
		fileReader.readAsBinaryString(file);
	}
}
			

