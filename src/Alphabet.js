/**
 * @file The Alphabet class.
 * @module src/Alphabet
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

/**
 * Class representing an alphabet.
 */
export class Alphabet {
  /**
   * Creates an instance of Alphabet.
   * Converts the provided alphabet string to lowercase.
   *
   * @param {string} alphabet - The string representing the alphabet.
   */
  constructor(alphabet) {
    this.alphabet = alphabet.toLowerCase()
  }

  /**
   * Retrieves the alphabet string.
   *
   * @returns {string} The alphabet string.
   */
  getAlphabet() {
    return this.alphabet
  }

  /**
   * Generates a ciphered version of the alphabet shifted by a specified number of positions.
   *
   * @param {number} shift - The number of positions to shift the alphabet.
   * @returns {string} The shifted alphabet string.
   */
  getCipher(shift) {
    return this.cipher(shift)
  }

  /**
   * Shifts the alphabet by the given number of positions and returns the result.
   * This is used to create a ciphered version of the alphabet.
   *
   * @param {number} shift - The number of positions to shift.
   * @returns {string} The shifted alphabet string.
   */
  cipher(shift) {
    const lettersToShift = this.alphabet.substring(0, shift)
    const remainingLetters = this.alphabet.substring(shift)
    return remainingLetters + lettersToShift
  }
}
