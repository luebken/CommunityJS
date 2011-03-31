require.paths.unshift('./vendor')

var express = require('express'),
    data = require('./data');
var app = express.createServer();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index.jade', { 
      tree: data.groupstree
  });  
});
app.get('/about', function(req, res){
  res.render('about.jade');  
});
app.get('/data', function(req, res){
  res.send('var data = '  + JSON.stringify(data.rawdata)+ ";");  
});

var port = parseInt(process.env.PORT || 8000);
app.listen(port);
console.log('Server listening on ' + port);