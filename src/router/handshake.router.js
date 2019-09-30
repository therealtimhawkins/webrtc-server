const express = require('express')
const router = express.Router()
const { remove, findIndex } = require('lodash')

const queuedHandshakes = []
const handshakeResponses = []

router.post('/', (req, res) => {
  const handshake = req.body

  const index = findIndex(queuedHandshakes, queuedHandshake => {
    return queuedHandshake.id === handshake.id
  })

  if (index < 0) {
    queuedHandshakes.push(handshake)
    res.status(200).send('Handshake queued.')
  } else {
    res.status(409).send('Handshake already in the queue.')
  }
})

router.post('/response', (req, res) => {
  const handshake = req.body

  const index = findIndex(handshakeResponses, handshakeResponse => {
    return handshakeResponse.responseId === handshake.responseId
  })

  if (index < 0) {
    handshakeResponses.push(handshake)
    res.status(200).send('Handshake response added.')
  } else {
    res.status(409).send('Handshake response already in the queue.')
  }
})

router.get('/response', (req, res) => {
  const index = findIndex(handshakeResponses, handshake => {
    return handshake.id === req.body.id
  })
  res.send(handshakeResponses[index])
})

router.get('/queued', (req, res) => {
  res.send(queuedHandshakes.pop())
})

router.delete('/delete', (req, res) => {
  const result = remove(queuedHandshakes, handshake => {
    return (handshake = req.body.handshake)
  })
})

module.exports = {
  router,
  queuedHandshakes
}
