/**
 * @file The AlbertiCipher class.
 * @module src/AlbertiCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Cipher } from './Cipher'
/**
 * Class representing a Alberti cipher.
 */
export class AlbertiCipher extends Cipher {
  /**
   * First key.
   *
   * @type {integer}
   */
  #firstKey

  /**
   * Second key.
   *
   * @type {integer}
   */
  #secondKey

  /**
   * First cipher.
   *
   * @type {String}
   */
  #firstCipher

  /**
   * Second cipher.
   *
   * @type {String}
   */
  #secondCipher

  /**
   * Creates a Alberti cipher instance.
   *
   * @param {string} firstKey - The first key used for encryption and decryption.
   * @param {string} secondKey - The second key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(firstKey, secondKey, alphabet) {
    super(alphabet)
    this.#firstKey = firstKey
    this.#secondKey = secondKey
    this.#firstCipher = alphabet.getCipher(this.#firstKey)
    this.#secondCipher = alphabet.getCipher(this.#secondKey)
  }

  /**
   * Encrypts plaintext using the Vigenere cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this._saveCasing(plainText)
    plainText = plainText.toLowerCase()

    for (let i = 0; i < plainText.length; i++) {
      const letter = plainText.charAt(i)
      const index = this._alphabet.indexOf(letter)

      if (this._isLetter(index)) {
        this.#encryptLetter(i, index)
      } else {
        this._keepNonLetter(letter)
      }
    }
    return this._restoreCasing(this._encryptedPhrase)
  }

  /**
   * Decrypts encrypted text using the Vigenère cipher.
   *
   * @param {string} encryptedText - The text to decrypt.
   * @returns {string} The decrypted text.
   */
  decrypt(encryptedText) {
    this._saveCasing(encryptedText)
    encryptedText = encryptedText.toLowerCase()

    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText.charAt(i)
      const firstCipherIndex = this.#firstCipher.indexOf(letter)
      const secondCipherIndex = this.#secondCipher.indexOf(letter)

      if (this.#isEven(i)) {
        if (this._isLetter(firstCipherIndex)) {
          this._decryptLetter(firstCipherIndex)
        } else {
          this._decryptedPhrase += letter
        }
      } else {
        if (this._isLetter(secondCipherIndex)) {
          this._decryptLetter(secondCipherIndex)
        } else {
          this._decryptedPhrase += letter
        }
      }
    }
    return this._restoreCasing(this._decryptedPhrase)
  }

  /**
   * Adds a letter to the encrypted phrase.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  #encryptLetter(loopIndex, alphabetIndex) {
    if (this.#isEven(loopIndex)) {
      this.#addLetterFromFirstCipher(alphabetIndex)
    } else {
      this.#addLetterFromSecondCipher(alphabetIndex)
    }
  }

  /**
   * Adds a letter to the encrypted phrase from the first cipher.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  #addLetterFromFirstCipher(index) {
    this._encryptedPhrase += this.#firstCipher.charAt(index)
  }

  /**
   * Adds a letter to the encrypted phrase from the second cipher.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  #addLetterFromSecondCipher(index) {
    this._encryptedPhrase += this.#secondCipher.charAt(index)
  }

  /**
   * Checks if a number is even.
   *
   * @param {number} i - The number to check.
   * @returns {boolean} True if the number is even, false if not.
   */
  #isEven(i) {
    return i % 2 === 0
  }
}
