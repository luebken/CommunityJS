var restler = require('restler');

function queryData(callback) {
	console.log('quering database');
	var config = require('./config').couchdb;
	restler.get(config.url, {
		username: config.username,
		password: config.password
	}).on('complete', function (data) {
		var json = JSON.parse(data);  
		if(json.rows) {
			var groups = [];
			for (var i=0; i < json.rows.length; i++) {
				var doc = json.rows[i].doc;
				groups.push(doc);
			};
			console.log('Chill. Found ', groups.length, ' groups in CouchDB.');
			callback(null, groups);
		}
	}).on('error', function(err) {
		console.log('err: ' + err);
		callback(err);
	});
}
module.exports.queryData = queryData;

