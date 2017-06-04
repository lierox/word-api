const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Word} = require('./../models/word');

const words = [{
    name: "word1"
  },{
    name: "word2"
  }];

beforeEach((done) => {
  Word.remove({}).then(() =>{
    return Word.insertMany(words);
  }).then(() => done());
});

describe('post word', () => {
  it('inserts new word and returns inserted word', (done) => {
    var name = 'WordTested';
    request(app)
    .post('/words')
    .send({name})
    .expect(200)
    .expect((res) => {
      expect(res.body.name).toBe(name);
    })
    .end((error, res) => {
      if(error){
        return done(error);
      }

      Word.find({name}).then((words) => {
        expect(words.length).toBe(1);
        expect(words[0].name).toBe(name);
        done();
      }).catch( (error) => done(error));
    });
  });

  it('insertion fails for invalid data', (done) => {
    request(app)
    .post('/words')
    .send({})
    .expect(400)
    .end((error, res) => {
      if(error){
        return done(error);
      }
      Word.find().then((words) => {
        expect(words.length).toBe(2);
        done();
      }).catch((error) => done(error));
    });
  });

  it('get all words', (done) => {
    request(app)
    .get('/words')
    .expect(200)
    .expect((res) => {
      expect(res.body.result.length).toBe(2);
    })
    .end(done);
  });

});
