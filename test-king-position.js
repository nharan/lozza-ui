// Check if king position is tracked correctly

const Chess = require('./js/chess.js').Chess;

const afterKxf2Fen = 'r4rk1/1pp2ppp/p1p2n2/8/3N4/6Pb/PPPP1K1b/RNB1R3 w - - 2 14';

const chess = new Chess(afterKxf2Fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

console.log('Piece on f2:', chess.get('f2'));
console.log('Is white in check?', chess.in_check());
console.log('');

// Try moving the king to see if it's recognized
console.log('Legal king moves:');
const moves = chess.moves({ verbose: true });
const kingMoves = moves.filter(m => m.piece === 'k');
kingMoves.forEach(m => {
  console.log(`  ${m.from} -> ${m.to}: ${m.san}`);
});
