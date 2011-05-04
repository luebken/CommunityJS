var data = require('./data.dat');
var groupstree = {};

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

for (var i in data) {
	var continentName = data[i].continent;
	var country = data[i].country;
	var state = data[i].state;
	var link = '<a href="'+ data[i].link+ '">' + data[i].link + '</a>';
	var anchor = '<a name="'+ data[i].id+ '">'+ data[i].town + '</a>';
	var item = anchor + ': ' + link;
	
	if(!state) state = 'no-state';
	if(!groupstree[continentName]) 
		groupstree[continentName] = Object.create(continent, {countries: { value : {} } });
	if(!groupstree[continentName].countries[country]) 
		groupstree[continentName].countries[country] = [];
	if(!groupstree[continentName].countries[country][state]) 
		groupstree[continentName].countries[country][state] = [];
	groupstree[continentName].countries[country][state].push(item);
}
module.exports.groupstree = groupstree;
module.exports.rawdata = data;