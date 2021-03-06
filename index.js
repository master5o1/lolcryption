'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _primes = require('primes');

var _primes2 = _interopRequireDefault(_primes);

var _isPrime = require('is-prime');

var _isPrime2 = _interopRequireDefault(_isPrime);

exports['default'] = {
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
  var textArray = text.split('');
  var spaceless = text.replace(/\ /g, '');
  var spacelessArray = spaceless.split('');
  var characters = theuconScrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

/**
 * Uses the Theucon algorithm to unscramble text but preserves
 * space characters so that the words and word lengths are retained.
 * @param {String} text
 * @returns {String}
 */
function theuconDecryptPreserveSpaces(text) {
  var spaceless = text.replace(/\ /g, '');
  var textArray = text.split('');
  var spacelessArray = spaceless.split('');
  var characters = theuconUnscrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

/**
 * Scrambles an array using the Theucon algorithm.
 * @param {Array} remaining
 * @returns {Array}
 */
function theuconScrambleArray(remaining) {
  var output = [];

  var _loop = function () {
    var primeIndexed = [];
    remaining = remaining.filter(function (r, i) {
      var accepted = i === 0 || (0, _isPrime2['default'])(i);
      if (accepted) {
        primeIndexed.push(r);
      }
      return !accepted;
    });
    output = output.concat(primeIndexed);
  };

  while (remaining.length > 0) {
    _loop();
  }
  return output;
}

/**
 * Unscrambles an array using the Theucon algorithm.
 * @param {Array} remaining
 * @returns {Array}
 */
function theuconUnscrambleArray(remaining) {
  var output = [];

  var _loop2 = function () {
    var primes = [0].concat((0, _primes2['default'])(0, remaining.length));
    var currentOutput = remaining.map(function () {
      return '';
    });
    var current = remaining.splice(0, primes.length);

    primes.forEach(function (p, i) {
      currentOutput[primes[i]] = current[i];
    });

    if (output.length === 0) {
      output = currentOutput;
    } else {
      output = output.map(function (o) {
        return o === '' ? currentOutput.shift() : o;
      });
    }
  };

  while (remaining.length) {
    _loop2();
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
  return text.replace(new RegExp('([' + inAlphabet + '])', 'ig'), function (value) {
    var index = inAlphabet.indexOf(value.toLowerCase());
    var c = outAlphabet[index] || value;
    return (/[A-Z]/.test(value) ? c.toUpperCase() : c
    );
  });
}
module.exports = exports['default'];