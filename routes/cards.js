const express = require('express')

module.exports = (db) => {
  const router = express.Router()

  router.post('/', (req, res) => {
    const {name, number, limit} = req.body

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

