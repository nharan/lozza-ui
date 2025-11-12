// Test special moves with self-capture rules
// Task 10: Handle special moves with self-capture rules
// Tests: castling, en passant, promotion, and combinations

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== Special Moves with Self-Capture Rules Tests ===\n');

let testsPassed = 0;
let testsFailed = 0;

function test(description, actual, expected) {
  if (actual === expected) {
    console.log('  ✓ ' + description);
    testsPassed++;
    return true;
  } else {
    console.log('  ✗ ' + description);
    console.log('    Expected:', expected);
    console.log('    Got:', actual);
    testsFailed++;
    return false;
  }
}

// Test 1: Castling works correctly with self-capture attack detection
console.log('Test 1: Castling with enemy piece blocking attack');
console.log('Position: Enemy rook blocked by friendly piece');
var chess = new Chess('r3k2r/8/8/8/8/8/4P3/R3K2R w KQkq - 0 1');
console.log(chess.ascii());
console.log('Black rook on e8, white pawn on e2 blocks attack to e1');
console.log('In self-capture chess, enemy pieces still block attacks (standard rule)');

var moves = chess.moves({verbose: true});
var castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves: ' + castlingMoves.map(m => m.san).join(', '));

// Enemy piece blocks attack, so castling should be allowed
test('Castling allowed when enemy piece blocks attack', castlingMoves.length, 2);
console.log();

// Test 2: Castling allowed when king blocked by friendly king
console.log('Test 2: Castling when friendly king blocks attack');
chess = new Chess('r3k2r/8/8/8/8/8/4K3/R3K2R w KQkq - 0 1');
console.log(chess.ascii());
console.log('Black rook on e8, white king on e2 blocks attack to e1');
console.log('Kings block attacks since they cannot be captured');

moves = chess.moves({verbose: true});
castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves: ' + castlingMoves.map(m => m.san).join(', '));

// King on e2 blocks the attack, so castling should be allowed
test('Castling allowed when king blocks attack', castlingMoves.length, 2);
console.log();

// Test 3: En passant does not allow capturing friendly pawns
console.log('Test 3: En passant cannot capture friendly pawns');
chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
// Move white pawn two squares
chess.move({from: 'e2', to: 'e4'});
console.log('After e2-e4:');
console.log(chess.ascii());

// Move black pawn next to it
chess.move({from: 'd7', to: 'd5'});
console.log('After d7-d5:');
console.log(chess.ascii());

// Move white pawn next to black pawn
chess.move({from: 'e4', to: 'e5'});
console.log('After e4-e5:');
console.log(chess.ascii());

// Now move another white pawn two squares to create en passant opportunity
chess.move({from: 'a7', to: 'a6'}); // Black moves
chess.move({from: 'd2', to: 'd4'}); // White pawn moves two squares
console.log('After d2-d4 (white pawn two squares):');
console.log(chess.ascii());
console.log('FEN: ' + chess.fen());

// Check if white pawn on e5 can capture white pawn on d4 via en passant
moves = chess.moves({verbose: true, square: 'e5'});
var epMoves = moves.filter(m => m.flags.includes('e'));
console.log('En passant moves from e5: ' + epMoves.map(m => m.san).join(', '));

test('No en passant capture of friendly pawn', epMoves.length, 0);
console.log();

// Test 4: Pawn promotion followed by immediate self-capture
console.log('Test 4: Pawn promotion followed by self-capture');
chess = new Chess('8/4P3/4k3/8/8/8/4R3/4K3 w - - 0 1');
console.log('Initial position:');
console.log(chess.ascii());

// Promote pawn to queen
var promoteMove = chess.move({from: 'e7', to: 'e8', promotion: 'q'});
console.log('After e7-e8=Q:');
console.log(chess.ascii());
test('Promotion successful', promoteMove !== null && chess.get('e8').type === 'q', true);

// Black king moves
chess.move({from: 'e6', to: 'd6'});
console.log('After Kd6:');
console.log(chess.ascii());

// Queen self-captures rook
var selfCaptureMove = chess.move({from: 'e8', to: 'e2'});
console.log('After Qxe2 (self-capture):');
console.log(chess.ascii());
test('Self-capture after promotion works', selfCaptureMove !== null, true);
test('Rook removed from board', chess.get('e2').type === 'q', true);
console.log();

// Test 5: Self-capturing a rook updates castling rights
console.log('Test 5: Self-capturing rook removes castling rights');
chess = new Chess('r3k2r/8/8/8/8/8/Q7/R3K2R w KQkq - 0 1');
console.log('Initial position:');
console.log(chess.ascii());
var fenBefore = chess.fen();
var castlingBefore = fenBefore.split(' ')[2];
console.log('Castling rights before: ' + castlingBefore);

// Queen self-captures rook on a1
var rookCapture = chess.move({from: 'a2', to: 'a1'});
console.log('After Qxa1 (self-capture of rook):');
console.log(chess.ascii());
var fenAfter = chess.fen();
var castlingAfter = fenAfter.split(' ')[2];
console.log('Castling rights after: ' + castlingAfter);

