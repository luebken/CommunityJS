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
    if(!groups[continent]) {
        groups[continent] = {};
    }
    if(!groups[continent][country]) {
        groups[continent][country] = [];
    }
    groups[continent][country].push(data[i].town + ': ' + data[i].link);
}
console.log(groups);

app.get('/', function(req, res){
  res.render('index.jade', { 
      groups: groups
      });  
});

console.log('Server started on 3000');
app.listen(3000);