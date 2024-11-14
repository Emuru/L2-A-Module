/**
 * @file The VigenereCipher class.
 * @module src/VigenereCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Cipher } from './Cipher'

/**
 * Class representing a Vigenère cipher.
 */
export class VigenereCipher extends Cipher {
  /**
   * Key.
   *
   * @type {object}
   */
  #alphabet

  /**
   * Key.
   *
   * @type {integer}
   */
  #key

  /**
   * Key line.
   *
   * @type {Array}
   */
  #keyLine

  /**
   * Cipher table.
   *
   * @type {Array}
   */
  #cipherTable

  /**
   * Creates a Vigenère cipher instance.
   *
   * @param {string} key - The key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(key, alphabet) {
    super(alphabet)
    this.#alphabet = alphabet
    this.cipherLine = alphabet
    this.#cipherTable = []
    this.#key = key
    this.#keyLine = []
  }

  /**
   * Encrypts plaintext using the Vigenere cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this._saveCasing(plainText)
    this.#createVigenereTableAndKeyLine()
    plainText = plainText.toLowerCase()

    for (let i = 0; i < plainText.length; i++) {
      const letter = plainText.charAt(i)
      const keyLetter = this.#keyLine[i]
      const column = this.#cipherTable[0].indexOf(letter)
      const row = this.#cipherTable[0].indexOf(keyLetter)

      if (this._isLetter(column)) {
        for (const row of this.#cipherTable) {
          if (row[0] === keyLetter) {
            this.#encryptLetter(row[column])
          }
        }
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
    this.#createVigenereTableAndKeyLine()
    encryptedText = encryptedText.toLowerCase()

    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText.charAt(i)
      const keyLetter = this.#keyLine[i]
      const column = this.#cipherTable[0].indexOf(letter)
      const row = this.#cipherTable[0].indexOf(keyLetter)

      if (this._isLetter(column)) {
        this._decryptLetter(this.#cipherTable[row].indexOf(letter))
      } else {
        this._decryptedPhrase += letter
      }
    }
    return this._restoreCasing(this._decryptedPhrase)
  }

  /**
   * Adds a letter to the encrypted phrase.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  #encryptLetter(index) {
    this._encryptedPhrase += index
  }

  /**
   * Creates the Vigenère cipher table and the key line used for encryption and decryption.
   *
   * @returns {Array<string>} The cipher table.
   */
  #createVigenereTableAndKeyLine() {
    for (let i = 0; i < this._alphabet.length; i++) {
      this.#addLineToTable(i)
      this.#createKeyLine(i)
    }
    return this.#cipherTable
  }

  /**
   * Creates the key line by repeating the key to match the length of the text.
   *
   * @param {number} index - The current index in the iteration.
   */
  #createKeyLine(index) {
    this.#keyLine.push(this.#key[index % this.#key.length])
  }

  /**
   * Adds a line to the cipher table based on the given index.
   *
   * @param {number} index - The index used to generate the cipher line.
   */
  #addLineToTable(index) {
    this.#cipherTable.push(this.#alphabet.getCipher(index))
  }
}
