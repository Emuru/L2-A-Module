import { Alphabet } from '../src/Alphabet.js'

describe('Alphabet', () => {
  let alphabet

  beforeEach(() => {
    alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
  })

  test('return lower case alphabet', () => {
    expect(alphabet.getAlphabet()).toBe('abcdefghijklmnopqrstuvwxyzåäö')
  })

  test('return correct shifted cipher', () => {
    expect(alphabet.getCipher(3)).toBe('defghijklmnopqrstuvwxyzåäöabc')
  })
})
