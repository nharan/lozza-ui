// Debug why Kxf2 fails

const Chess = require('./js/chess.js').Chess;

console.log('=== Debugging Kxf2 Failure ===\n');

// Replay to the position
const moves = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6',
  'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+',
  'Qe2', 'Qxe2+', 'Kxe2', 'Bd6', 'Re1', 'O-O',
  'Kf1', 'Bg4', 'Nd4', 'Bxh2', 'g3', 'Bh3+'
];

const chess = new Chess();
moves.forEach(m => chess.move(m));

console.log('Position:');
console.log(chess.ascii());
console.log('');

// Check what's on f1 and f2
console.log('Piece on f1:', chess.get('f1'));
console.log('Piece on f2:', chess.get('f2'));
console.log('');

// Try to manually construct the Kxf2 move
console.log('Attempting to move king from f1 to f2...');
const result = chess.move({ from: 'f1', to: 'f2' });

if (result) {
  console.log('✓ Move succeeded!');
  console.log('Result:', result);
} else {
  console.log('✗ Move failed!');
  console.log('');
  console.log('Checking all legal moves:');
  const legal = chess.moves({ verbose: true });
  console.log('Legal moves:', legal.map(m => `${m.from}-${m.to} (${m.san})`).join(', '));
  console.log('');
  
  // Check if f2 is in the legal moves for the king
  const kingMoves = legal.filter(m => m.from === 'f1');
  console.log('King can move to:', kingMoves.map(m => m.to).join(', '));
  console.log('');
  
  // Check pseudo-legal
  console.log('Checking pseudo-legal moves (before legality filter):');
  const pseudo = chess.moves({ verbose: true, legal: false });
  const pseudoKingMoves = pseudo.filter(m => m.from === 'f1');
  console.log('King pseudo-legal moves:', pseudoKingMoves.map(m => `${m.to} (${m.san})`).join(', '));
}
