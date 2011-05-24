console.log('getting data from couch');

var http = require('http');

var options = {
	host: 'localhost',
	port: 5984,
	path: '/groups/_all_docs?include_docs=true'
};

function getCouchData(callback) {
	http.get(options, function(res) {
		var data = "";  
		if(res.statusCode == 200){  
			res.on("data", function (chunk) {  
				data += chunk;  
			});  

			res.on("end", function() {  
				var json = JSON.parse(data);  
				var groups = [];
				for (var i=0; i < json.rows.length; i++) {
					groups.push(json.rows[i].doc);
				};
				console.log('Chill. Found ', groups.length, ' groups in CouchDB.');
				callback(null, groups);
			});  
		} else {
			callback('invalid responce from couch');
		}
	});
}
module.exports.getCouchData = getCouchData;

