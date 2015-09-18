import test from 'tape';
import lolcryption from './';

test('LOLcryption', t => {
  var cipher = lolcryption.enlolcrypt('hello, world.');
  var plaintext = lolcryption.delolcrypt('toxxa, jadxq.');

  t.plan(2);

  t.equal(cipher, 'toxxa, jadxq.', 'encryption of "hello, world." should be "toxxa, jadxq."');
  t.equal(plaintext, 'hello, world.', 'decryption of "toxxa, jadxq." should be "hello, world."');
});

test('imgur', t => {
  var cipher = lolcryption.imgurEncrypt('hello, world.');
  var plaintext = lolcryption.imgurDecrypt('gwkkim qieks,');

  t.plan(2);

  t.equal(cipher, 'gwkkim qieks,', 'encryption of "hello, world." should be "gwkkim qieks,"');
  t.equal(plaintext, 'hello, world.', 'decryption of "gwkkim qieks," should be "hello, world."');
});

test('Theucon (Simple)', t => {
  var cipher = lolcryption.theuconEncrypt('hello, world.');
  var plaintext = lolcryption.theuconDecrypt('hll,wde olo.r');

  t.plan(2);

  t.equal(cipher, 'hll,wde olo.r', 'encryption of "hello, world." should be "hll,wde olo.r"');
  t.equal(plaintext, 'hello, world.', 'decryption of "hll,wde olo.r" should be "hello, world."');
});

test('Theucon (Preserve Spaces)', t => {
  var cipher = lolcryption.theuconEncryptPreserveSpaces('The quick brown fox jumps over the lazy dog.');
  var plaintext = lolcryption.theuconDecryptPreserveSpaces('Teq ikwfu peayh cbo osvez .unx mrd grot ljoh');

  t.plan(2);

  t.equal(cipher, 'Teq ikwfu peayh cbo osvez .unx mrd grot ljoh', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh" should be "The quick brown fox jumps over the lazy dog."');
});
