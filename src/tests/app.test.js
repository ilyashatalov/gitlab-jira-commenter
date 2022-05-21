const request = require('supertest');

var app = require('../app').app;
body_json = require('./example-request.json')

it('send merge request', function (done) {
  this.timeout(5000);
  request(app).post('/')
              .set('x-gitlab-event', 'Merge Request Hook')
              .set('x-gitlab-token', 'asdasqqw41w1faw')
              .send(body_json)
              .expect({ "response": {"status": 200, 
                                     "result": "success"}})
              .expect(200)
              .end(done);
});