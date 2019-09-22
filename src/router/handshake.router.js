const express = require('express')
const router = express.Router()

const queuedHandshakes = []

router.post('/', (req, res) => {
  queuedHandshakes.push(JSON.parse(req.body.handshake))
  res.send('browser coin handshake!')
})

router.get('/requested', (req, res) => {
  res.send(queuedHandshakes)
})

module.exports = {
  router,
  queuedHandshakes
}
