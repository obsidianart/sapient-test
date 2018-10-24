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
      t.equal(created.limit, '£10.01')

      t.end()
    })
})

test('POST /cards validate name', function (t) {
  const {app, DBspy} =  getRouteInstance()

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
  const {app, DBspy} =  getRouteInstance()

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
  const {app, DBspy} =  getRouteInstance()

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
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/charge/:name should not go over the limit', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/charge/:name should return card and balance', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/charge/:name accepts the format £10.02', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/charge/:name accepts the format £10', function (t) {
  t.fail('Not implemented')
  t.end()
})

// Behaviour not specified
test('PUT /cards/charge/:name for non existing name', function (t) {
  t.fail('Not implemented')
  t.end()
})



///////////////////////////////////PUT /cards/credit/:name

test('PUT /cards/credit/:name should decrease the balance', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/credit/:name should allow to go negative', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('PUT /cards/credit/:name should return card and balance', function (t) {
  t.fail('Not implemented')
  t.end()
})

// Behaviour not specified
test('PUT /cards/credit/:name for non existing name', function (t) {
  t.fail('Not implemented')
  t.end()
})

///////////////////////////////////GET /cards
test('GET /cards return an empty array at time 0', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('GET /cards return all the cards', function (t) {
  t.fail('Not implemented')
  t.end()
})
