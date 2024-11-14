import { Alphabet } from '../src/Alphabet.js'
import { VigenereCipher } from '../src/VigenereCipher.js'

describe('VigenereCipher', () => {
  let cipher
  let alphabet

  beforeEach(() => {
    alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
    cipher = new VigenereCipher('vitlök', alphabet)
  })

  test('correct encryption', () => {
    const plaintext = 'det inledande testet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('ymj hxdmwlmnz jprazä')
  })

  test('correct decryption', () => {
    const ciphertext = 'ymj tzhnswikflx sokäxb'
    const decrypted = cipher.decrypt(ciphertext)
    expect(decrypted).toBe('det uppföljande testet')
  })

  test('correct handling of non-letter characters', () => {
    const plaintext = 'Det... tredje testet!'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('Ymj... ähpctz jprazä!')
  })

  test('correct case handling', () => {
    const plaintext = 'DeT fJÄrde tESTet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('YmJ eTTzwp aZÅJps')
  })
})
