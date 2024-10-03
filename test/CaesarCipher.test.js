import { Alphabet } from '../src/Alphabet.js'
import { CaesarCipher } from '../src/CaesarCipher.js'

describe('CaesarCipher', () => {
  let cipher
  let alphabet

  beforeEach(() => {
    alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
    cipher = new CaesarCipher(5, alphabet)
  })

  test('correct encryption', () => {
    const plaintext = 'det inledande testet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('ijy nsqjifsij yjxyjy')
  })

  test('correct decryption', () => {
    const ciphertext = 'ijy zuukeqofsij yjxyjy'
    const decrypted = cipher.decrypt(ciphertext)
    expect(decrypted).toBe('det uppföljande testet')
  })

  test('correct handling of non-letter characters', () => {
    const plaintext = 'Det... tredje testet!'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('Ijy... ywjioj yjxyjy!')
  })

  test('correct case handling', () => {
    const plaintext = 'DeT fJÄrde tESTet'
    const encrypted = cipher.encrypt(plaintext)
    expect(encrypted).toBe('IjY kODwij yJXYjy')
  })
})
