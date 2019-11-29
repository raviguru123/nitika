const fs 			= require("fs");
const FETCHDATA 	= require("./fetchData.js");
const DATAACCESS    = new FETCHDATA();
const ARCHIVER  	= require('archiver');




function convertToJson(req, res) {

}

convertToJson.prototype.fetchAndFilter =  function(response) {
	var data = DATAACCESS.getdata()
	this.categorize(data, response);
}


convertToJson.prototype.categorize = function(data, response) {
	var languages 		= {};
	var self 			= this;
	var zip 			= ARCHIVER('zip');
	
	
	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		if(languages[obj.language] == undefined) {
			languages[obj.language] = {}
		}

		// languages[obj.language].push({
		// 		[obj.key] : obj.translation
		// });


		languages[obj.language][obj.key] = obj.translation;
	}

	 response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=myFile.zip'
    });

    

    // Send the file to the page output.
    zip.pipe(response);
	Object.keys(languages).forEach((language)=> {
		zip.append(JSON.stringify(languages[language]), {name : language+".json"});
	});

    zip.finalize();
}

module.exports = convertToJson;

