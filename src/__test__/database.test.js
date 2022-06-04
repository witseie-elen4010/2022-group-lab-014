/* eslint-env jest */
'use strict'
const request = require('supertest')
const express = require('express')
const router = require('../mockRoutes')

const app = express()
app.use('/', router)

const database = [
  {
    username: 'player1',
    games_played: 0,
    games_won: 0
  },
  {
    username: 'player2',
    games_played: 6,
    games_won: 4
  }
]

const checkPresent = (data, user) => data.filter(allData => allData.username === user).map(allData => allData)

describe('When Requests to /api/user ', () => {
  it('Result has a username variable', async () => {
    const answer = await request(app).get('/api/user')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    expect(answer.text.includes('username')).toBe(true)
  })

  it('Result has a games_played variable', async () => {
    const answer = await request(app).get('/api/user')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    expect(answer.text.includes('games_played')).toBe(true)
  })

  it('Result has a games_won variable', async () => {
    const answer = await request(app).get('/api/user')
    expect(answer.statusCode).toBe(200)
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8')
    expect(answer.text.includes('games_won')).toBe(true)
  })
})

describe('Database calls', () => {
  test('Database returns object that correlates to the requested name if it is present', () => {
    const name = 'player1'
    const fullUser = checkPresent(database, name)
    expect(fullUser[0].username).toBe(name)
    expect(fullUser[0].games_played).toBe(0)
    expect(fullUser[0].games_won).toBe(0)
  })

  test('Database creates a new object with a new username, zero games played and zero games won, if the name is not present', () => {
    const name = 'newPlayer'
    let fullUser = checkPresent(database, name)
    expect(fullUser[0]).toBe(undefined)
    const newUser = {
      username: name,
      games_played: 0,
      games_won: 0
    }
    database.push(newUser)
    fullUser = checkPresent(database, name)
    expect(fullUser[0].username).toBe(name)
    expect(fullUser[0].games_played).toBe(0)
    expect(fullUser[0].games_won).toBe(0)
    database.pop()
  })
})
