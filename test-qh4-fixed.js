// Test if Qh4 works now

const Chess = require('./js/chess.js').Chess;

const fen = 'rnbqkb1r/ppp2ppp/8/4N2n/3P1p2/8/PPP1Q1PP/RNB1KB1R b KQkq - 0 7';
const chess = new Chess(fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

console.log('Is black in check?', chess.in_check());
console.log('');

console.log('Trying Qh4:');
const qh4 = chess.move('Qh4');
if (qh4) {
  console.log('✓ Qh4 is LEGAL!');
  console.log('Move:', qh4);
  console.log('');
  console.log('Position after Qh4:');
  console.log(chess.ascii());
} else {
  console.log('✗ Qh4 is still illegal');
  console.log('Legal moves:', chess.moves().length);
  console.log(chess.moves().join(', '));
}
