/* eslint-env jest */

const db = require('../db.js')

describe('Database communication', () => {
  test('A user is returned from the database if they exist', () => {
    const name = 'jason'
    db.pools
      .then((pool) => {
        return pool.request()
          .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
            if (err) throw err
            expect(result.recordset[0].username).toEqual(name)
          })
      })
  })

  test('If a user does not exist, their profile is created with the correct username', () => {
    const name = 'jason123'
    db.pools
      .then((pool) => {
        return pool.request()
          .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
            if (err) throw err
            if (result.recordset.length === 0) {
              pool.query("INSERT INTO [dbo].[Users] (username, games_played, games_won) VALUES ('" + name + "', 0, 0)", function (err, result) {
                if (err) throw err
                pool.query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
                  if (err) throw err
                  expect(result.recordset[0].username).toEqual(name)
                  // Delete the user afterwards so they do not exist in the database
                  pool.query("DELETE FROM [dbo].[Users] WHERE username='" + name + "'")
                })
              })
            }
          })
      })
  })

  test('If a user does not exist, their profile is created with no games played', () => {
    const name = 'jason123'
    db.pools
      .then((pool) => {
        return pool.request()
          .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
            if (err) throw err
            if (result.recordset.length === 0) {
              pool.query("INSERT INTO [dbo].[Users] (username, games_played, games_won) VALUES ('" + name + "', 0, 0)", function (err, result) {
                if (err) throw err
                pool.query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
                  if (err) throw err
                  expect(result.recordset[0].games_played).toEqual(0)
                  // Delete the user afterwards so they do not exist in the database
                  pool.query("DELETE FROM [dbo].[Users] WHERE username='" + name + "'")
                })
              })
            }
          })
      })
  })

  test('If a user does not exist, their profile is created with no games won', () => {
    const name = 'jason123'
    db.pools
      .then((pool) => {
        return pool.request()
          .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
            if (err) throw err
            if (result.recordset.length === 0) {
              pool.query("INSERT INTO [dbo].[Users] (username, games_played, games_won) VALUES ('" + name + "', 0, 0)", function (err, result) {
                if (err) throw err
                pool.query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
                  if (err) throw err
                  expect(result.recordset[0].games_won).toEqual(0)
                  // Delete the user afterwards so they do not exist in the database
                  pool.query("DELETE FROM [dbo].[Users] WHERE username='" + name + "'")
                })
              })
            }
          })
      })
  })
})
