const express = require('express')
const router = express.Router()

const queuedHandshakes = []

router.post('/', (req, res) => {
  const handshake = req.body.handshake
  const alreadyQueued = queuedHandshakes.includes(handshake)
  if (!alreadyQueued) {
    queuedHandshakes.push(req.body.handshake)
    res.send(200, 'Handshake queued.')
  }
  res.send(409, 'Handshake already in the queue.')
})

router.get('/requested', (req, res) => {
  res.send(queuedHandshakes)
})

module.exports = {
  router,
  queuedHandshakes
}
