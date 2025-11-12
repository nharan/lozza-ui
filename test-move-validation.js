// Load chess.js
const { Chess } = require('./js/chess.js');

console.log('=== Self-Capture Move Validation and Execution Tests ===\n');

let passCount = 0;
let failCount = 0;

function test(name, condition, expected) {
  const result = condition === expected;
  console.log(`${name}: ${result ? 'PASS' : 'FAIL'}`);
  if (!result) {
    console.log(`  Expected: ${expected}, Got: ${condition}`);
  }
  if (result) passCount++;
  else failCount++;
  return result;
}

// Test 1: make_move() correctly handles self-capture moves
console.log('Test 1: make_move() handles self-capture of pawn');
let chess = new Chess('4k3/8/8/8/8/4P3/4R3/4K3 w - - 0 1');
console.log('Initial position:\n' + chess.ascii());
const move1 = chess.move({from: 'e2', to: 'e3'});
console.log('After Rxe3 (self-capture):\n' + chess.ascii());
test('  Move executed successfully', move1 !== null, true);
test('  Captured piece recorded', move1 && move1.captured === 'p', true);
test('  Pawn removed from e3', chess.get('e3') && chess.get('e3').type === 'r', true);
console.log();

// Test 2: Captured friendly pieces are removed from the board
console.log('Test 2: Self-captured piece is removed');
chess = new Chess('4k3/8/8/8/6P1/5B2/8/4K3 w - - 0 1');
console.log('Initial position:\n' + chess.ascii());
const move2 = chess.move({from: 'f3', to: 'g4'});
console.log('After Bxg4 (self-capture):\n' + chess.ascii());
test('  Move executed', move2 !== null, true);
test('  Bishop on g4', chess.get('g4') && chess.get('g4').type === 'b', true);
test('  No piece on f3', chess.get('f3') === null, true);
console.log();

// Test 3: undo_move() restores self-captured pieces correctly
console.log('Test 3: undo_move() restores self-captured piece');
chess = new Chess('4k3/8/8/8/8/4P3/4R3/4K3 w - - 0 1');
console.log('Initial position:\n' + chess.ascii());
chess.move({from: 'e2', to: 'e3'});
console.log('After Rxe3:\n' + chess.ascii());
const undone = chess.undo();
console.log('After undo:\n' + chess.ascii());
test('  Undo successful', undone !== null, true);
test('  Rook back on e2', chess.get('e2') && chess.get('e2').type === 'r', true);
test('  Pawn restored on e3', chess.get('e3') && chess.get('e3').type === 'p', true);
test('  Pawn is white', chess.get('e3') && chess.get('e3').color === 'w', true);
console.log();

// Test 4: Move flags (BITS.CAPTURE) are set correctly for self-captures
console.log('Test 4: CAPTURE flag set for self-captures');
chess = new Chess('4k3/8/8/8/8/4P3/4Q3/4K3 w - - 0 1');
const moves = chess.moves({verbose: true, square: 'e2'});
const captureMove = moves.find(m => m.to === 'e3');
test('  Self-capture move found', captureMove !== undefined, true);
test('  CAPTURE flag set', captureMove && captureMove.flags.includes('c'), true);
console.log();

// Test 5: Illegal moves (king captures) are rejected
console.log('Test 5: King captures are rejected');
chess = new Chess('4k3/8/8/8/8/4K3/4R3/8 w - - 0 1');
const kingMoves = chess.moves({verbose: true, square: 'e2'});
const kingCapture = kingMoves.find(m => m.to === 'e3');
test('  Cannot capture friendly king', kingCapture === undefined, true);
console.log();

// Test 6: Moving into check is rejected
console.log('Test 6: Self-capture that leaves king in check is rejected');
chess = new Chess('4k3/8/8/8/4r3/4P3/4K3/8 w - - 0 1');
console.log('Position: White king on e2, white pawn on e3, black rook on e4');
console.log('Board:\n' + chess.ascii());
const move6 = chess.move({from: 'e2', to: 'e3'});
test('  Move rejected (would leave king in check)', move6 === null, true);
console.log();

