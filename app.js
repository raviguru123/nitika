const 		express       		= require('express');
const 		app           		= express();
const 		port 		  		= 3000;
const 		convertToJson 		= require("./convertToJson.js");
const       convertToXml  		= require("./convertToXml.js");
const       convertToExcel  	= require("./convertToExcel.js");
const 	    compression   		= require('compression');
const 		json2xls 	  		= require('json2xls');



app.use(json2xls.middleware);





var jsonconvertor 	= new convertToJson();
var excelconvertor 	= new convertToExcel();
var xmlconvertor 	= new convertToXml();

//excelconvertor.fetchAndFilter({});

app.get('/getdata', (request, response) => {

	jsonconvertor.fetchAndFilter(request, response);
	//excelconvertor.fetchAndFilter(response);
	//xmlconvertor.fetchAndFilter(response);
})



app.listen(port, function(err) {
	if(err) {
		console.log("Error Occured while startting server");
		throw err;
	}
	console.log("server is listening on port", port)
})