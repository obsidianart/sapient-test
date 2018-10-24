const test = require('tape')
const request = require('supertest')

const {app, server} = require('../index.js')

// This is to avoid the server to keep listening.
// We can alternatevely change the code to not start the server during testing
server.close() 


// Full round integration
test('Create a user, credit, charge it, get it', function (t) {
  //No user at the beginning
  request(app)
    .get('/cards')
    .expect(200)
    .then((res)=>{
      t.equal(res.body.length, 0)
    })
    .catch(err=>t.error(err, 'No error'))
    .then(()=>(
      //Create a user
      request(app)
        .post('/cards')
        .send({
          name:'Stefano',
          number: 4012888888881881,
          limit: '£1000'
        })
        .expect(200)
        .then((res)=>{
          t.deepEqual(res.body,{})
        })
        .catch(err=>t.error(err, 'No error'))
    ))
    .then(()=>(
      //Charge him 10 pounds
      request(app)
        .put('/cards/charge/Stefano')
        .send({
          amount: '£10'
        })
        .expect(200)
        .catch(err=>t.error(err, 'No error'))
    ))
    .then(()=>(
      //Charge him 3 pounds
      request(app)
        .put('/cards/credit/Stefano')
        .send({
          amount: '£3'
        })
        .expect(200)
        .catch(err=>t.error(err, 'No error'))
    ))
    .then(()=>(
    //Get all users and check
    request(app)
      .get('/cards')
      .expect(200)
      .then((res)=>{
        t.equal(res.body.length, 1)
        const stefano = res.body[0]
        t.equal(stefano.balance, '£7.00')
        t.equal(stefano.limit, '£1000.00')
      })
      .catch(err=>t.error(err, 'No error'))
    ))
  t.end()
})