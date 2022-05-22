/* eslint-env jest */

const dict = require('../dictionary.js')

describe('Disctionary functions', () => {
  test('Todays word returns a five letter string', () => {
    const index = 2
    const word = dict.todayWord(index)
    expect(typeof (word)).toEqual('string')
    expect(word.length).toEqual(5)
  })

  test('A valid word is checked and returns true', () => {
    const valid = 'hello'
    expect(dict.validWord(valid)).toEqual(true)
  })

  test('An invalid word returns false', () => {
    const inValid = 'aaabb'
    expect(dict.validWord(inValid)).toEqual(false)
  })

  test('Words are case insensitive', () => {
    const caps = 'HELLO'
    const lower = 'hello'
    const mixed = 'HeLlO'
    expect(dict.validWord(caps)).toEqual(true)
    expect(dict.validWord(lower)).toEqual(true)
    expect(dict.validWord(mixed)).toEqual(true)
  })
})
