const express = require('express')
const validator = require('../src/cardValidation')

const amountToNumber = (amount)=>Number(amount.replace('£',''))
const numberToAmount = (num)=> `£${num.toFixed(2)}`

module.exports = (db) => {
  const router = express.Router()

  router.post('/', (req, res) => {
    const {name, number, limit} = req.body
    const isNameValid = validator.validateCardName(name).valid
    const isLimitValid = validator.validateCardAmount(limit).valid
    const isCardNumberValid = validator.validateCardNumber(number).valid

    if (!isNameValid) return res.status(412).send()
    if (!isLimitValid) return res.status(412).send()
    if (!isCardNumberValid) return res.status(412).send()

    db.insert({
      name,
      number,
      limit: amountToNumber(limit), //TODO: this is a classic virtual field in mongo, implement something similar in the ORM layer
      balance:0
    })

    res.status(200).send()
  })

  router.get('/', (req, res) => {
    const result = db.find({})
    
    // TODO: ? blacklist loki additional params ?
    res.status(200).send(result)
  })

  router.put('/charge/:name', (req, res) => {
    const {name} = req.params
    const {amount} = req.body

    const isNameValid = validator.validateCardName(name).valid
    const isAmountValid = validator.validateCardAmount(amount).valid
    
    if (!isNameValid) return res.status(412).send()
    if (!isAmountValid) return res.status(412).send()

    const user = db.findOne({
      name,
    })

    if (!user) return res.status(404).send()

    const amountNum = amountToNumber(amount)

    if (amountNum+user.balance > user.limit) return res.status(412).send()
    
    user.balance += amountNum

    db.update(user)

    res.status(200).send({
      balance: numberToAmount(user.balance),
      number: user.number,
    })
  })

  router.put('/credit/:name', (req, res) => {
    const {name} = req.params
    const {amount} = req.body

    const isNameValid = validator.validateCardName(name).valid
    const isAmountValid = validator.validateCardAmount(amount).valid
    
    if (!isNameValid) return res.status(412).send()
    if (!isAmountValid) return res.status(412).send()

    const user = db.findOne({
      name,
    })

    if (!user) return res.status(404).send()

    const amountNum = amountToNumber(amount)
    
    user.balance -= amountNum

    db.update(user)

    res.status(200).send({
      balance: numberToAmount(user.balance),
      number: user.number,
    })
  }) 

  return router
}

