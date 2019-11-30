const fs 			= require("fs");
const FETCHDATA 	= require("./fetchData.js");
const DATAACCESS    = new FETCHDATA();
const ARCHIVER  	= require('archiver');




function convertToExcel() {

}

convertToExcel.prototype.fetchAndFilter =  function(response) {
	var data = DATAACCESS.getdata()
	this.categorize(data, response);
}


convertToExcel.prototype.categorize = function(data, response) {
	var languages 		= {};
	var self 			= this;
	var zip 			= ARCHIVER('zip');
	
	var max_length = 0;
	var excel_output = [];

	var track  = {};
	languages.text = [];

	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		if(languages[obj.language] == undefined) {
			languages[obj.language] = []
		}

		languages[obj.language].push(obj.translation);
		
		if(track[obj.text] == undefined) {
			track[obj.text] = obj.text;
			languages.text.push(obj.text);
		}
		
		if(max_length < languages[obj.language].length) {
				max_length = languages[obj.language].length;
		}
	}

	

	

	var languageKeysArray = Object.keys(languages);
	for(var i = 0; i < max_length; i++) {
		var obj = {};
		for(var j = 0; j <languageKeysArray.length; j++) {
			var lan = languageKeysArray[j];
			if(languages[lan].length > 0) {
				obj[lan] = languages[lan].pop();
			}
			else {
				obj[lan] = "";
			}
			
		}

		excel_output.push(obj);

	}

	//response.send("hello");
	response.xls('sample translation.xlsx', excel_output);
}


module.exports = convertToExcel;

