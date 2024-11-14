/**
 * @file The Cipher parent class.
 * @module src/Cipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class Cipher {
  /**
   * Casing.
   *
   * @type {Array}
   */
  #casing

  constructor(alphabet) {
    this._alphabet = alphabet.getAlphabet()
    this._encryptedPhrase = ''
    this._decryptedPhrase = ''
    this.#casing = []
  }

  /**
   * Saves the casing of each character for restoration later.
   *
   * @param {string} text - The text whose casing is to be saved.
   */
  _saveCasing(text) {
    for (const char of text)
      if (this.#isUpperCase(char)) {
        this.#casing.push(true)
      } else {
        this.#casing.push(false)
      }
  }

  /**
   * Restores the original casing of the text based on the saved casing information.
   *
   * @param {string} text - The text whose casing is to be restored.
   * @returns {string} The text with restored casing.
   */
  _restoreCasing(text) {
    let updatedPhrase = ''
    for (let i = 0; i < this.#casing.length; i++) {
      if (this.#casing[i] === true) {
        updatedPhrase += text.charAt(i).toUpperCase()
      } else {
        updatedPhrase += text.charAt(i)
      }
    }
    return updatedPhrase
  }

  /**
   * Checks if index represents a letter in the alphabet.
   *
   * @param {number} index - The index to check.
   * @returns {boolean} True if index is valid, false if it's not.
   */
  _isLetter(index) {
    return index !== -1
  }

  /**
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  _keepNonLetter(nonLetter) {
    this._encryptedPhrase += nonLetter
  }

  /**
   * Adds a decrypted letter to the decrypted phrase.
   *
   * @param {number} cipherIndex - The index of the letter in the cipher table.
   */
  _decryptLetter(index) {
    this._decryptedPhrase += this._alphabet.charAt(index)
  }

  /**
   * Checks if character is an uppercase letter.
   *
   * @param {string} char - The character to check.
   * @returns {boolean} True if the character is uppercase, false if not.
   */
  #isUpperCase(char) {
    return /\p{L}/u.test(char) && char === char.toUpperCase()
  }

  encrypt(plainText) {}

  decrypt(encryptedText) {}
}
