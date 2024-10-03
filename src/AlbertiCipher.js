/**
 * @file The AlbertiCipher class.
 * @module src/AlbertiCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class AlbertiCipher {
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

  encryptLetter(loopIndex, alphabetIndex) {
    if (this.isEven(loopIndex)) {
      this.addLetterFromFirstCipher(alphabetIndex)
    } else {
      this.addLetterFromSecondCipher(alphabetIndex)
    }
  }

  decryptLetter(cipherIndex) {
    this.decryptedPhrase += this.alphabet.charAt(cipherIndex)
  }

  addLetterFromFirstCipher(index) {
    this.encryptedPhrase += this.firstCipher.charAt(index)
  }

  addLetterFromSecondCipher(index) {
    this.encryptedPhrase += this.secondCipher.charAt(index)
  }

  isLetter(index) {
    return index !== -1
  }

  isEven(i) {
    return i % 2 === 0
  }

  keepNonLetter(nonLetter) {
    this.encryptedPhrase += nonLetter
  }

  isUpperCase(char) {
    return /\p{L}/u.test(char) && char === char.toUpperCase()
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
