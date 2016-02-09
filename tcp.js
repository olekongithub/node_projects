var net = require("net")
//var date = require("date")

var port = process.argv[2]

function getDateString() {
	var date = new Date()
	var datestr = ""
	datestr += date.getFullYear() + '-'
	var monthNumber = date.getMonth()+1
	if (monthNumber < 10) {
		var month = "0" + monthNumber
	}
	else{
		var month = monthNumber
	}
	datestr += month + '-'
	if (date.getDate() < 10) {
		var day = "0" + date.getDate()
	}
	else {
		var day = date.getDate()
	}
	datestr += day + ' '
	datestr += date.getHours() + ':'
	datestr += date.getMinutes() + '\n'
	return datestr;
}

var server = net.createServer(function (socket) {
	var mystring = getDateString()
	//console.log(mystring)
	socket.write(mystring)
	socket.end()
})

server.listen(port)