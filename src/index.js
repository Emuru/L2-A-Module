/**
 * @file The starting point of the module.
 * @module src/index
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Alphabet } from './Alphabet.js'
import { CaesarCipher } from './CaesarCipher.js'

const alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')

const caesarCipher = new CaesarCipher(5, alphabet)

console.log(caesarCipher.encrypt('Marthatoca'))

caesarCipher.decrypt('')
