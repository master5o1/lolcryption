'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ = require('./');

var _2 = _interopRequireDefault(_);

(0, _tape2['default'])('ROT13', function (t) {
  var cipher = _2['default'].rot13('The quick brown fox jumps over the lazy dog.');

  t.plan(1);

  t.equal(cipher, 'Gur dhvpx oebja sbk whzcf bire gur ynml qbt.', 'ROT13 of "The quick brown fox jumps over the lazy dog." should be "Gur dhvpx oebja sbk whzcf bire gur ynml qbt."');
});

(0, _tape2['default'])('LOLcryption', function (t) {
  var cipher = _2['default'].enlolcrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = _2['default'].delolcrypt('Gto ceupw ndajz rak veybf ahod gto ximl qas.');

  t.plan(2);

  t.equal(cipher, 'Gto ceupw ndajz rak veybf ahod gto ximl qas.', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Gto ceupw ndajz rak veybf ahod gto ximl qas."');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Gto ceupw ndajz rak veybf ahod gto ximl qas." should be "The quick brown fox jumps over the lazy dog."');
});

(0, _tape2['default'])('imgur', function (t) {
  var cipher = _2['default'].imgurEncrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = _2['default'].imgurDecrypt('Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,');

  t.plan(2);

  t.equal(cipher, 'Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif," should be "The quick brown fox jumps over the lazy dog."');
});

(0, _tape2['default'])('Theucon (Simple)', function (t) {
  var cipher = _2['default'].theuconEncrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = _2['default'].theuconDecrypt('Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo ');

  t.plan(2);

  t.equal(cipher, 'Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo ', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo "');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo " should be "The quick brown fox jumps over the lazy dog."');
});

(0, _tape2['default'])('Theucon (Preserve Spaces)', function (t) {
  var cipher = _2['default'].theuconEncryptPreserveSpaces('The quick brown fox jumps over the lazy dog.');
  var plaintext = _2['default'].theuconDecryptPreserveSpaces('Teq ikwfu peayh cbo osvez .unx mrd grot ljoh');

  t.plan(2);

  t.equal(cipher, 'Teq ikwfu peayh cbo osvez .unx mrd grot ljoh', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh" should be "The quick brown fox jumps over the lazy dog."');
});