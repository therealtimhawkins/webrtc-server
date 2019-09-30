const request = require('supertest')
const app = require('../../src/app')

describe('POST /handshake', () => {
  test('should return 200 if handshake is queued correctly', done => {
    request(app)
      .post('/handshake')
      .send({
        id: 'testid',
        handshake: { message: 'testhandshake' }
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

describe('POST /handshake/response', () => {
  test('should return 200 if handshake response is queued correctly', done => {
    request(app)
      .post('/handshake/response')
      .send({
        id: 'testid',
        handshake: { message: 'testhandshake' },
        resopnseId: 'testResponseId',
        handshakeResponse: { message: 'testHandhakeResponse' }
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('It should return 409 if already in the queue', done => {
    request(app)
      .post('/handshake/response')
      .send({
        id: 'testid',
        handshake: { message: 'testhandshake' },
        resopnseId: 'testResponseId',
        handshakeResponse: { message: 'testHandhakeResponse' }
      })
      .then(response => {
        expect(response.statusCode).toBe(409)
        done()
      })
  })

  test('It should return 409 if already in the queue', done => {
    request(app)
      .post('/handshake')
      .send({
        id: 'testid',
        handshake: { message: 'testhandshake' }
      })
      .then(response => {
        expect(response.statusCode).toBe(409)
        done()
      })
  })
})

describe('GET /handshake/response', () => {
  test('It should return first queued handshake', done => {
    request(app)
      .get('/handshake/response')
      .send({
        id: 'testid'
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          id: 'testid',
          handshake: { message: 'testhandshake' }
        })
        done()
      })
  })
})

describe('GET /handshake/queued', () => {
  test('It should return first queued handshake', done => {
    request(app)
      .get('/handshake/queued')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          id: 'testid',
          handshake: { message: 'testhandshake' }
        })
        done()
      })
  })
})
