var http = require("http")
var fs = require("fs")
var url = require("url")

var port = process.argv[2]
//var location = process.argv[3]

//console.log(port)

var map = require('through2-map')

var server = http.createServer( (req, res) => {
	res.writeHead(200, {'Content-type': 'application/json'})
	var parsed = url.parse(req.url, true)
	//console.log(parsed)
	var query = parsed.query
	if (parsed.pathname == '/api/parsetime') {
		var ts = new Date(query.iso)
		//console.log('time is: ', ts, ts.getHours(), 
		//	ts.getMinutes(), ts.getSeconds())
		var result = JSON.stringify({'hour':ts.getHours(), 'minute':ts.getMinutes(),
			'second':ts.getSeconds()})
		res.end(result)
		//nsole.log(result)
	}
	if (parsed.pathname == '/api/unixtime') {
		var ts = Date.parse(query.iso)
		var result = JSON.stringify({'unixtime': ts})
		res.end(result)
	}
	

})

server.listen(port)




// function startServer () {
// 	var server = http.createServer( (req, res) => {
// 		res.writeHead(200, {'content-type': 'text/plain'})
// 		req.pipe(map(function (chunk){
// 			return chunk.toString().toUpperCase()
// 		})).pipe(res)

// 	})

// 	server.listen(Number(port))
// 	//console.log("SERVER RUNNING")
// }

// startServer()