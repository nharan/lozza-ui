// Debug queen move generation

const Chess = require('./js/chess.js').Chess;

const fen = 'rnbqkb1r/ppp2ppp/8/4N2n/3P1p2/8/PPP1Q1PP/RNB1KB1R b KQkq - 0 7';
const chess = new Chess(fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

console.log('Queen is on d8');
console.log('Checking squares the queen should be able to move to:');

const queenMoves = [
  'd7', 'd6', 'd5', 'd4', 'd3', 'd2', 'd1',  // down
  'c8', 'e8',  // horizontal
  'c7', 'b6', 'a5',  // diagonal down-left
  'e7', 'f6', 'g5', 'h4'  // diagonal down-right
];

queenMoves.forEach(sq => {
  const piece = chess.get(sq);
  const result = chess.move({ from: 'd8', to: sq });
  if (result) {
    console.log(`✓ ${sq}: LEGAL (${piece ? piece.color + piece.type : 'empty'})`);
    chess.undo();
  } else {
    console.log(`✗ ${sq}: ILLEGAL (${piece ? piece.color + piece.type : 'empty'})`);
  }
});

console.log('');
console.log('All legal moves for black:');
chess.moves({ verbose: true }).forEach(m => {
  console.log(`  ${m.piece} ${m.from}-${m.to}: ${m.san}`);
});
