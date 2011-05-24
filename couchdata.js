var restler = require('restler');

function getCouchData(callback) {
	restler.get('https://communityjs.cloudant.com/groups/_all_docs?include_docs=true', {
		username: 'wherhoparcuouslandscande',
		password: ''
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
		callback(err);
	});
}
module.exports.getCouchData = getCouchData;

