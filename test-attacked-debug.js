// Debug attacked() function with self-capture rules

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== Attacked Function Debug ===\n');

// Create a simple position to test
console.log('Test 1: Rook attacks through pawn');
var chess = new Chess('8/8/8/8/8/8/4p3/4r2K b - - 0 1');
console.log(chess.ascii());
console.log('Black rook on e1, black pawn on e2, white king on h1');
console.log('');

// The black rook should attack h1 through the black pawn
// But wait, the rook can't attack diagonally!

// Let me create a better test
console.log('\nTest 2: Rook attacks along file through pawn');
chess = new Chess('4r3/4p3/8/8/8/8/8/4K3 b - - 0 1');
console.log(chess.ascii());
console.log('Black rook on e8, black pawn on e7, white king on e1');
console.log('Rook should attack e1 through pawn (same color)');
console.log('Is white king in check? ' + chess.in_check());
console.log('');

// Now test with white pieces
console.log('\nTest 3: White rook attacks through white pawn');
chess = new Chess('4k3/8/8/8/8/8/4P3/4R3 w - - 0 1');
console.log(chess.ascii());
console.log('White rook on e1, white pawn on e2, black king on e8');
console.log('Rook should attack e8 through pawn (same color)');
console.log('Is black king in check? ' + chess.in_check());
console.log('');

// Test the original scenario
console.log('\nTest 4: Original castling scenario');
chess = new Chess('r3k2r/8/8/8/8/8/4P3/R3K2R w KQkq - 0 1');
console.log(chess.ascii());
console.log('Black rook on e8, white pawn on e2, white king on e1');
console.log('Black rook should attack e1 through white pawn');
console.log('Is white king in check? ' + chess.in_check());

// Check what moves are available for the king
var kingMoves = chess.moves({verbose: true, square: 'e1'});
console.log('King moves from e1: ' + kingMoves.map(m => m.san).join(', '));
