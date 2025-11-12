// Test self-capture while in check - EXACT position from user

const Chess = require('./js/chess.js').Chess;

console.log('=== Testing Self-Capture While in Check ===\n');

// Replay the exact moves from the user
const moves = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6',
  'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+',
  'Qe2', 'Qxe2+', 'Kxe2', 'Bd6', 'Re1', 'O-O',
  'Kf1', 'Bg4', 'Nd4', 'Bxh2', 'g3', 'Bh3+'
];

console.log('Replaying moves from the game...');
const chess = new Chess();

for (let i = 0; i < moves.length; i++) {
  const result = chess.move(moves[i]);
  if (!result) {
    console.log(`ERROR: Move ${i+1} failed: ${moves[i]}`);
    console.log('Current position:', chess.fen());
    break;
  }
}

console.log('\nCurrent position after all moves:');
console.log(chess.ascii());
console.log('FEN:', chess.fen());
console.log('');

// Check if white is in check
console.log('Is white in check?', chess.in_check());
console.log('');

// Get all legal moves
const legalMoves = chess.moves({ verbose: true });
console.log(`Legal moves available: ${legalMoves.length}`);
console.log('Legal moves:', legalMoves.map(m => m.san).join(', '));
console.log('');

// Check specifically for Kxf2
const kxf2 = legalMoves.find(m => m.from === 'f1' && m.to === 'f2');
if (kxf2) {
  console.log('✓ Kxf2 IS a legal move!');
  console.log('  Move details:', kxf2);
} else {
  console.log('✗ Kxf2 is NOT a legal move');
  console.log('  Checking why...');
  
  // Get pseudo-legal moves (before legality check)
  const pseudoMoves = chess.moves({ verbose: true, legal: false });
  const kxf2Pseudo = pseudoMoves.find(m => m.from === 'f1' && m.to === 'f2');
  
  if (kxf2Pseudo) {
    console.log('  ✓ Kxf2 exists as pseudo-legal move (generated)');
    console.log('  Testing if king would still be in check after Kxf2...');
    
    // Manually test
    const testResult = chess.move({ from: 'f1', to: 'f2' });
    if (testResult) {
      console.log('  After Kxf2:');
      console.log(chess.ascii());
      console.log('  Is white in check after Kxf2?', chess.in_check());
      chess.undo();
    } else {
      console.log('  ERROR: Could not make Kxf2 move even though it was generated');
    }
  } else {
    console.log('  ✗ Kxf2 NOT even generated as pseudo-legal move');
    console.log('  This is the BUG - king should be able to capture own pawn on f2');
    console.log('');
    console.log('  Checking what pieces can move from f1:');
    const f1Moves = pseudoMoves.filter(m => m.from === 'f1');
    console.log('  Moves from f1:', f1Moves.map(m => m.san).join(', '));
  }
}

console.log('');
console.log('=== Analysis ===');
console.log('The black bishop on h3 is giving check.');
console.log('The white king on f1 should be able to capture the white pawn on f2 (Kxf2).');
console.log('After Kxf2, the king would be on f2, and the h3 bishop does NOT attack f2.');
console.log('Therefore, Kxf2 SHOULD be a legal move to escape check.');