// Test 7: Castling rights updated when self-capturing rook
console.log('Test 7: Castling rights removed when self-capturing rook');
chess = new Chess('r3k2r/8/8/8/8/8/Q7/R3K2R w KQkq - 0 1');
console.log('Initial position:\n' + chess.ascii());
console.log('Castling rights before: ' + chess.fen().split(' ')[2]);
const move7 = chess.move({from: 'a2', to: 'a1'});
console.log('After Qxa1 (self-capture of rook):\n' + chess.ascii());
const fen = chess.fen();
const castlingRights = fen.split(' ')[2];
console.log('Castling rights after: ' + castlingRights);
test('  Move executed', move7 !== null, true);
test('  Queenside castling removed', !castlingRights.includes('Q'), true);
test('  Kingside castling preserved', castlingRights.includes('K'), true);
console.log();

// Test 8: Fifty-move counter reset when pawn is self-captured
console.log('Test 8: Fifty-move counter reset on pawn self-capture');
chess = new Chess('4k3/8/8/8/8/4P3/4R3/4K3 w - - 10 1');
console.log('Half-moves before: ' + chess.fen().split(' ')[4]);
chess.move({from: 'e2', to: 'e3'});
const halfMoves = chess.fen().split(' ')[4];
console.log('Half-moves after Rxe3: ' + halfMoves);
test('  Fifty-move counter reset', halfMoves === '0', true);
console.log();

// Test 9: Multiple self-captures and undos
console.log('Test 9: Multiple self-captures and undos');
chess = new Chess('4k3/8/8/8/4P3/4P3/4R3/4K3 w - - 0 1');
console.log('Initial position:\n' + chess.ascii());
chess.move({from: 'e2', to: 'e3'});
console.log('After Rxe3:\n' + chess.ascii());
chess.move({from: 'e8', to: 'd8'});
chess.move({from: 'e3', to: 'e4'});
console.log('After Rxe4:\n' + chess.ascii());
test('  Second self-capture executed', chess.get('e4') && chess.get('e4').type === 'r', true);
chess.undo();
console.log('After first undo:\n' + chess.ascii());
test('  Pawn restored on e4', chess.get('e4') && chess.get('e4').type === 'p', true);
chess.undo();
chess.undo();
console.log('After all undos:\n' + chess.ascii());
test('  Back to initial position', chess.get('e3') && chess.get('e3').type === 'p', true);
test('  Rook back on e2', chess.get('e2') && chess.get('e2').type === 'r', true);
console.log();

// Test 10: Self-capture with promotion
console.log('Test 10: Pawn promotion followed by self-capture');
chess = new Chess('8/4P3/4k3/8/8/8/4R3/4K3 w - - 0 1');
console.log('Initial position:\n' + chess.ascii());
const move10a = chess.move({from: 'e7', to: 'e8', promotion: 'q'});
console.log('After e8=Q:\n' + chess.ascii());
test('  Promotion successful', move10a !== null && chess.get('e8') && chess.get('e8').type === 'q', true);
// Now black king moves, then queen can self-capture rook
chess.move({from: 'e6', to: 'd6'});
const move10 = chess.move({from: 'e8', to: 'e2'});
console.log('After Qxe2 (self-capture):\n' + chess.ascii());
test('  Queen captured rook', move10 !== null && move10.captured === 'r', true);
console.log();

// Test 11: FEN generation after self-captures
console.log('Test 11: FEN generation after self-capture');
chess = new Chess('4k3/8/8/8/8/4P3/4R3/4K3 w - - 0 1');
const fenBefore = chess.fen();
chess.move({from: 'e2', to: 'e3'});
const fenAfter = chess.fen();
console.log('FEN before: ' + fenBefore);
console.log('FEN after:  ' + fenAfter);
test('  FEN updated correctly', fenAfter.includes('4k3/8/8/8/8/4R3/8/4K3'), true);
console.log();

// Test 12: Self-capture doesn't affect checkmate detection
console.log('Test 12: Checkmate detection with self-capture available');
chess = new Chess('4k3/4q3/8/8/8/8/4P3/4K3 w - - 0 1');
console.log('Position:\n' + chess.ascii());
console.log('Is checkmate? ' + chess.in_checkmate());
test('  Not checkmate (can self-capture pawn)', !chess.in_checkmate(), true);
const escapeMoves = chess.moves();
console.log('Available moves: ' + escapeMoves.join(', '));
test('  Has legal moves', escapeMoves.length > 0, true);
console.log();

console.log('=== Test Summary ===');
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Total: ${passCount + failCount}`);
console.log(`Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);
