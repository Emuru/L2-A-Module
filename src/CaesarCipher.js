/**
 * @file The CaesarCipher class.
 * @module src/CaesarCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

/**
 * Class representing a Caesar cipher.
 */
export class CaesarCipher {
  /**
   * Creates a Caesar cipher instance.
   *
   * @param {string} key - The key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(key, alphabet) {
    this.key = key
    this.a = alphabet
    this.alphabet = this.a.getAlphabet()
    this.cipher = this.a.getCipher(this.key)
    this.casing = []
    this.encryptedPhrase = ''
    this.decryptedPhrase = ''
  }

  /**
   * Encrypts plaintext using the Caesar cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this.saveCasing(plainText)

    plainText = plainText.toLowerCase()

    for (const index of plainText) {
      const alphabetIndex = this.alphabet.indexOf(index)
      if (this.isLetter(alphabetIndex)) {
        this.encryptLetter(alphabetIndex)
      } else {
        this.keepNonLetter(index)
      }
    }
    return (this.encryptedPhrase = this.restoreCasing(this.encryptedPhrase))
  }

  /**
   * Decrypts encrypted text using the Caesar cipher.
   *
   * @param {string} encryptedText - The text to decrypt.
   * @returns {string} The decrypted text.
   */
  decrypt(encryptedText) {
    this.saveCasing(encryptedText)
    encryptedText = encryptedText.toLowerCase()

    for (const index of encryptedText) {
      const cipherIndex = this.cipher.indexOf(index)
      if (this.isLetter(cipherIndex)) {
        this.decryptLetter(cipherIndex)
      } else {
        this.decryptedPhrase += index
      }
    }
    return (this.decryptedPhrase = this.restoreCasing(this.decryptedPhrase))
  }

  /**
   * Checks if index represents a letter in the alphabet.
   *
   * @param {number} index - The index to check.
   * @returns {boolean} True if index is valid, false if it's not.
   */
  isLetter(index) {
    return index !== -1
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
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  encryptLetter(index) {
    this.encryptedPhrase += this.cipher.charAt(index)
  }

  /**
   * Adds a decrypted letter to the decrypted phrase.
   *
   * @param {number} cipherIndex - The index of the letter in the cipher table.
   */
  decryptLetter(cipherIndex) {
    this.decryptedPhrase += this.alphabet.charAt(cipherIndex)
  }

  /**
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  keepNonLetter(nonLetter) {
    this.encryptedPhrase += nonLetter
  }

  /**
   * Saves the casing of each character for restoration later.
   *
   * @param {string} text - The text whose casing is to be saved.
   */
  saveCasing(text) {
    for (const char of text)
      if (this.isUpperCase(char)) {
        this.casing.push(true)
      } else {
        this.casing.push(false)
      }
  }

  /**
   * Restores the original casing of the text based on the saved casing information.
   *
   * @param {string} text - The text whose casing is to be restored.
   * @returns {string} The text with restored casing.
   */
  restoreCasing(text) {
    let updatedPhrase = ''
    for (let i = 0; i < this.casing.length; i++) {
      if (this.casing[i] === true) {
        updatedPhrase += text.charAt(i).toUpperCase()
      } else {
        updatedPhrase += text.charAt(i)
      }
    }
    return updatedPhrase
  }
}
