var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index.jade', { title: 'My Site' });  
});

console.log('Server started on 3000');
app.listen(3000);