test('Move executed', rookCapture !== null, true);
test('Queenside castling removed', !castlingAfter.includes('Q'), true);
test('Kingside castling preserved', castlingAfter.includes('K'), true);
console.log();

// Test 6: Self-capturing king's rook removes kingside castling
console.log('Test 6: Self-capturing kingside rook');
chess = new Chess('r3k2r/8/8/8/8/8/7Q/R3K2R w KQkq - 0 1');
console.log('Initial position:');
console.log(chess.ascii());
castlingBefore = chess.fen().split(' ')[2];
console.log('Castling rights before: ' + castlingBefore);

// Queen self-captures rook on h1
rookCapture = chess.move({from: 'h2', to: 'h1'});
console.log('After Qxh1 (self-capture of kingside rook):');
console.log(chess.ascii());
castlingAfter = chess.fen().split(' ')[2];
console.log('Castling rights after: ' + castlingAfter);

test('Move executed', rookCapture !== null, true);
test('Kingside castling removed', !castlingAfter.includes('K'), true);
test('Queenside castling preserved', castlingAfter.includes('Q'), true);
console.log();

// Test 7: Castling through squares attacked via self-capture
console.log('Test 7: Castling through attacked squares (self-capture rules)');
chess = new Chess('r3k2r/8/8/8/8/8/3p4/R3K2R w KQkq - 0 1');
console.log('Initial position:');
console.log(chess.ascii());
console.log('Black rook on a8, black pawn on d2');
console.log('Black rook attacks through black pawn to d1 (friendly pieces don\'t block)');

moves = chess.moves({verbose: true});
castlingMoves = moves.filter(m => m.flags.includes('q'));
console.log('Queenside castling moves: ' + castlingMoves.map(m => m.san).join(', '));

// Black pawn doesn't block black rook's attack to d1, so queenside castling should be blocked
test('Queenside castling blocked by attack through friendly piece', castlingMoves.length, 0);
console.log();

// Test 8: Promotion to piece that can immediately self-capture
console.log('Test 8: Promote and self-capture in sequence');
chess = new Chess('8/4P3/8/4k3/8/8/4N3/4K3 w - - 0 1');
console.log('Initial position:');
console.log(chess.ascii());

// Promote to queen
promoteMove = chess.move({from: 'e7', to: 'e8', promotion: 'q'});
console.log('After e7-e8=Q:');
console.log(chess.ascii());
test('Promotion to queen successful', promoteMove !== null, true);

// Black king moves
chess.move({from: 'e5', to: 'd5'});
console.log('After Kd5:');
console.log(chess.ascii());

// Check if promoted queen can self-capture the knight on e2
moves = chess.moves({verbose: true, square: 'e8'});
var queenMoves = moves.filter(m => m.to === 'e2');
console.log('Moves from e8 to e2: ' + queenMoves.length);

// Promoted queen should be able to self-capture the knight on e2
test('Promoted queen can self-capture knight', queenMoves.length > 0, true);

// Execute the self-capture if available
if (queenMoves.length > 0) {
  var captureMove = chess.move(queenMoves[0]);
  console.log('After Qxe2 (self-capture):');
  console.log(chess.ascii());
  test('Self-capture executed', captureMove !== null && chess.get('e2').type === 'q', true);
} else {
  test('Self-capture executed', false, true);
}
console.log();

// Test 9: Complex scenario - castling after self-capture
console.log('Test 9: Castling rights after various self-captures');
chess = new Chess('r3k2r/8/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1');
console.log('Initial position:');
console.log(chess.ascii());

// Self-capture a non-rook piece shouldn't affect castling
var pawnMove = chess.move({from: 'a2', to: 'b2'});
chess.move({from: 'a8', to: 'a7'}); // Black moves
var selfCapture = chess.move({from: 'b2', to: 'c2'});
console.log('After pawn self-captures:');
console.log(chess.ascii());
castlingAfter = chess.fen().split(' ')[2];
console.log('Castling rights: ' + castlingAfter);

test('Castling rights preserved after non-rook self-capture', castlingAfter.includes('K') && castlingAfter.includes('Q'), true);
console.log();

// Test 10: En passant with self-capture rules (standard en passant still works)
console.log('Test 10: Standard en passant still works correctly');
chess = new Chess('rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 1');
console.log('Position with en passant opportunity:');
console.log(chess.ascii());
console.log('FEN: ' + chess.fen());

moves = chess.moves({verbose: true, square: 'e5'});
epMoves = moves.filter(m => m.flags.includes('e'));
console.log('En passant moves from e5: ' + epMoves.map(m => m.san).join(', '));

test('En passant capture of opponent pawn works', epMoves.length, 1);

// Execute en passant
if (epMoves.length > 0) {
  chess.move(epMoves[0]);
  console.log('After en passant:');
  console.log(chess.ascii());
  test('Opponent pawn captured', chess.get('d5') === null, true);
}
console.log();

// Summary
console.log('=== Test Summary ===');
console.log('Tests passed: ' + testsPassed);
console.log('Tests failed: ' + testsFailed);
console.log('Total tests: ' + (testsPassed + testsFailed));

if (testsFailed === 0) {
  console.log('\n✓ All special move tests passed!');
} else {
  console.log('\n✗ Some tests failed. Review the output above.');
}
