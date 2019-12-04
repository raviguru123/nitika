const fs 			= require("fs");
const FETCHDATA 	= require("./fetchData.js");
const DATAACCESS    = new FETCHDATA();
const ARCHIVER  	= require('archiver');


function convertToJson() {

}

convertToJson.prototype.fetchAndFilter =  function(request, response) {
	var data = DATAACCESS.getdata()
	this.categorize(data, request, response);
}


convertToJson.prototype.random_strings = function(length_of_string) 
{ 
  
	function shuffelWord (word){
		    var shuffledWord = '';
		    word = word.split('');
		    while (word.length > 0) {
		      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
		    }
		    return shuffledWord;
	}
   
    str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
  	return shuffelWord(str_result).substring(0, length_of_string); 
} 



convertToJson.prototype.deleteFolderRecursive = function(path) {
	console.log("pathpathpath deleteFolderRecursive", path);

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


convertToJson.prototype.categorize = function(data, request, response) {
	var languages 		= {};
	var self 			= this;
	var zip 			= ARCHIVER('zip');
	var dirName  		= self.random_strings(20);
	
	
	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		if(languages[obj.language] == undefined) {
			languages[obj.language] = {}
		}

		languages[obj.language][obj.key] = obj.translation;
	}

	var dirpath = process.cwd()+"/"+dirName;
	fs.mkdirSync(dirpath, (error) => {

	});


	Object.keys(languages).forEach((language)=> {
		fs.writeFileSync(dirpath+"/"+language+".json", JSON.stringify(languages[language]), 'binary');
	});

	zip.pipe(response);
	zip.directory(dirpath+'/', false);
	zip.finalize();

	

	setTimeout(() => {
		self.deleteFolderRecursive(dirpath);
	}, 5000);
}

module.exports = convertToJson;

