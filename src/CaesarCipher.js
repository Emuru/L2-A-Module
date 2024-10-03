/**
 * @file The CaesarCipher class.
 * @module src/CaesarCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class CaesarCipher {
  constructor(key, alphabet) {
    this.key = key
    this.a = alphabet
    this.alphabet = this.a.getAlphabet()
    this.cipher = this.a.getCipher(this.key)
    this.casing = []
    this.encryptedPhrase = ''
    this.decryptedPhrase = ''
  }

  encrypt(plainText) {
    this.saveCasing(plainText)

    plainText = plainText.toLowerCase()

    for (const index of plainText) {
      const alphabetIndex = this.alphabet.indexOf(index)
      if (alphabetIndex !== -1) {
        this.addLetter(alphabetIndex)
      } else {
        this.keepNonLetter(index)
      }
    }
    return (this.encryptedPhrase = this.restoreCasing(this.encryptedPhrase))
  }

  decrypt(encryptedText) {
    this.saveCasing(encryptedText)

    encryptedText = encryptedText.toLowerCase()
    for (const index of encryptedText) {
      const cipherIndex = this.cipher.indexOf(index)
      if (cipherIndex !== -1) {
        this.decryptedPhrase += this.alphabet.charAt(cipherIndex)
      } else {
        this.decryptedPhrase += index
      }
    }
    return (this.decryptedPhrase = this.restoreCasing(this.decryptedPhrase))
  }

  isUpperCase(char) {
    return /\p{L}/u.test(char) && char === char.toUpperCase()
  }

  addLetter(index) {
    this.encryptedPhrase += this.cipher.charAt(index)
  }

  keepNonLetter(nonLetter) {
    this.encryptedPhrase += nonLetter
  }

  saveCasing(text) {
    for (const char of text)
      if (this.isUpperCase(char)) {
        this.casing.push(true)
      } else {
        this.casing.push(false)
      }
  }

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
