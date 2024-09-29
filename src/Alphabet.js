/**
 * @file The Alphabet class.
 * @module src/Alphabet
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

export class Alphabet {
  constructor(letters) {
    this.upperCaseAlphabet = letters.toUpperCase()
    this.lowerCaseAlphabet = letters.toLowerCase()
  }

  getUpperCaseAlphabet() {
    return this.upperCaseAlphabet
  }

  getLowerCaseAlphabet() {
    return this.lowerCaseAlphabet
  }

  getShiftedUpperCaseAlphabet(shift) {
    return this.shiftUpperCaseAlphabet(shift)
  }

  getShiftedLowerCaseAlphabet(shift) {
    return this.shiftLowerCaseAlphabet(shift)
  }

  shiftLowerCaseAlphabet(shift) {
    const lettersToShift = this.lowerCaseAlphabet.substring(0, shift)
    const remainingLetters = this.lowerCaseAlphabet.substring(shift)
    return remainingLetters + lettersToShift
  }

  shiftUpperCaseAlphabet(shift) {
    const lettersToShift = this.upperCaseAlphabet.substring(0, shift)
    const remainingLetters = this.upperCaseAlphabet.substring(shift)
    return remainingLetters + lettersToShift
  }
}
