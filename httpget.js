var http = require("http");

var url1 = process.argv[2]
var url2 = process.argv[3]
var url3 = process.argv[4]

var total = ""

http.get(url1, function(response){
	var total = ""
	response.setEncoding("utf8")
	response.on("data", function (response){
		total += response
	})
	response.on('error', console.error)
	response.on("end", function(){
		total += '\n'
		http.get(url2, function(response){
		
			response.setEncoding("utf8")
			response.on("data", function (response){
				total += response
			})
			response.on('error', console.error)
			response.on("end", function(){
				total += '\n'
				http.get(url3, function(response){

					response.setEncoding("utf8")
					response.on("data", function (response){
						total += response
					})
					response.on('error', console.error)
					response.on("end", function(){
						console.log(total)
					})
				})
			})
		})
		
	})
})