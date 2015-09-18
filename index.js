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

function rot13(text) {
  return tr(text, 'abcdefghijklmnopqrstuvwxyz', 'nopqrstuvwxyzabcdefghijklm');
}

function enlolcrypt(text) {
  return tr(text, 'aeioubcdfghjklmnpqrstvwxyz', 'iouaenpqrstvwxyzbcdfghjklm');
}

function delolcrypt(text) {
  return tr(text, 'iouaenpqrstvwxyzbcdfghjklm', 'aeioubcdfghjklmnpqrstvwxyz');
}

function imgurEncrypt(text) {
  return tr(text, '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./', '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.');
}

function imgurDecrypt(text) {
  return tr(text, '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.', '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./');
}

function theuconEncrypt(text) {
  return theuconScrambleArray(text.split('')).join('');
}

function theuconDecrypt(text) {
  return theuconUnscrambleArray(text.split('')).join('');
}

function theuconEncryptPreserveSpaces(text) {
  var textArray = text.split('');
  var spaceless = text.replace(/\ /g, '');
  var spacelessArray = spaceless.split('');
  var characters = theuconScrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

function theuconDecryptPreserveSpaces(text) {
  var spaceless = text.replace(/\ /g, '');
  var textArray = text.split('');
  var spacelessArray = spaceless.split('');
  var characters = theuconUnscrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

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

function tr(text) {
  var inAlphabet = arguments.length <= 1 || arguments[1] === undefined ? 'abcdefghijklmnopqrstuvwxyz' : arguments[1];
  var outAlphabet = arguments.length <= 2 || arguments[2] === undefined ? 'abcdefghijklmnopqrstuvwxyz' : arguments[2];

  return text.replace(new RegExp('([' + inAlphabet + '])', 'ig'), function (value) {
    var index = inAlphabet.indexOf(value.toLowerCase());
    var c = outAlphabet[index] || value;
    return (/[A-Z]/.test(value) ? c.toUpperCase() : c
    );
  });
}
module.exports = exports['default'];