const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 1992

app.use(cors())
app.use(express.json())

const {
  router: handshake
} = require('./src/router/handshake.router')
app.use('/handshake', handshake)


server = app.listen(port, () => {
  console.log('Peer server running on port: ' + port)
})
