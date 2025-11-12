// Test Qh4 with check notation

const Chess = require('./js/chess.js').Chess;

const fen = 'rnbqkb1r/ppp2ppp/8/4N2n/3P1p2/8/PPP1Q1PP/RNB1KB1R b KQkq - 0 7';
const chess = new Chess(fen);

console.log('Trying Qh4 (without +):');
let result = chess.move('Qh4');
console.log('Result:', result ? 'SUCCESS' : 'FAILED');

if (!result) {
  console.log('\nTrying Qh4+ (with +):');
  result = chess.move('Qh4+');
  console.log('Result:', result ? 'SUCCESS' : 'FAILED');
}

if (!result) {
  console.log('\nTrying with object notation:');
  result = chess.move({ from: 'd8', to: 'h4' });
  console.log('Result:', result ? 'SUCCESS' : 'FAILED');
}

if (result) {
  console.log('\n✓ Move worked!');
  console.log('Move details:', result);
}
