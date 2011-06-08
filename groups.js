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
			var continentName = data[i].continent;
			var country = data[i].country;
			var state = data[i].state;
			var link = '<a href="'+ data[i].link+ '">' + data[i].link + '</a>';
			var anchor = '<a name="'+ data[i].id+ '">'+ data[i].town + '</a>';
			var item = anchor + ': ' + link;

			if(continentName != 'Conference') {
				if(!state) state = 'no-state';
				if(!groups[continentName]) 
					groups[continentName] = {};
				if(!groups[continentName][country]) 
					groups[continentName][country] = [];
				if(!groups[continentName][country][state]) 
					groups[continentName][country][state] = [];
				groups[continentName][country][state].push(item);
				groups[continentName] = sort(groups[continentName]);
				groups[continentName][country] = sort(groups[continentName][country]);
			} else {
				if(!state) state = 'no-state';				
				if(!conferences[continentName][country]) 
					conferences[continentName][country] = [];
				if(!conferences[continentName][country][state]) 
					conferences[continentName][country][state] = [];
				conferences[continentName][country][state].push(item);
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
