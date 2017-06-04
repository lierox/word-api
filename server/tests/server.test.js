const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Word} = require('./../models/word');

beforeEach((done) => {
  Word.remove({}).then((res) => done());
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

      Word.find().then((words) => {
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
        expect(words.length).toBe(0);
        done();
      }).catch((error) => done(error));
    });
  });
});
