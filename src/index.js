/**
 * @file The starting point of the module.
 * @module src/index
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Alphabet } from './Alphabet.js'
import { AlbertiCipher } from './AlbertiCipher.js'
import { CaesarCipher } from './CaesarCipher.js'
import { VigenereCipher } from './VigenereCipher.js'

const alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')

const caesarCipher = new CaesarCipher(5, alphabet)

const albertiCipher = new AlbertiCipher(2, 5, alphabet)

const vigenereCipher = new VigenereCipher('lakrits', alphabet)

console.log('Caesarmeddelande: ' + caesarCipher.encrypt('Jag hatar dig'))

console.log('Caesarmeddelande: ' + caesarCipher.decrypt('Ofl mfyfw inl'))

console.log(
  'Albertimeddelande: ' + albertiCipher.encrypt('Hur blir det med detta?')
)

console.log(
  'Albertimeddelande: ' + albertiCipher.decrypt('Jzt dqkw igy rgi igyvf?')
)

console.log('Vigeneremeddelande: ' + vigenereCipher.encrypt('Ny text'))

console.log('Vigeneremeddelande: ' + vigenereCipher.decrypt('Yy hmni'))
