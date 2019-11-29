const 		express       = require('express');
const 		app           = express();
const 		port 		  = 3000;
const 		convertToJson = require("./convertToJson.js");
const       convertToXml  = require("./convertToXml.js");
const 	    compression   = require('compression');






var jsonconvertor = new convertToJson();

app.get('/getdata', (request, response) => {
  	jsonconvertor.fetchAndFilter(response);
})



app.listen(port, function(err) {
	if(err) {
		console.log("Error Occured while startting server");
		throw err;
	}
	console.log("server is listening on port", port)
})