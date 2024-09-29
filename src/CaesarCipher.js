/**
 * @file The CaesarCipher class.
 * @module src/CaesarCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */
// import { Alphabet } from './Alphabet.js'

export class CaesarCipher {
  constructor(key, alphabet) {
    this.key = key
    this.alphabet = alphabet
    this.upperCaseAlphabet = this.alphabet.getUpperCaseAlphabet()
    this.lowerCaseAlphabet = this.alphabet.getLowerCaseAlphabet()
    this.shiftedLowerCaseAlphabet = this.alphabet.shiftLowerCaseAlphabet(
      this.key
    )
    this.shiftedUpperCaseAlphabet = this.alphabet.shiftUpperCaseAlphabet(
      this.key
    )
    this.encryptedPhrase = ''
    this.decryptedPhrase = ''
  }

  encrypt(plainText) {
    for (const char of plainText) {
      const upperCaseAlphabetIndex = this.upperCaseAlphabet.indexOf(char)
      const lowerCaseAlphabetIndex = this.lowerCaseAlphabet.indexOf(char)
      if (upperCaseAlphabetIndex !== -1) {
        this.encryptedPhrase =
          this.encryptedPhrase +
          this.shiftedUpperCaseAlphabet.charAt(upperCaseAlphabetIndex)
      } else if (lowerCaseAlphabetIndex !== -1) {
      } else {
        this.encryptedPhrase = this.encryptedPhrase + char
      }
    }
    console.log(this.encryptedPhrase)
  }

  decrypt(encryptedText) {
    for (const char of encryptedText) {
      const shiftedUpperCaseAlphabetIndex =
        this.shiftedUpperCaseAlphabet.indexOf(char)
      const shiftedLowerCaseAlphabetIndex =
        this.shiftedLowerCaseAlphabet.indexOf(char)
      if (shiftedUpperCaseAlphabetIndex !== -1) {
        this.decryptedPhrase =
          this.decryptedPhrase +
          this.upperCaseAlphabet.charAt(shiftedUpperCaseAlphabetIndex)
      } else if (shiftedLowerCaseAlphabetIndex !== -1) {
        this.decryptedPhrase =
          this.decryptedPhrase +
          this.lowerCaseAlphabet.charAt(shiftedLowerCaseAlphabetIndex)
      } else {
        this.decryptedPhrase = this.decryptedPhrase + char
      }
    }
  }
}
