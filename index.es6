import primesBetween from 'primes';
import isPrime from 'is-prime';

export default {
  enlolcrypt: enlolcrypt,
  delolcrypt: delolcrypt,
  imgurEncrypt: imgurEncrypt,
  imgurDecrypt: imgurDecrypt,
  theuconEncrypt: theuconEncrypt,
  theuconDecrypt: theuconDecrypt,
  theuconScrambleArray: theuconScrambleArray,
  theuconUnscrambleArray: theuconUnscrambleArray,
  theuconEncryptPreserveSpaces: theuconEncryptPreserveSpaces,
  theuconDecryptPreserveSpaces: theuconDecryptPreserveSpaces,
  rot13: rot13,
  tr: tr
};

/**
 * ROT13 text by shifting characters 13 positions.
 *
 * @param {String} text
 * @returns {String}
 */
function rot13(text) {
  return tr(text, 'abcdefghijklmnopqrstuvwxyz', 'nopqrstuvwxyzabcdefghijklm');
}

/**
 * enLOLcrypt text by shifting the vowels and consonants separately.
 * @param {String} text
 * @returns {String}
 */
function enlolcrypt(text) {
  return tr(text, 'aeioubcdfghjklmnpqrstvwxyz', 'iouaenpqrstvwxyzbcdfghjklm');
}

/**
 * deLOLcrypt text by separately shifting vowels and consonants in reverse.
 * @param {String} text
 * @returns {String}
 */
function delolcrypt(text) {
  return tr(text, 'iouaenpqrstvwxyzbcdfghjklm', 'aeioubcdfghjklmnpqrstvwxyz');
}

/**
 * shifts characters in text to become the character to the left of it
 * on a QWERTY keyboard.
 * @param {string} text
 * @returns {String}
 */
function imgurEncrypt(text) {
  return tr(text, '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./', '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.');
}

/**
 * shifts characters in text to become the character to the right of it
 * on a QWERTY keyboard.
 * @param {String} text
 * @returns {String}
 */
function imgurDecrypt(text) {
  return tr(text, '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.', '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./');
}

/**
 * Scrambles a string by progressively moving the characters that are in
 * prime positions to the front of the string.
 * @param {String} text
 * @returns {String}
 */
function theuconEncrypt(text) {
  return theuconScrambleArray(text.split('')).join('');
}
/**
 * Unscrambles characters in the string such by placing the characters into
 * prime positions of the string.
 * @param {String} text
 * @returns {String}
 */
function theuconDecrypt(text) {
  return theuconUnscrambleArray(text.split('')).join('');
}

/**
 * Uses the Theucon algorithm of scrambling text but preserves
 * space characters so that the words and word lengths are retained.
 * @param {String} text
 * @returns {String}
 */
function theuconEncryptPreserveSpaces(text) {
  let textArray = text.split('');
  let spaceless = text.replace(/\ /g, '');
  let spacelessArray = spaceless.split('');
  let characters = theuconScrambleArray(spacelessArray);

  return textArray.map(c => c === ' ' ? c : characters.shift())
                  .join('');
}

/**
 * Uses the Theucon algorithm to unscramble text but preserves
 * space characters so that the words and word lengths are retained.
 * @param {String} text
 * @returns {String}
 */
function theuconDecryptPreserveSpaces(text) {
  let spaceless = text.replace(/\ /g, '');
  let textArray = text.split('');
  let spacelessArray = spaceless.split('');
  let characters = theuconUnscrambleArray(spacelessArray);

  return textArray.map(c => c === ' ' ? c : characters.shift())
                  .join('');
}

/**
 * Scrambles an array using the Theucon algorithm.
 * @param {Array} remaining
 * @returns {Array}
 */
function theuconScrambleArray(remaining) {
  let output = [];
  while (remaining.length > 0) {
    let primeIndexed = [];
    remaining = remaining.filter((r, i) => {
      let accepted = i === 0 || isPrime(i);
      if (accepted) {
        primeIndexed.push(r);
      }
      return !accepted;
    });
    output = output.concat(primeIndexed);
  }
  return output;
}

/**
 * Unscrambles an array using the Theucon algorithm.
 * @param {Array} remaining
 * @returns {Array}
 */
function theuconUnscrambleArray(remaining) {
  let output = [];
  while (remaining.length) {
    let primes = [0].concat(primesBetween(0, remaining.length));
    let currentOutput = remaining.map(() => '');
    let current = remaining.splice(0, primes.length);

    primes.forEach((p, i) => {
      currentOutput[primes[i]] = current[i];
    });

    if (output.length === 0) {
      output = currentOutput;
    } else {
      output = output.map(o => (o === '') ? currentOutput.shift() : o);
    }
  }
  return output;
}

/**
 * Converts characters in text by position in inAlphabet to
 * characters in same position of outAlphabet.
 * @param {String} text
 * @param {String} inAlphabet
 * @param {String} outAlphabet
 * @returns {String}
 */
function tr(text, inAlphabet, outAlphabet) {
  return text.replace(new RegExp(`([${inAlphabet}])`, 'ig'), function (value) {
    var index = inAlphabet.indexOf(value.toLowerCase());
    var c = outAlphabet[index] || value;
    return /[A-Z]/.test(value) ? c.toUpperCase() : c;
  });
}
