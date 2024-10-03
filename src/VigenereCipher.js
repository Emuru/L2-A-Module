/**
 * @file The VigenereCipher class.
 * @module src/VigenereCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

/**
 * Class representing a Vigenère cipher.
 */
export class VigenereCipher {
  /**
   * Key.
   *
   * @type {integer}
   */
  #key

  /**
   * Alphabet.
   *
   * @type {Object}
   */
  #a

  /**
   * Alphabet.
   *
   * @type {String}
   */
  #alphabet

  /**
   * Casing.
   *
   * @type {Array}
   */
  #casing

  /**
   * Cipher table.
   *
   * @type {Array}
   */
  #cipherTable

  /**
   * Key line.
   *
   * @type {Array}
   */
  #keyLine

  /**
   * Encrypted phrase.
   *
   * @type {String}
   */
  #encryptedPhrase

  /**
   * Decrypted phrase.
   *
   * @type {String}
   */
  #decryptedPhrase

  /**
   * Creates a Vigenère cipher instance.
   *
   * @param {string} key - The key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(key, alphabet) {
    this.#key = key
    this.#a = alphabet
    this.#alphabet = this.#a.getAlphabet()
    this.#casing = []
    this.#cipherTable = []
    this.#keyLine = []
    this.#encryptedPhrase = ''
    this.#decryptedPhrase = ''
  }

  /**
   * Encrypts plaintext using the Vigenere cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this.#saveCasing(plainText)
    this.#createVigenereTableAndKeyLine()
    plainText = plainText.toLowerCase()

    for (let i = 0; i < plainText.length; i++) {
      const letter = plainText.charAt(i)
      const keyLetter = this.#keyLine[i]
      const column = this.#cipherTable[0].indexOf(letter)
      const row = this.#cipherTable[0].indexOf(keyLetter)

      if (this.#isLetter(column)) {
        for (const row of this.#cipherTable) {
          if (row[0] === keyLetter) {
            this.#encryptLetter(row[column])
          }
        }
      } else {
        this.#keepNonLetter(letter)
      }
    }
    return this.#restoreCasing(this.#encryptedPhrase)
  }

  /**
   * Decrypts encrypted text using the Vigenère cipher.
   *
   * @param {string} encryptedText - The text to decrypt.
   * @returns {string} The decrypted text.
   */
  decrypt(encryptedText) {
    this.#saveCasing(encryptedText)
    this.#createVigenereTableAndKeyLine()
    encryptedText = encryptedText.toLowerCase()

    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText.charAt(i)
      const keyLetter = this.#keyLine[i]
      const column = this.#cipherTable[0].indexOf(letter)
      const row = this.#cipherTable[0].indexOf(keyLetter)

      if (this.#isLetter(column)) {
        this.#decryptLetter(this.#cipherTable[row].indexOf(letter))
      } else {
        this.#decryptedPhrase += letter
      }
    }
    return this.#restoreCasing(this.#decryptedPhrase)
  }

  /**
   * Checks if index represents a letter in the alphabet.
   *
   * @param {number} index - The index to check.
   * @returns {boolean} True if index is valid, false if it's not.
   */
  #isLetter(index) {
    return index !== -1
  }

  /**
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  #keepNonLetter(nonLetter) {
    this.#encryptedPhrase += nonLetter
  }

  /**
   * Adds a letter to the encrypted phrase.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  #encryptLetter(index) {
    this.#encryptedPhrase += index
  }

  /**
   * Adds a decrypted letter to the decrypted phrase.
   *
   * @param {number} cipherIndex - The index of the letter in the cipher table.
   */
  #decryptLetter(cipherIndex) {
    this.#decryptedPhrase += this.#alphabet.charAt(cipherIndex)
  }

  /**
   * Creates the Vigenère cipher table and the key line used for encryption and decryption.
   *
   * @returns {Array<string>} The cipher table.
   */
  #createVigenereTableAndKeyLine() {
    for (let i = 0; i < this.#alphabet.length; i++) {
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
    this.#cipherTable.push(this.#a.getCipher(index))
  }

  /**
   * Checks if character is an uppercase letter.
   *
   * @param {string} char - The character to check.
   * @returns {boolean} True if the character is uppercase, false if not.
   */
  isUpperCase(char) {
    return /\p{L}/u.test(char) && char === char.toUpperCase()
  }

  /**
   * Saves the casing of each character for restoration later.
   *
   * @param {string} text - The text whose casing is to be saved.
   */
  #saveCasing(text) {
    for (const char of text)
      if (this.isUpperCase(char)) {
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
  #restoreCasing(text) {
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
}
