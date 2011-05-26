var express = require('express'),
    groups = require('./groups');

var app = express.createServer();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	groups.getTree(function(err, groups, conferences, rawdata){
	  res.render('index.jade', { 
	      groups:groups, conferences:conferences
	  });
	});
});

app.get('/data', function(req, res){
	groups.getTree(function(err, groups, conferences, rawdata){
	  res.send('var data = '  + JSON.stringify(rawdata)+ ";");  
	});
});

app.get('/about', function(req, res){
  res.render('about.jade');  
});

var port = parseInt(process.env.PORT || 8000);
app.listen(port);
console.log('Server listening on ' + port);