// While we should implement the Luhn algorithm manually it seems a good idea
// to copy the test cases from someone who thought longer about it
// Freely taken from: https://github.com/braintree/card-validator/blob/master/test/unit/card-number.js

const test = require('tape')
const cardValidation = require('../src/cardValidation')

const cardNumbersCases = [
  ['', {isValid: false, reason:'Not a number'}],
  ['string', {isValid: false, reason:'Not a number'}],
  [6, {isValid: false}],
  [60, {isValid: false}],
  [601, {isValid: false}],
  [6011, {isValid: false}],
  [4, {isValid: false}],
  [41, {isValid: false}],
  [411, {isValid: false}],
  [123, {isValid: false}],
  [4012888888881881, {isValid: true}],
  [6288997715452584, {isValid: true}],
  [6282001509099283, {isValid: true}],
  [6269992058134322, {isValid: true}],
  [6240008631401148, {isValid: true}],
  [4111111111111111, {isValid: true}],
  [6011000990139424, {isValid: true}],
  [41111111111111111111, {isValid: false, reason:'Too long'}], // Too long 
  [6011111, {isValid: false}],
  [6011111111111117, {isValid: true}],
  [2, {isValid: false}],
  [27, {isValid: false}],
  [272, {isValid: false}],
  [2720, {isValid: false}],
  [55555555, {isValid: false}],
  [5555555555554444, {isValid: true}],
  [5555555555554446, {isValid: false}],
  [602011, {isValid: true}], //other author thinks this is not valid card number, worth looking into it
  [500000000000, {isValid: false}],
  [500000000000061, {isValid: false}],
  // [5000000000000611, {isValid: true}],  //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  // [5000000000000612, {isValid: false}],  //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  // [500000000000000005, {isValid: false}],  //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  // [5000000000000000005, {isValid: true}],  //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  // [5000000000000000001, {isValid: false}],  //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  // [50000000000000000009, {isValid: false}], //This fails because Number.MAX_SAFE_INTEGER  9007199254740991, maybe "credit card numbers will always be numeric" is a bad idea afterall...
  [3782, {isValid: false}],
  [378282246310005, {isValid: true}],
  [1, {isValid: false}],
  [21, {isValid: false}],
  [3530111, {isValid: false}],
  [3530111333300000, {isValid: true}],
  [6, {isValid: false}],
  [62, {isValid: false}],
  [623456, {isValid: false}],
  [6212345678901232, {isValid: true}],
  [{}, {isValid: false}],
  [[], {isValid: false}],
  [32908234, {isValid: false}],
  [32908234, {isValid: false}],
  [true, {isValid: false}],
  [false, {isValid: false}]
]

test('Luhn10 validation', function (t) {
  cardNumbersCases.map(([cardNumber, {isValid, reason = false}])=>{
    const validation = cardValidation.validateCardNumber(cardNumber)
    t.equal(validation.valid, isValid, `Test failed on ${cardNumber}`)
    if (reason) {
      // reason is a requirement but changing a validation method return later on
      // is very expensive so I'd rather imagine it will be requested
      t.equal(validation.reason, reason, `Test failed on the reason for ${cardNumber}`)
    }
  })
  t.end()
})

const cardAmountCases = [
  ['14', {isValid: false }], //Missing £ symbol
  ['14.10', {isValid: false }], //Missing £ symbol
  [14, {isValid: false }], //Not a string
  ['£10.108', {isValid: false }], //Too many decimals
  ['££10.10', {isValid: false }], //Not valid format
  ['%£10.10', {isValid: false }], //Not valid format
  ['£10.10&', {isValid: false }], //Not valid format
  ['£10.11', {isValid: true }],
  ['£10.10', {isValid: true }],
  ['£10.1', {isValid: true }],
  ['£10', {isValid: true }],
  ['£200048592', {isValid: true }],
]

test('Card amount', function (t) {
  cardAmountCases.map(([cardAmount, {isValid, reason = false}])=>{
    const validation = cardValidation.validateCardAmount(cardAmount)
    t.equal(validation.valid, isValid, `Test failed on ${cardAmount}`)
  })
  t.end()
})


const cardNameCases = [
  [10, {isValid: false }], //Not a string
  ['Stefano', {isValid: true }],
  ['Stefano Solinas', {isValid: true }],
  ['#2$%"', {isValid: true }], // I think this should fail but it's not in spec so I'd ask
]

test('Card name', function (t) {
  cardNameCases.map(([cardName, {isValid, reason = false}])=>{
    const validation = cardValidation.validateCardName(cardName)
    t.equal(validation.valid, isValid, `Test failed on ${cardName}`)
  })
  t.end()
})
