var express = require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var pg=require('pg');

app.use(express.static('public'));


app.get('/', function(req, res){
  console.log('at base URL');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/newAnimal', urlencodedParser, function(req, res){
  console.log('In newAnimal, we have just received: ' + req.body.newAnimalIn);
});

app.listen(3000, 'localhost', function(req, res){
  console.log('server is now listening at port 3000');
});
