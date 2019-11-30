const fs 			= require("fs");
const FETCHDATA 	= require("./fetchData.js");
const DATAACCESS    = new FETCHDATA();
const ARCHIVER  	= require('archiver');
const BUILDER 		= require('xmlbuilder');

function convertToXml() {

}



convertToXml.prototype.fetchAndFilter =  function(response) {
	var data = DATAACCESS.getdata()
	this.categorize(data, response);
}


convertToXml.prototype.categorize = function(data, response) {
	var languages 		= {};
	var self 			= this;
	var zip 			= ARCHIVER('zip');
	
	
	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		if(languages[obj.language] == undefined) {
			languages[obj.language] = {}
		}

		languages[obj.language][obj.key] = obj.translation;
	}

	
	response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=myFile.zip'
    });

	zip.pipe(response);
	

var 	xmlHeader  =  '<?xml version="1.0" encoding="utf-8"?>';
		xmlHeader  += '<resources tools="http://schemas.android.com/tools" tools:ignore="MissingTranslation"><type><string>';
var 	xmlbody    = '<string name="about_us_text">Herzlich willkommen zur Interact Pro-App. Diese App ermöglicht Installateuren die Inbetriebnahme und Prüfung sowie Geschäftsinhabern die Verwaltung des Beleuchtungssystems.</string>';
var 	xmlFooter  =  '</string></type></resources>';


	
	Object.keys(languages).forEach((language)=> {
		var languageObj = languages[language];
		var languageBody = "";

		Object.keys(languageObj).forEach((key)=> {
			languageBody += '<string name="'+key+'">'+languageObj[key]+'</string>';
		});

		zip.append(xmlHeader+languageBody+xmlFooter, {name : language+".xml"});
	});

    zip.finalize();
}



module.exports = convertToXml;

