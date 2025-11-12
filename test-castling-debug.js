// Debug castling with self-capture attack detection

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== Castling Debug Test ===\n');

// Test: Enemy rook attacks through friendly piece
console.log('Test: Castling with enemy rook attacking through friendly piece');
var chess = new Chess('r3k2r/8/8/8/8/8/4P3/R3K2R w KQkq - 0 1');
console.log(chess.ascii());
console.log('FEN: ' + chess.fen());
console.log('Black rook on e8, white pawn on e2, white king on e1');
console.log('');

// Check if e1 is attacked by black
console.log('Checking if e1 is attacked by black...');

// Get all moves to see what's available
var moves = chess.moves({verbose: true});
console.log('Total legal moves: ' + moves.length);

var castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves: ' + castlingMoves.map(m => m.san).join(', '));

// Check if king is in check
console.log('Is white king in check? ' + chess.in_check());

// Try to manually check the position
console.log('\nManual check:');
console.log('- Black rook on e8 should attack e1 through white pawn on e2');
console.log('- In self-capture chess, non-king pieces don\'t block attacks');
console.log('- Therefore, e1 should be under attack');
console.log('- Therefore, castling should NOT be allowed');
console.log('');

// Test with king blocking
console.log('\n=== Test 2: King blocks attack ===');
chess = new Chess('r3k2r/8/8/8/8/8/4K3/R3K2R w KQkq - 0 1');
console.log(chess.ascii());
console.log('FEN: ' + chess.fen());
console.log('Black rook on e8, white king on e2 (blocks attack to e1)');
console.log('');

moves = chess.moves({verbose: true});
castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves: ' + castlingMoves.map(m => m.san).join(', '));
console.log('Is white king in check? ' + chess.in_check());
