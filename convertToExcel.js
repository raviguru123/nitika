const fs 			= require("fs");
const FETCHDATA 	= require("./fetchData.js");
const DATAACCESS    = new FETCHDATA();
const ARCHIVER  	= require('archiver');
const json2xls 		= require('json2xls');




function convertToExcel() {

}

convertToExcel.prototype.fetchAndFilter =  function(response) {
	var data = DATAACCESS.getdata()
	this.categorize(data, response);
}



convertToExcel.prototype.random_strings = function(length_of_string) 
{ 
  
	function shuffelWord (word){
		    var shuffledWord = '';
		    word = word.split('');
		    while (word.length > 0) {
		      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
		    }
		    return shuffledWord;
	}
    // String of all alphanumeric character 
    str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
  
    // Shufle the $str_result and returns substring 
    // of specified length 
    return shuffelWord(str_result).substring(0, length_of_string); 
} 



convertToExcel.prototype.deleteFolderRecursive = function(path) {
	if( fs.existsSync(path) ) {
	    fs.readdirSync(path).forEach(function(file,index){
	      var curPath = path + "/" + file;
	      if(fs.lstatSync(curPath).isDirectory()) { // recurse
	        deleteFolderRecursive(curPath);
	      } else { // delete file
	        fs.unlinkSync(curPath);
	      }
	    });
	    fs.rmdirSync(path);
	  }
};


convertToExcel.prototype.categorize = function(data, response) {
	var languages 		= {};
	var self 			= this;
	var zip 			= ARCHIVER('zip');
	var dirName  		= self.random_strings(20);
	
	var max_length = 0;
	var excel_output = [];

	var track  = {};
	for(var i = 0; i < data.length; i++) {
		var obj = data[i]
		if(languages[obj.language] == undefined) {
			languages[obj.language] = []
		}

		languages[obj.language].push({
			"key" : obj.key,
			[obj.language] : obj.translation,
			"text" : obj.text
		})
	}

	var dirpath = process.cwd()+"/"+dirName;
	fs.mkdirSync(dirpath, (error) => {

	})

	
	Object.keys(languages).forEach((language)=> {
			var languageObj = languages[language];
			var languageBody = "";
			var xls = json2xls(languageObj);
			fs.writeFileSync(dirpath+"/"+language+".xlsx", xls, 'binary');
	});


	zip.pipe(response);
	zip.directory(dirpath+'/', false);
	zip.finalize();

	setTimeout(()=>{
		self.deleteFolderRecursive(dirpath);
	}, 5000);

}

module.exports = convertToExcel;

