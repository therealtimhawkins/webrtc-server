const express = require('express')
const router = express.Router()
const { remove, findIndex, get } = require('lodash')

const queuedHandshakes = []
const handshakeResponses = []

router.post('/', (req, res) => {
  const handshake = req.body

  const index = findIndex(queuedHandshakes, queuedHandshake => {
    return queuedHandshake.requestId === handshake.requestId
  })

  if (index < 0) {
    queuedHandshakes.push(handshake)
    res.status(200).send({ message: 'Handshake queued.' })
  } else {
    res.status(409).send({ message: 'Handshake already in the queue.' })
  }
})

router.post('/response', (req, res) => {
  const handshake = req.body

  const index = findIndex(handshakeResponses, handshakeResponse => {
    return handshakeResponse.responseId === handshake.responseId
  })

  if (index < 0) {
    handshakeResponses.push(handshake)
    res.status(200).send({ message: 'Handshake response added.' })
  } else {
    res
      .status(409)
      .send({ message: 'Handshake response already in the queue.' })
  }
})

router.get('/queued/:id', (req, res) => {
  const handshake = queuedHandshakes.pop()
  const handshakeId = get(handshake, 'requestId')
  if (handshakeId !== req.params.id) {
    res.status(200).send(handshake)
  } else {
    queuedHandshakes.unshift(handshake)
    res.status(200).send({})
  }
})

router.delete('/delete', (req, res) => {
  const result = remove(queuedHandshakes, handshake => {
    return handshake === req.body.handshake
  })
})

module.exports = {
  router,
  queuedHandshakes
}
