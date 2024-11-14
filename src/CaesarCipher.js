/**
 * @file The CaesarCipher class.
 * @module src/CaesarCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Cipher } from './Cipher.js'

/**
 * Class representing a Caesar cipher.
 */
export class CaesarCipher extends Cipher {
  /**
   * Key.
   *
   * @type {integer}
   */
  #key

  /**
   * Cipher.
   *
   * @type {String}
   */
  #cipher

  /**
   * Creates a Caesar cipher instance.
   *
   * @param {string} key - The key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(key, alphabet) {
    super(alphabet)
    this.#key = key
    this.#cipher = alphabet.getCipher(this.#key)
  }

  /**
   * Encrypts plaintext using the Caesar cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this._saveCasing(plainText)

    plainText = plainText.toLowerCase()

    for (const char of plainText) {
      const index = this._alphabet.indexOf(char)
      if (this._isLetter(index)) {
        this.#encryptLetter(index)
      } else {
        this._keepNonLetter(char)
      }
    }
    return this._restoreCasing(this._encryptedPhrase)
  }

  /**
   * Decrypts encrypted text using the Caesar cipher.
   *
   * @param {string} encryptedText - The text to decrypt.
   * @returns {string} The decrypted text.
   */
  decrypt(encryptedText) {
    this._saveCasing(encryptedText)
    encryptedText = encryptedText.toLowerCase()

    for (const char of encryptedText) {
      const index = this.#cipher.indexOf(char)
      if (this._isLetter(index)) {
        this._decryptLetter(index)
      } else {
        this._decryptedPhrase += char
      }
    }
    return this._restoreCasing(this._decryptedPhrase)
  }

  /**
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  #encryptLetter(index) {
    this._encryptedPhrase += this.#cipher.charAt(index)
  }
}
