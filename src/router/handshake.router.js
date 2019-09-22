const express = require('express')
const router = express.Router()
const {
  remove,
  findIndex
} = require('lodash')

const queuedHandshakes = []

router.post('/', (req, res) => {
  const {
    handshake
  } = req.body
  const alreadyQueued = queuedHandshakes.includes(handshake)
  if (!alreadyQueued) {
    queuedHandshakes.push({
      handshake: req.body.handshake,
      handshakeResponse: null
    })
    res.status(200).send('Handshake queued.')
  } else {
    res.status(409).send('Handshake already in the queue.')
  }
})

router.post('/response', (req, res) => {
  const {
    handshake,
    handshakeResponse
  } = req.body
  const index = findIndex(queuedHandshakes, {
    handshake
  })
  if (!queuedHandshakes[0].handshakeResponse) {
    queuedHandshakes.splice(index, 1, {
      handshake,
      handshakeResponse
    })
  }
  console.log(queuedHandshakes)
  res.send('Handshake response')
})

router.get('/requested', (req, res) => {
  res.send(queuedHandshakes)
})

router.delete('/delete', (req, res) => {
  const result = remove(queuedHandshakes, (handshake) => {
    return handshake = req.body.handshake
  })
})

module.exports = {
  router,
  queuedHandshakes
}
