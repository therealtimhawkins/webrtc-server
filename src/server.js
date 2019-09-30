const app = require('./app')
const port = process.env.PORT || 1992

server = app.listen(port, () => {
  console.log('Peer server running on port: ' + port)
})

module.exports = app
