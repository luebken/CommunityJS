var couch = require('./couch.js');

function sort(member) {
	var sorted = {},
	key, keys = [];
	for (key in member) {
	  keys.push(key);
	}
	keys.sort();
	for (var i = 0; i < keys.length; i++) {
		sorted[keys[i]] = member[keys[i]];
	}
	return sorted;	
}

var groups;
var conferences;
var rawdata; 
function getTree(callback) {
	if(groups){
		console.log('using cached data');
		callback(null, groups, conferences, rawdata);
		return;
	}
	couch.queryData(function(err, data) {
		if(err) {
			callback(err)
			return;
		}
		groups = {};
		conferences = {};
		conferences['Conference'] = {}; //dummy continent
		rawdata = data;
		for (var i in data) {
			var continent = data[i].continent;
			if(!continent) continue;
			var country = data[i].country;
			var state = data[i].state;
			var link = '<a href="'+ data[i].link+ '">' + data[i].link + '</a>';
			var item = data[i].town + ': ' + link;
			if(!state) state = 'no-state';
			
			if(continent != 'Conference') {
				if(!groups[continent]) 
					groups[continent] = {};
				if(!groups[continent][country]) 
					groups[continent][country] = [];
				if(!groups[continent][country][state]) 
					groups[continent][country][state] = [];
				groups[continent][country][state].push(item);
				groups = sort(groups)
				groups[continent] = sort(groups[continent]);
				groups[continent][country] = sort(groups[continent][country]);
			} else {
				if(!conferences[continent][country]) 
					conferences[continent][country] = [];
				if(!conferences[continent][country][state]) 
					conferences[continent][country][state] = [];
				conferences[continent][country][state].push(item);
			}
			
		}
		callback(null, groups, conferences, rawdata);
	})
}

function flushCache() {
	groups = null;
}
module.exports.flushCache = flushCache;
module.exports.getTree = getTree;
