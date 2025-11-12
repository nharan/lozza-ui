// Load chess.js
const { Chess } = require('./js/chess.js');

console.log('=== Self-Capture Attack Detection Tests ===\n');

// Test 1: Friendly pieces don't block attacks (except kings)
console.log('Test 1: Rook attack through friendly pawn');
var chess = new Chess('4k3/8/8/8/8/4P3/4R3/4K3 w - - 0 1');
console.log('Position: White rook on e2, white pawn on e3, black king on e8');
console.log('Board:\n' + chess.ascii());

var moves = chess.moves({verbose: true});
var rookMoves = moves.filter(m => m.from === 'e2');
var canCaptureE3 = rookMoves.some(m => m.to === 'e3');
console.log('Can rook capture friendly pawn on e3? ' + canCaptureE3);
console.log('Expected: true');
console.log('Result: ' + (canCaptureE3 ? 'PASS' : 'FAIL') + '\n');

// Test 2: Kings still block attacks
console.log('Test 2: Rook cannot capture friendly king');
chess = new Chess('4k3/8/8/8/8/4K3/4R3/8 w - - 0 1');
console.log('Position: White rook on e2, white king on e3, black king on e8');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
rookMoves = moves.filter(m => m.from === 'e2');
var canCaptureKing = rookMoves.some(m => m.to === 'e3');
console.log('Can rook capture friendly king on e3? ' + canCaptureKing);
console.log('Expected: false');
console.log('Result: ' + (!canCaptureKing ? 'PASS' : 'FAIL') + '\n');

// Test 3: Bishop attack through friendly piece
console.log('Test 3: Bishop attack through friendly piece');
chess = new Chess('4k3/8/8/8/6P1/5B2/8/4K3 w - - 0 1');
console.log('Position: White bishop on f3, white pawn on g4, black king on e8');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
var bishopMoves = moves.filter(m => m.from === 'f3');
var canCaptureG4 = bishopMoves.some(m => m.to === 'g4');
console.log('Can bishop capture friendly pawn on g4? ' + canCaptureG4);
console.log('Expected: true');
console.log('Result: ' + (canCaptureG4 ? 'PASS' : 'FAIL') + '\n');

// Test 4: Castling validation - king not in check
console.log('Test 4: Castling when king is not in check');
chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
console.log('Position: Standard castling position for white');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
var castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves available: ' + castlingMoves.map(m => m.san).join(', '));
console.log('Expected: O-O, O-O-O');
console.log('Result: ' + (castlingMoves.length === 2 ? 'PASS' : 'FAIL') + '\n');

// Test 5: Check detection - king in check from rook
console.log('Test 5: King in check from enemy rook');
chess = new Chess('4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
console.log('Position: White king on e1, black rook on e2');
console.log('Board:\n' + chess.ascii());
console.log('Is white king in check? ' + chess.in_check());
console.log('Expected: true');
console.log('Result: ' + (chess.in_check() ? 'PASS' : 'FAIL') + '\n');

// Test 6: Attack detection through friendly piece (not king)
console.log('Test 6: Queen attack through friendly pawn');
chess = new Chess('4k3/8/8/8/4P3/8/4Q3/4K3 w - - 0 1');
console.log('Position: White queen on e2, white pawn on e4, black king on e8');
console.log('Board:\n' + chess.ascii());

moves = chess.moves({verbose: true});
var queenMoves = moves.filter(m => m.from === 'e2');
var canCaptureE4 = queenMoves.some(m => m.to === 'e4');
console.log('Can queen capture friendly pawn on e4? ' + canCaptureE4);
console.log('Expected: true');
console.log('Result: ' + (canCaptureE4 ? 'PASS' : 'FAIL') + '\n');

console.log('=== Tests Complete ===');
