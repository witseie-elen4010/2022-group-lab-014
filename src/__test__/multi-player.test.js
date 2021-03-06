/* eslint-env jest */
'use strict'
const request = require('supertest')
const express = require('express')
const router = require('../mockRoutes')
const app = express()
app.use('/', router)

describe('When Requests to multiplayer api\'s ', () => {
  it('api/Codes returns a room number with 3 digits', async () => {
    const answer = await request(app).get('/api/Codes')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    // length will be 5 as the string includes the square brackets
    expect(answer.text.length).toBe(5)
  })

  it('api/Mode returns the game mode being played. \'x\' if no game mode has been selected yet', async () => {
    const answer = await request(app).get('/api/Mode')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    // length will be 5 as the string includes the inverted commas
    expect(answer.text.length).toBe(5)
    // No game mode has been chosen, x will be returned
    expect(answer.text.includes('x')).toBe(true)
  })

  it('api/multiUsers returns an array', async () => {
    const answer = await request(app).get('/api/multiUsers')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    // No users have logged in, therefore the array will be empty and only
    // have the square brackets
    expect(answer.text.length).toBe(2)
  })

  it('api/fetchGuessWord returns an array', async () => {
    const answer = await request(app).get('/api/multiUsers')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    // A 5 letter word is sent. The length of this is 7 as it includes
    // inverted commas
    // It is initially, however, an empty string and will therefore have 
    // a length of 2
    expect(answer.text.length).toBe(2)
  })

  it('api/sendColour1 returns an array', async () => {
    const answer = await request(app).get('/api/sendColour1')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('application/json; charset=utf-8')
    // An array with 30 items of 'opp2Grid-item' on initial load 
    expect(answer.body.length).toBe(30)
    expect(answer.body.filter((v) => (v === 'opp2Grid-item')).length).toBe(30)
  })

  it('api/sendColour2 returns an array', async () => {
    const answer = await request(app).get('/api/sendColour2')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('application/json; charset=utf-8')
    // An array with 30 items of 'opp2Grid-item' on initial load
    expect(answer.body.length).toBe(30)
    expect(answer.body.filter((v) => (v === 'opp2Grid-item')).length).toBe(30)
  })
})
