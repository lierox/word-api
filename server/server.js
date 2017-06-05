var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Word} = require('./models/word');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

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

app.get('/words', (req, res) => {
  Word.find().then( (result)=> {
    res.send({result})
  }, (error) => {
    console.log(error);
    res.status(400).send(error);
  });
});

app.get('/words/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    console.log('invalid id');
    return res.status(404).send();
  }

  Word.findById(id).then((result) => {
    if(!result){
      return res.status(404).send();
    }
    res.status(200).send({result});
  }).catch(() => {
    res.status(400).send()
  });
});

app.listen(port, () => {
  console.log('Server On');
});

module.exports = {app};
