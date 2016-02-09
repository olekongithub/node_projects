module.exports = myFunc;
var fs = require("fs");
var path = require("path")

function myFunc ( dir, extension, callback ) {
	var data = [];

	var ext = "." + extension;
	fs.readdir(dir, function (err, list){
	   //console.log(list)
	   if (err) return callback(err);
	   for (x in list){
	      //console.log(path.extname(list[x]))
	      if (ext == path.extname(list[x])) {
	         //console.log(list[x]);
	         data.push(String(list[x]))
	      }
	   }
	   //console.log(data);
	   return callback (null, data);
	})
	
}

//myFunc(".","txt", function (err, data){
// 	if (err) console.log(err);
// 	console.log(data);
// })
