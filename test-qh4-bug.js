// Test the Qh4 bug

const Chess = require('./js/chess.js').Chess;

console.log('=== Testing Qh4 Bug ===\n');

const moves = ['e4', 'e5', 'f4', 'exf4', 'Nf3', 'Nf6', 'e5', 'Nh5', 'd4', 'd6', 'Qe2+', 'dxe5', 'Nxe5+'];

const chess = new Chess();

console.log('Playing moves:');
for (let i = 0; i < moves.length; i++) {
  const result = chess.move(moves[i]);
  if (!result) {
    console.log(`ERROR: Move ${i+1} failed: ${moves[i]}`);
    console.log('Current FEN:', chess.fen());
    break;
  }
  console.log(`${i+1}. ${result.san}`);
}

console.log('\nFinal position:');
console.log(chess.ascii());
console.log('FEN:', chess.fen());
console.log('Turn:', chess.turn());
console.log('');

console.log('Legal moves:');
const legalMoves = chess.moves({ verbose: true });
console.log('Count:', legalMoves.length);
legalMoves.forEach(m => {
  console.log(`  ${m.from}-${m.to}: ${m.san}`);
});
console.log('');

console.log('Can queen move to h4?');
const qh4 = chess.move('Qh4');
if (qh4) {
  console.log('✓ Qh4 is legal!');
  console.log('Move:', qh4);
} else {
  console.log('✗ Qh4 is NOT legal (BUG!)');
  console.log('');
  console.log('Trying with move object:');
  const qh4obj = chess.move({ from: 'd8', to: 'h4' });
  if (qh4obj) {
    console.log('✓ d8-h4 works with object notation');
  } else {
    console.log('✗ d8-h4 also fails with object notation');
  }
}
