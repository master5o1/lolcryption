'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ = require('./');

var _2 = _interopRequireDefault(_);

(0, _tape2['default'])('LOLcryption', function (t) {
  var cipher = _2['default'].enlolcrypt('hello, world.');
  var plaintext = _2['default'].delolcrypt('toxxa, jadxq.');

  t.plan(2);

  t.equal(cipher, 'toxxa, jadxq.', 'encryption of "hello, world." should be "toxxa, jadxq."');
  t.equal(plaintext, 'hello, world.', 'decryption of "toxxa, jadxq." should be "hello, world."');
});

(0, _tape2['default'])('imgur', function (t) {
  var cipher = _2['default'].imgurEncrypt('hello, world.');
  var plaintext = _2['default'].imgurDecrypt('gwkkim qieks,');

  t.plan(2);

  t.equal(cipher, 'gwkkim qieks,', 'encryption of "hello, world." should be "gwkkim qieks,"');
  t.equal(plaintext, 'hello, world.', 'decryption of "gwkkim qieks," should be "hello, world."');
});

(0, _tape2['default'])('Theucon (Simple)', function (t) {
  var cipher = _2['default'].theuconEncrypt('hello, world.');
  var plaintext = _2['default'].theuconDecrypt('hll,wde olo.r');

  t.plan(2);

  t.equal(cipher, 'hll,wde olo.r', 'encryption of "hello, world." should be "hll,wde olo.r"');
  t.equal(plaintext, 'hello, world.', 'decryption of "hll,wde olo.r" should be "hello, world."');
});

(0, _tape2['default'])('Theucon (Preserve Spaces)', function (t) {
  var cipher = _2['default'].theuconEncryptPreserveSpaces('The quick brown fox jumps over the lazy dog.');
  var plaintext = _2['default'].theuconDecryptPreserveSpaces('Teq ikwfu peayh cbo osvez .unx mrd grot ljoh');

  t.plan(2);

  t.equal(cipher, 'Teq ikwfu peayh cbo osvez .unx mrd grot ljoh', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh" should be "The quick brown fox jumps over the lazy dog."');
});