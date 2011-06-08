var couch = require('./couch.js');

var continent = {};
continent.sortedCountries = function () {
	var sorted = {},
	key, keys = [];
	for (key in this.countries) keys.push(key);
	keys.sort();
	for (var i = 0; i < keys.length; i++) {
		sorted[keys[i]] = this.countries[keys[i]];
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
		conferences['Conference'] = Object.create(continent, {countries: { value : {} } });
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
				groups[continentName] = Object.create(continent, {countries: { value : {} } });
				if(!groups[continentName].countries[country]) 
				groups[continentName].countries[country] = [];
				if(!groups[continentName].countries[country][state]) 
				groups[continentName].countries[country][state] = [];
				groups[continentName].countries[country][state].push(item);
			} else {
				if(!state) state = 'no-state';				
				if(!conferences[continentName].countries[country]) 
				conferences[continentName].countries[country] = [];
				if(!conferences[continentName].countries[country][state]) 
				conferences[continentName].countries[country][state] = [];
				conferences[continentName].countries[country][state].push(item);
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
