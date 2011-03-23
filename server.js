var express = require('express'),
    data = require('./data');
var app = express.createServer();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

var groups = {};
for (var i in data) {
    var continent = data[i].continent;
    var country = data[i].country;
    var state = data[i].state;
    if(!state) state = 'no-state';
    if(!groups[continent]) {
        groups[continent] = {};
    }
    if(groups[continent][country] == undefined) {
        groups[continent][country] = [];
    }
    if(groups[continent][country][state] == undefined) {
        groups[continent][country][state] = [];
    }
    var link = '<a href="'+ data[i].link+ '">' + data[i].link + '</a>';
    groups[continent][country][state].push(data[i].town + ': ' +link);
    groups[continent][country][state].sort();
}

app.get('/', function(req, res){
  res.render('index.jade', { 
      groups: groups
      });  
});

console.log('Server started on 3000');
app.listen(3000);