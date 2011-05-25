var restler = require('restler');

function queryData(callback) {
	console.log('quering database')
	restler.get('https://communityjs.cloudant.com/groups/_all_docs?include_docs=true', {
		username: require('./config').couchdb.username,
		password: require('./config').couchdb.password
	}).on('complete', function (data) {
		var json = JSON.parse(data);  
		if(json.rows) {
			var groups = [];
			for (var i=0; i < json.rows.length; i++) {
				groups.push(json.rows[i].doc);
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

