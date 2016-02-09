var Promise = require('promise');
var http = require('http')

function TestIt(){
    return new Promise(function(resolve,reject){
        console.log("promise started")
        //yield setTimeout(suspend.resume(), 3000)
        resolve("we resolved it")
    })
}

function UltimateTest() {
    TestIt().then(function (data) {
        console.log('finished!', data)
    })
}

UltimateTest()

function SayHello(url) {
    return new Promise( function (resolve, reject)  {
        http.get(url, function(response){
            var total = ""
            response.setEncoding("utf8")
            response.on("data", function (response){
                total += response
            })
            response.on('error', reject)
            response.on("end", function(){
                resolve(total)
            })
        })
    })
}

var greetingPromise = SayHello('http://google.com')
greetingPromise.then(function(res){
    console.log("we got it", res)
}, function (rej) {
    console.err('we dont got it', rej)
})