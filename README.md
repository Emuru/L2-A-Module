Nardus - A module for encrypting strings using classic ciphers
=============

This is a simple module used to encrypt strings using three classic ciphers, the [Caesar cipher](https://www.simonsingh.net/The_Black_Chamber/caesar.html), the [Alberti cipher](https://www.simonsingh.net/The_Black_Chamber/swapping_cipher_alphabets.html) and the [Vigenere cipher](https://www.simonsingh.net/The_Black_Chamber/v_square.html).
### Current features ###
* Use your own custom alphabet.
- Encrypt and decrypt strings using the Caesar cipher.
- Encrypt and decrypt strings using the Alberti cipher.
- Encrypt and decrypt strings using the Vigenere cipher.

### Setup ###

Install the module using the command below.
#### Git clone

```sh
npm i nardus
```

#### Import to project

```js
import { Alphabet, AlbertiCipher, CaesarCipher, VigenereCipher } from './ciphers.js'
```

### Basic Usage Example ###

```js
import { Alphabet, AlbertiCipher, CaesarCipher, VigenereCipher } from './ciphers.js'

// Create an alphabet to use in your ciphering business.
const swedishAlphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
const englishAlphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

// Create an instance of your desired cipher.

// If you wish to encrypt text using a Caesar Cipher you pass along two
// arguments. The first argument is the key you wish to use. This argument
// must be an integer. The second argument is the alphabet object you wish
// to use.
const caesarCipher = new CaesarCipher(3, swedishAlphabet)

// If you wish to encrypt text using a Alberti Cipher you pass along three
// arguments. The first argument is the first key you wish to use. The second
// argument is the second key you wish to use. The first two arguments must
// be integers. The third argument is the alphabet object you wish to use.
const albertiCipher = new AlbertiCipher(3, 7, englishAlphabet)

// If you wish to encrypt text using a Vigenere Cipher you pass along two
// arguments. The first argument is the key you wish to use. This argument
// must be string of letters. The second argument is the alphabet object
// you wish to use.
const vigenereCipher = new VigenereCipher('vitlök', swedishAlphabet)

// To encrypt a string you simply pass a string to the encrypt method in
// the cipher object. The method will return an encrypted string. To decrypt
// the sting you pass the encrypted string to the decrypt method in the same
// cipher object.

// Returns: 'ijy nsqjifsij yjxyjy'
caesarCipher.encrypt('det inledande testet')

// Returns: 'det inledande testet'
caesarCipher.decrypt('ijy nsqjifsij yjxyjy')

// The same goes for the other two ciphers.
```

### Testing ###
Testing of the module functionalities has been done and you can find the test report [here](./testrapport.md)

### Dependencies ###
This module has no dependencies.

### Code Quality ###
The code quality of this module has been evaluated and you can find the evaluation [here](./reflektion.md)

### License ###

This module is released under the [MIT License](http://opensource.org/licenses/MIT).
