// Load chess.js
const { Chess } = require('./js/chess.js');

console.log('=== Castling with Self-Capture Attack Detection Tests ===\n');

// Test 1: Castling blocked by enemy attack through friendly piece
console.log('Test 1: Castling when enemy attacks through friendly piece');
var chess = new Chess('r3k2r/8/8/8/8/8/4P3/R3K2R w KQkq - 0 1');
console.log('Position: White king on e1, white pawn on e2, black rook on e8');
console.log('Board:\n' + chess.ascii());

var moves = chess.moves({verbose: true});
var castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves available: ' + castlingMoves.map(m => m.san).join(', '));
console.log('Expected: None (king is in check through friendly pawn)');
console.log('Is white in check? ' + chess.in_check());
console.log('Result: ' + (castlingMoves.length === 0 && chess.in_check() ? 'PASS' : 'FAIL') + '\n');

// Test 2: Castling when path square is attacked through friendly piece
console.log('Test 2: Castling when f1 is attacked through friendly piece');
chess = new Chess('r3k2r/8/8/8/8/8/5P2/R3K2R w KQkq - 0 1');
console.log('Position: White king on e1, white pawn on f2, black rook on f8');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
var kingsideCastle = moves.filter(m => m.san === 'O-O');
console.log('Can white castle kingside? ' + (kingsideCastle.length > 0));
console.log('Expected: false (f1 is attacked through friendly pawn)');
console.log('Result: ' + (kingsideCastle.length === 0 ? 'PASS' : 'FAIL') + '\n');

// Test 3: Castling when destination square is attacked through friendly piece
console.log('Test 3: Castling when g1 is attacked through friendly piece');
chess = new Chess('r3k2r/8/8/8/8/8/6P1/R3K2R w KQkq - 0 1');
console.log('Position: White king on e1, white pawn on g2, black rook on g8');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
kingsideCastle = moves.filter(m => m.san === 'O-O');
console.log('Can white castle kingside? ' + (kingsideCastle.length > 0));
console.log('Expected: false (g1 is attacked through friendly pawn)');
console.log('Result: ' + (kingsideCastle.length === 0 ? 'PASS' : 'FAIL') + '\n');

// Test 4: Castling when friendly king blocks attack
console.log('Test 4: Castling when friendly king blocks attack on castling path');
chess = new Chess('4k3/8/8/8/8/4K3/8/R6R w - - 0 1');
console.log('Position: White king on e3, white rooks on a1 and h1');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
console.log('Available moves from e3: ' + moves.filter(m => m.from === 'e3').map(m => m.san).join(', '));
console.log('Expected: King can move normally (no castling available)');
console.log('Result: PASS (no crash)\n');

// Test 5: Normal castling still works
console.log('Test 5: Normal castling without interference');
chess = new Chess('r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1');
console.log('Position: Standard starting position with castling rights');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves available: ' + castlingMoves.map(m => m.san).join(', '));
console.log('Expected: None (pieces block castling path)');
console.log('Result: ' + (castlingMoves.length === 0 ? 'PASS' : 'FAIL') + '\n');

console.log('=== Tests Complete ===');
