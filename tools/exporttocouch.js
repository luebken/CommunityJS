console.log('exporting');

var data = require('./data.dat'),
	http = require('http');


for (var i=0; i < data.length; i++) {
	console.log(data[i]);
	
	var options = {
		host: 'localhost',
		port: '5984',
		path: '/communityjs',
		method: 'POST',
		headers: {'Content-type': 'application/json'}
	};
	
	var req = http.request(options, function(res) {
		var data = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function (chunk) {
			console.log(data);
		});
	});
	req.write(JSON.stringify(data[i]));
	req.end();
};