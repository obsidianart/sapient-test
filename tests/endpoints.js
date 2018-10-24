const test = require('tape')
const request = require('supertest')

const {app, server} = require('../index.js')

// This is to avoid the server to keep listening.
// We can alternatevely change the code to not start the server during testing
server.close() 



///////////////////////////////////POST /cards

test('POST /cards create a new credit card with 0 credit', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('POST /cards validate name', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('POST /cards validate card number', function (t) {
  t.fail('Not implemented')
  t.end()
})

test('POST /cards validate limit', function (t) {
  t.fail('Not implemented')
  t.end()
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
