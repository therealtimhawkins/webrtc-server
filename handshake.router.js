const express = require('express')
const router = express.Router()

const queuedHandshakes = []

router.post('/', (req, res) => {
  queuedHandshakes.push(JSON.parse(req.body.handshake))
  res.send('browser coin handshake!')
})

module.exports = {
  router,
  queuedHandshakes
}
