/**
 * @file The Alphabet class.
 * @module src/Alphabet
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class Alphabet {
  constructor(alphabet) {
    this.alphabet = alphabet.toLowerCase()
  }

  getAlphabet() {
    return this.alphabet
  }

  getCipher(shift) {
    return this.cipher(shift)
  }

  cipher(shift) {
    const lettersToShift = this.alphabet.substring(0, shift)
    const remainingLetters = this.alphabet.substring(shift)
    return remainingLetters + lettersToShift
  }
}
