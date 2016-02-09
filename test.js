var fs = require("fs");
var path = require("path")
var module = require("./module.js")

var dir = process.argv[2]
var ext = process.argv[3]

module(dir, ext, function(err, data){
   if (err) return console.error("There was an error: ", err)
   data.forEach(function (file) {
      console.log(file)
   })

})