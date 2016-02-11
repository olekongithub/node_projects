var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')
Promise.promisifyAll(fs)

var search = function (dir, extension, size) {
	console.time('search')
	return new Promise(function(resolve, reject) {
		//results is the final list of files meeting requirements 
		var results = []

		fs.readdirAsync(dir).then(function (files) {
			var filenum = files.length
			
			//if no items in directory return
			if (!filenum) resolve(results)

			//check each item in directory
			files.forEach( function ( file ) {
				var newpath = path.resolve(dir, file)
				console.log("Currently testing:", newpath)
				
				fs.lstatAsync(newpath).then( function (stats) {
					
					//run recursively if item is a directory 
					if ( stats && stats.isDirectory() ){
						
						search(newpath,extension,size).then(function(files){
							//add these files to results!
							results = results.concat(files)
							--filenum
							if (!filenum) resolve(results)
						})
					}
					//if a file, check if file fits requirements
					else if ( stats && (path.extname(newpath) == extension) && (stats['size'] > size)) {
						results.push(newpath)
						--filenum
						if (!filenum) resolve(results)
					}
					//file that doesn't match search criteria
					else {
						--filenum
						if (!filenum) resolve(results)
					}
				})
			})
		})
	})
}
/*
search arguments:
folder to start searching from
file extension to search for
minimum size of file in bytes
*/

search(process.env.HOME,'.js', 200000).then(
	function(searchresults) {
	  	console.log('Final results:')
	 	searchresults.forEach(function (item) {console.log(item)} )
	  	console.log('Returned', searchresults.length, 'results')
	  	console.timeEnd('search')
})



