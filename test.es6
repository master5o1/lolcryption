import test from 'tape';
import lolcryption from './';

test('ROT13', t => {
  var cipher = lolcryption.rot13('The quick brown fox jumps over the lazy dog.');

  t.plan(1);

  t.equal(cipher, 'Gur dhvpx oebja sbk whzcf bire gur ynml qbt.', 'ROT13 of "The quick brown fox jumps over the lazy dog." should be "Gur dhvpx oebja sbk whzcf bire gur ynml qbt."');
});

test('LOLcryption', t => {
  var cipher = lolcryption.enlolcrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = lolcryption.delolcrypt('Gto ceupw ndajz rak veybf ahod gto ximl qas.');

  t.plan(2);

  t.equal(cipher, 'Gto ceupw ndajz rak veybf ahod gto ximl qas.', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Gto ceupw ndajz rak veybf ahod gto ximl qas."');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Gto ceupw ndajz rak veybf ahod gto ximl qas." should be "The quick brown fox jumps over the lazy dog."');
});

test('imgur', t => {
  var cipher = lolcryption.imgurEncrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = lolcryption.imgurDecrypt('Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,');

  t.plan(2);

  t.equal(cipher, 'Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif,"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Rgw =yuxj veiqb diz hynoa icwe rgw kp\'t sif," should be "The quick brown fox jumps over the lazy dog."');
});

test('Theucon (Simple)', t => {
  var cipher = lolcryption.theuconEncrypt('The quick brown fox jumps over the lazy dog.');
  var plaintext = lolcryption.theuconDecrypt('Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo ');

  t.plan(2);

  t.equal(cipher, 'Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo ', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo "');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Te ucrwo prtzo.hikbnjmv lqo xsh d u eafeygo " should be "The quick brown fox jumps over the lazy dog."');
});

test('Theucon (Preserve Spaces)', t => {
  var cipher = lolcryption.theuconEncryptPreserveSpaces('The quick brown fox jumps over the lazy dog.');
  var plaintext = lolcryption.theuconDecryptPreserveSpaces('Teq ikwfu peayh cbo osvez .unx mrd grot ljoh');

  t.plan(2);

  t.equal(cipher, 'Teq ikwfu peayh cbo osvez .unx mrd grot ljoh', 'encryption of "The quick brown fox jumps over the lazy dog." should be "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh"');
  t.equal(plaintext, 'The quick brown fox jumps over the lazy dog.', 'decryption of "Teq ikwfu peayh cbo osvez .unx mrd grot ljoh" should be "The quick brown fox jumps over the lazy dog."');
});
