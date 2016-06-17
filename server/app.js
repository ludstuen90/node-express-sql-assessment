var express = require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

//incorporates modules
var randomNumber=require('../modules/randomNumber.js');

//adds database connectivity
var pg=require('pg');
var connectionString= 'postgres://localhost:5432/zoo';

app.use(express.static('public'));


app.get('/', function(req, res){
  console.log('at base URL');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/newAnimal', urlencodedParser, function(req, res){
  console.log('In newAnimal, we have just received: ' + req.body.newAnimalIn);
  var undecided=randomNumber(1,100);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO zoo_table (animal_name, animal_count) VALUES($1, $2)', [req.body.newAnimalIn, undecided]);
  });
});

app.get('/randomNumber', function(req, res){
  var undecided=randomNumber(1,100);
  res.write('our random number generator is working, and has returned: '+ undecided);
  res.end();
});

app.get('/getAnimals', function(req, res){
  console.log("received request for getAnimals");
  results = [];
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT animal_name, animal_count FROM zoo_table;');
    query.on('row', function(row){
      results.push(row);
    });//end row
    //close connection
    query.on('end', function(){
      done();
      return res.json(results);
    });
    if(err){
      console.log(err);
    }//end error
  }); //end connect
}); //end get Animals

app.listen(3000, 'localhost', function(req, res){
  console.log('server is now listening at port 3000');
});
