// Test if f2 is attacked after Kxf2

const Chess = require('./js/chess.js').Chess;

console.log('=== Testing if f2 is Attacked After Kxf2 ===\n');

// Replay to the position
const moves = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6',
  'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+',
  'Qe2', 'Qxe2+', 'Kxe2', 'Bd6', 'Re1', 'O-O',
  'Kf1', 'Bg4', 'Nd4', 'Bxh2', 'g3', 'Bh3+'
];

const chess = new Chess();
moves.forEach(m => chess.move(m));

console.log('Current position (before Kxf2):');
console.log(chess.ascii());
console.log('FEN:', chess.fen());
console.log('White in check?', chess.in_check());
console.log('');

// Manually simulate Kxf2 by loading a FEN
const currentFen = chess.fen();
// Parse FEN and manually move king from f1 to f2
const fenParts = currentFen.split(' ');
let board = fenParts[0];

// Replace the board part: King on f1 -> f2, remove pawn from f2
// Current: PPPP1P1b/RNB1RK2
// After Kxf2: PPPP1P1b/RNB1R1K1

const afterKxf2Fen = 'r4rk1/1pp2ppp/p1p2n2/8/3N4/6Pb/PPPP1K1b/RNB1R3 w - - 2 14';

console.log('Simulating position after Kxf2:');
const chess2 = new Chess(afterKxf2Fen);
console.log(chess2.ascii());
console.log('FEN:', chess2.fen());
console.log('White in check?', chess2.in_check());
console.log('');

if (chess2.in_check()) {
  console.log('ERROR: King on f2 is still in check!');
  console.log('This means the attacked() function thinks f2 is attacked by black.');
  console.log('');
  console.log('Black pieces that could attack f2:');
  console.log('- h3 bishop: Can it attack f2? NO (bishop on h3 attacks g2, g4, f5, e6, d7, c8)');
  console.log('- h2 bishop: Can it attack f2? NO (bishop on h2 attacks g1, g3)');
  console.log('- f6 knight: Can it attack f2? NO (knight on f6 can attack e4, g4, h5, h7, g8, e8, d7, d5)');
  console.log('');
  console.log('There is a BUG in the attacked() function!');
} else {
  console.log('✓ King on f2 is NOT in check');
  console.log('This means Kxf2 SHOULD be legal, but something else is filtering it out.');
}
