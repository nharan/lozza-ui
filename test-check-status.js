// Check if black is in check

const Chess = require('./js/chess.js').Chess;

const fen = 'rnbqkb1r/ppp2ppp/8/4N2n/3P1p2/8/PPP1Q1PP/RNB1KB1R b KQkq - 0 7';
const chess = new Chess(fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

console.log('Is black in check?', chess.in_check());
console.log('');

if (chess.in_check()) {
  console.log('Black IS in check!');
  console.log('That explains why only 5 moves are legal - they must get out of check');
  console.log('');
  console.log('Legal moves to get out of check:');
  chess.moves({ verbose: true }).forEach(m => {
    console.log(`  ${m.san} - ${m.from} to ${m.to}`);
  });
  console.log('');
  console.log('Qh4 would NOT get black out of check, so it is correctly illegal!');
}
