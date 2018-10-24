const express = require('express')
router = express.Router()

router.post('/', (req, res) => {
  res.status(501).send()
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

module.exports = router