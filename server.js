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
    var link = '<a href="'+ data[i].link+ '">'+ data[i].link+'</a>';
    groups[continent][country].push(data[i].town + ': ' +link );
}

app.get('/', function(req, res){
  res.render('index.jade', { 
      groups: groups
      });  
});

console.log('Server started on 3000');
app.listen(3000);