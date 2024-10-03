import { Alphabet } from '../src/Alphabet.js'
import { AlbertiCipher } from '../src/AlbertiCipher.js'

describe('AlbertiCipher', () => {
  let cipher
  let alphabet

  beforeEach(() => {
    alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
    cipher = new AlbertiCipher(2, 5, alphabet)
  })

  test('correct encryption', () => {
    const plaintext = 'det inledande testet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('fjv ksnjffpig vjuygy')
  })

  test('correct decryption', () => {
    const ciphertext = 'fjv wurkbqlfpig vjuygy'
    const decrypted = cipher.decrypt(ciphertext)
    expect(decrypted).toBe('det uppföljande testet')
  })

  test('correct handling of non-letter characters', () => {
    const plaintext = 'Det... tredje testet!'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('Fjv... ytjfog vjuygy!')
  })

  test('correct case handling', () => {
    const plaintext = 'DeT fJÄrde tESTet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('FjV hOAwfj yGXVjv')
  })

  test('correct isUpperCase identification', () => {
    expect(cipher.isUpperCase('A')).toBe(true)
    expect(cipher.isUpperCase('H')).toBe(true)
    expect(cipher.isUpperCase('b')).toBe(false)
    expect(cipher.isUpperCase('p')).toBe(false)
    expect(cipher.isUpperCase('3')).toBe(false)
    expect(cipher.isUpperCase(' ')).toBe(false)
  })
})
