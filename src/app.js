const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const { router: handshake } = require('./router/handshake.router')
app.use('/handshake', handshake)

module.exports = app
