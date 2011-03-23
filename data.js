var data = require('./data.dat');
var groupstree = {};
for (var i in data) {
    var continent = data[i].continent;
    var country = data[i].country;
    var state = data[i].state;
    var link = '<a href="'+ data[i].link+ '">' + data[i].link + '</a>';
    
    if(!state) state = 'no-state';
    if(!groupstree[continent]) {
        groupstree[continent] = {};
    }
    if(groupstree[continent][country] == undefined) {
        groupstree[continent][country] = [];
    }
    if(groupstree[continent][country][state] == undefined) {
        groupstree[continent][country][state] = [];
    }
    
    groupstree[continent][country][state].push(data[i].town + ': ' +link);
    groupstree[continent][country][state].sort();
}
module.exports.groupstree = groupstree;