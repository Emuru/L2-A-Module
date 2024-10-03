/**
 * @file The AlbertiCipher class.
 * @module src/AlbertiCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

/**
 * Class representing a Alberti cipher.
 */
export class AlbertiCipher {
  /**
   * Creates a Alberti cipher instance.
   *
   * @param {string} firstKey - The first key used for encryption and decryption.
   * @param {string} secondKey - The second key used for encryption and decryption.
   * @param {Object} alphabet - The alphabet object.
   */
  constructor(firstKey, secondKey, alphabet) {
    this.firstKey = firstKey
    this.secondKey = secondKey
    this.a = alphabet
    this.alphabet = this.a.getAlphabet()
    this.firstCipher = this.a.cipher(this.firstKey)
    this.secondCipher = this.a.cipher(this.secondKey)
    this.casing = []
    this.encryptedPhrase = ''
    this.decryptedPhrase = ''
  }

  /**
   * Encrypts plaintext using the Vigenere cipher.
   *
   * @param {string} plainText - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  encrypt(plainText) {
    this.saveCasing(plainText)
    plainText = plainText.toLowerCase()

    for (let i = 0; i < plainText.length; i++) {
      const letter = plainText.charAt(i)
      const alphabetIndex = this.alphabet.indexOf(letter)

      if (this.isLetter(alphabetIndex)) {
        this.encryptLetter(i, alphabetIndex)
      } else {
        this.keepNonLetter(letter)
      }
    }
    return this.restoreCasing(this.encryptedPhrase)
  }

  /**
   * Decrypts encrypted text using the Vigenère cipher.
   *
   * @param {string} encryptedText - The text to decrypt.
   * @returns {string} The decrypted text.
   */
  decrypt(encryptedText) {
    this.saveCasing(encryptedText)
    encryptedText = encryptedText.toLowerCase()

    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText.charAt(i)
      const firstCipherIndex = this.firstCipher.indexOf(letter)
      const secondCipherIndex = this.secondCipher.indexOf(letter)

      if (this.isEven(i)) {
        if (this.isLetter(firstCipherIndex)) {
          this.decryptLetter(firstCipherIndex)
        } else {
          this.decryptedPhrase += letter
        }
      } else {
        if (this.isLetter(secondCipherIndex)) {
          this.decryptLetter(secondCipherIndex)
        } else {
          this.decryptedPhrase += letter
        }
      }
    }
    return this.restoreCasing(this.decryptedPhrase)
  }

  /**
   * Adds a letter to the encrypted phrase.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  encryptLetter(loopIndex, alphabetIndex) {
    if (this.isEven(loopIndex)) {
      this.addLetterFromFirstCipher(alphabetIndex)
    } else {
      this.addLetterFromSecondCipher(alphabetIndex)
    }
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
   * Adds a letter to the encrypted phrase from the first cipher.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  addLetterFromFirstCipher(index) {
    this.encryptedPhrase += this.firstCipher.charAt(index)
  }

  /**
   * Adds a letter to the encrypted phrase from the second cipher.
   *
   * @param {number} index - The index of the letter in the cipher.
   */
  addLetterFromSecondCipher(index) {
    this.encryptedPhrase += this.secondCipher.charAt(index)
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
   * Checks if a number is even.
   *
   * @param {number} i - The number to check.
   * @returns {boolean} True if the number is even, false if not.
   */
  isEven(i) {
    return i % 2 === 0
  }

  /**
   * Keeps non-letter characters as is in the encrypted phrase.
   *
   * @param {string} nonLetter - The non-letter character to keep.
   */
  keepNonLetter(nonLetter) {
    this.encryptedPhrase += nonLetter
  }

  isUpperCase(char) {
    return /\p{L}/u.test(char) && char === char.toUpperCase()
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
