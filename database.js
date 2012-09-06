var restler = require('restler');

function queryData(callback) {
	var config = require('./config').database;
	console.log('quering database ' + config.url);
	restler.get(config.url).on('complete', function (data) {
		var groups = JSON.parse(data);  
		callback(null, groups)
	}).on('error', function(err) {
		console.log('err: ' + err);
		callback(err);
	});
}
module.exports.queryData = queryData;

