/**
 * @file The VigenereCipher class.
 * @module src/VigenereCipher
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class VigenereCipher {
  constructor(key, alphabet) {
    this.key = key
    this.a = alphabet
    this.alphabet = this.a.getAlphabet()
    this.casing = []
    this.cipherTable = []
    this.keyLine = []
    this.encryptedPhrase = ''
    this.decryptedPhrase = ''
  }

  encrypt(plainText) {
    this.saveCasing(plainText)
    this.createVigenereTableAndKeyLine()
    plainText = plainText.toLowerCase()

    for (let i = 0; i < plainText.length; i++) {
      const letter = plainText.charAt(i)
      const keyPosition = this.keyLine[i]
      const column = this.cipherTable[0].indexOf(letter)

      if (this.isLetter(column)) {
        for (const row of this.cipherTable) {
          if (row[0] === keyPosition) {
            this.encryptedPhrase += row[column]
          }
        }
      } else {
        this.keepNonLetter(letter)
      }
    }
    return this.restoreCasing(this.encryptedPhrase)
  }

  decrypt(encryptedText) {
    this.saveCasing(encryptedText)
    this.createVigenereTableAndKeyLine()
    encryptedText = encryptedText.toLowerCase()

    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText.charAt(i)
      const keyLetter = this.keyLine[i]
      const column = this.cipherTable[0].indexOf(letter)
      const row = this.cipherTable[0].indexOf(keyLetter)

      if (this.isLetter(column)) {
        this.decryptLetter(this.cipherTable[row].indexOf(letter))
      } else {
        this.decryptedPhrase += letter
      }
    }
    return this.restoreCasing(this.decryptedPhrase)
  }

  isLetter(index) {
    return index !== -1
  }

  keepNonLetter(nonLetter) {
    this.encryptedPhrase += nonLetter
  }

  addLetter(index) {
    this.encryptedPhrase += this.cipher.charAt(index)
  }

  decryptLetter(cipherIndex) {
    this.decryptedPhrase += this.alphabet.charAt(cipherIndex)
  }

  createVigenereTableAndKeyLine() {
    for (let i = 0; i < this.alphabet.length; i++) {
      this.addLineToTable(i)
      this.createKeyLine(i)
    }
    return this.cipherTable
  }

  createKeyLine(index) {
    this.keyLine.push(this.key[index % this.key.length])
  }

  addLineToTable(index) {
    this.cipherTable.push(this.a.getCipher(index))
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
