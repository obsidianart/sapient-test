const test = require('tape')
const request = require('supertest')
const loki = require('lokijs')
const express = require('express')
const cardRoute = require('../routes/cards.js')
const bodyParser = require('body-parser')
const sinon = require('sinon')

const getRouteInstance = ()=> {
  const DB = new loki()
  const cardDB = DB.addCollection('cards')
  const app = express()
  app.use(bodyParser.json()) //TODO: move this to a config file for the app
  app.use('/',cardRoute(cardDB))
  return {app, cardDB}
}

createStefanoOnDb = (db)=>{
  db.insert({
    name:'Stefano',
    number:4012888888881881,
    limit: 5000,
    balance: 1000
  })
}

///////////////////////////////////POST /cards

test('POST /cards create a new credit card with 0 credit', function (t) {
  const {app, cardDB} =  getRouteInstance()

  request(app)
    .post('/')
    .send({
      name:'Stefano',
      number: 4012888888881881,
      limit: '£10.01'
    })
    .expect(200)
    .end((err, res)=>{
      t.deepEqual(res.body,{})
      t.error(err, 'No error')

      const created = cardDB.get(1)
      t.equal(created.name, 'Stefano')
      t.equal(created.number, 4012888888881881)
      t.equal(created.limit, 10.01)
      t.equal(created.balance, 0)

      t.end()
    })
})

test('POST /cards validate name', function (t) {
  const {app} =  getRouteInstance()

  request(app)
    .post('/')
    .send({
      name: 11,
      number: 4012888888881881,
      limit: "£10.01"
    })
    .expect(412)
    .end((err, res)=>{
      t.error(err, 'No error')
      t.end()
    })
})

test('POST /cards validate card number', function (t) {
  const {app} =  getRouteInstance()

  request(app)
    .post('/')
    .send({
      name:'Stefano',
      number: '4012888888881881',
      limit: "£10.01"
    })
    .expect(412)
    .end((err, res)=>{
      t.error(err, 'No error')
      t.end()
    })
})

test('POST /cards validate limit', function (t) {
  const {app} =  getRouteInstance()

  request(app)
    .post('/')
    .send({
      name:'Stefano',
      number: 4012888888881881,
      limit: 10.01
    })
    .expect(412)
    .end((err, res)=>{
      t.error(err, 'No error')
      t.end()
    })
})

// Not in the requirement but seems likely, behaviour should be clarified
// test('POST /cards does not allow duplicate names', function (t) {})

// Not in the requirement but seems likely, behaviour should be clarified
// test('POST /cards does not allow duplicate card number', function (t) {})


///////////////////////////////////PUT /cards/charge/:name

test('PUT /cards/charge/:name increase the balance', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/charge/Stefano')
    .send({
      amount: '£10'
    })
    .expect(200)
    .end((err, res)=>{
      t.deepEqual(res.body,{
        number: 4012888888881881,
        balance: '£1010.00'
      })
      t.error(err, 'No error')

      const updated = cardDB.get(1)
      t.equal(updated.balance, 1010)

      t.end()
    })
})

test('PUT /cards/charge/:name should not go over the limit', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/charge/Stefano')
    .send({
      amount: '£4001'
    })
    .expect(412)
    .end((err, res)=>{
      t.error(err, 'No error')

      const updated = cardDB.get(1)
      t.equal(updated.balance, 1000)

      t.end()
    })
})

// Tested by case 1
// test('PUT /cards/charge/:name should return card and balance', function (t) {
//   t.fail('Not implemented')
//   t.end()
// })

test('PUT /cards/charge/:name accepts the format £10.02', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/charge/Stefano')
    .send({
      amount: '£4001.10'
    })
    .expect(412)
    .end((err, res)=>{
      t.error(err, 'No error')

      const updated = cardDB.get(1)
      t.equal(updated.balance, 1000)

      t.end()
    })
})

// Tested by case 1
// test('PUT /cards/charge/:name accepts the format £10', function (t) {
//   t.fail('Not implemented')
//   t.end()
// })

// Behaviour not specified
test('PUT /cards/charge/:name for non existing name', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/charge/Mark')
    .send({
      amount: '£4001.10'
    })
    .expect(404)
    .end((err, res)=>{
      t.error(err, 'No error')
      t.end()
    })
})



///////////////////////////////////PUT /cards/credit/:name

test('PUT /cards/credit/:name should decrease the balance', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/credit/Stefano')
    .send({
      amount: '£10'
    })
    .expect(200)
    .end((err, res)=>{
      t.deepEqual(res.body,{
        number: 4012888888881881,
        balance: '£990.00'
      })
      t.error(err, 'No error')

      const updated = cardDB.get(1)
      t.equal(updated.balance, 990)

      t.end()
    })
})

test('PUT /cards/credit/:name should allow to go negative', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/credit/Stefano')
    .send({
      amount: '£10000'
    })
    .expect(200)
    .end((err, res)=>{
      t.deepEqual(res.body,{
        number: 4012888888881881,
        balance: '£-9000.00' //TODO: should it be -£9000 ?
      })
      t.error(err, 'No error')

      const updated = cardDB.get(1)
      t.equal(updated.balance, -9000)

      t.end()
    })
})

// Tested on case 1
// test('PUT /cards/credit/:name should return card and balance', function (t) {
//   t.fail('Not implemented')
//   t.end()
// })

// Behaviour not specified
test('PUT /cards/credit/:name for non existing name', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .put('/credit/Mark')
    .send({
      amount: '£10'
    })
    .expect(404)
    .end((err, res)=>{
      t.error(err, 'No error')
      t.end()
    })
})

///////////////////////////////////GET /cards
test('GET /cards return an empty array at time 0', function (t) {
  const {app, cardDB} =  getRouteInstance()

  request(app)
    .get('/')
    .expect(200)
    .end((err, res)=>{
      t.equal(res.body.length, 0)

      t.error(err, 'No error')
      t.end()
    })
})

test('GET /cards return all the cards', function (t) {
  const {app, cardDB} =  getRouteInstance()
  createStefanoOnDb(cardDB)

  request(app)
    .get('/')
    .expect(200)
    .end((err, res)=>{
      t.equal(res.body.length, 1)

      const stefano = res.body[0]
      t.equal(stefano.balance, '£1000.00')
      t.equal(stefano.limit, '£5000.00')

      t.error(err, 'No error')
      t.end()
    })
})
