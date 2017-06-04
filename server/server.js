var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Word} = require('./models/word');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/words', (req, res) => {
  var word = new Word({
    name: req.body.name
  });

  word.save().then( (result) => {
    console.log(result);
    res.send(result);
  },(error) => {
    console.log(error);
    res.status(400).send(error);
  });
});

app.listen(3000, () => {
  console.log('Server On');
});
