const test = require('tape')
const request = require('supertest')

const {app, server} = require('../index.js')

// This is to avoid the server to keep listening.
// We can alternatevely change the code to not start the server during testing
server.close() 


// Full round integration
test('Create a user, credit, charge it, get it', function (t) {
    // request(app)
  //   .get('/cards')
  //   .expect(200)
  //   .expect('Content-Type', /json/)
  //   .end((err, res)=>{
  //       t.equal(res.body,[])
  //       t.error(err, 'No error')
  //       t.end()
  //   })
  t.fail('Not implemented')
  t.end()
})