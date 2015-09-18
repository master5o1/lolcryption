import primesUntil from 'primes';
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
  tr: tr
};

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
  let textArray = text.split('');
  let spaceless = text.replace(/\ /g, '');
  let spacelessArray = spaceless.split('');
  let characters = theuconScrambleArray(spacelessArray);

  return textArray.map(c => c === ' ' ? c : characters.shift())
                  .join('');
}

function theuconDecryptPreserveSpaces(text) {
  let spaceless = text.replace(/\ /g, '');
  let textArray = text.split('');
  let spacelessArray = spaceless.split('');
  let characters = theuconUnscrambleArray(spacelessArray);

  return textArray.map(c => c === ' ' ? c : characters.shift())
                  .join('');
}

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

function theuconUnscrambleArray(remaining) {
  let output = [];
  while (remaining.length) {
    let primes = [0].concat(primesUntil(remaining.length));
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

function tr(text, inAlphabet = 'abcdefghijklmnopqrstuvwxyz', outAlphabet = 'abcdefghijklmnopqrstuvwxyz') {
  return text.replace(new RegExp(`([${inAlphabet}])`, 'ig'), function (value) {
    var index = inAlphabet.indexOf(value.toLowerCase());
    var c = outAlphabet[index] || value;
    return /[A-Z]/.test(value) ? c.toUpperCase() : c;
  });
}
