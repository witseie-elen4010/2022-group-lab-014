/* eslint-env jest */
'use strict'

const code = require('../code.js')

describe('Game code generates a three digit number', () => {
  test('A three digit number is generated from a list of four numbers', () => {
    const num1 = code.gameCode(0)
    const num2 = code.gameCode(1)
    const num3 = code.gameCode(2)
    const num4 = code.gameCode(3)

    expect(num1).toBe(123)
    expect(num2).toBe(456)
    expect(num3).toBe(678)
    expect(num4).toBe(910)
  })
})
