const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const loki = require('lokijs')

const DB = new loki()

// Doing it here to remove the responsability over the DB implementation from cards
// Later on, probably the entire database concept should be moved
const cardDB = DB.addCollection('cards')

const cards = require('./routes/cards')(cardDB)

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

const auth = (req, res, next) => next()

app.use('/cards', auth, cards)

//Let's use a different port so we will not ending up in a code test router every time we are actually working
const server = app.listen(3123, () => console.log('Credit card API listening on port 3123!'))

module.exports = {app, server}