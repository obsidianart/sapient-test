const express = require('express')
const validator = require('../src/cardValidation')

module.exports = (db) => {
  const router = express.Router()

  router.post('/', (req, res) => {
    const {name, number, limit} = req.body
    const isNameValid = validator.validateCardName(name).isValid
    const isLimitValid = validator.validateCardAmount(limit).isValid
    const isCardNumberValid = validator.validateCardNumber(number).isValid

    if (!isNameValid) return res.status(412).send()
    if (!isLimitValid) return res.status(412).send()
    if (!isCardNumberValid) return res.status(412).send()

    db.insert({
      name,
      number,
      limit,
      credit:0
    })

    res.status(200).send()
  })

  router.get('/', (req, res) => {
    res.status(501).send()
  })

  router.put('/charge/:name', (req, res) => {
    res.status(501).send()
  })

  router.put('/credit/:name', (req, res) => {
    res.status(501).send()
  }) 

  return router
}

