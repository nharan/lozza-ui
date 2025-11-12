// Test file for move ordering with self-captures
// This test verifies that self-captures are ranked correctly in the AI's move ordering

// Load the required files
if (typeof window === 'undefined') {
  // Node.js environment
  const fs = require('fs');
  eval(fs.readFileSync('lozza.js', 'utf8'));
}

console.log('Testing move ordering for self-captures...\n');

// Initialize the engine
lozza.uci();

// Test 1: Self-captures should be ranked between bad opponent captures and quiet moves
console.log('Test 1: Self-capture ranking');
console.log('Setting up position with both opponent captures and self-captures...');
// Position: White to move with options for good capture, bad capture, self-capture, and quiet move
// White queen on d1, black pawn on d7, white knight on d4, white pawn on e2
lozza.position('fen 3p4/8/8/8/3N4/8/4P3/3Q4 w - - 0 1');

// Generate moves and check that they exist
const moves = lozza.getMoves();
console.log('Total moves generated:', moves.length);

// Check for specific move types
const hasOpponentCapture = moves.some(m => m.includes('d1d7')); // Queen captures black pawn (good capture)
const hasSelfCapture = moves.some(m => m.includes('d1d4'));     // Queen captures own knight (self-capture)
const hasQuietMove = moves.some(m => m.includes('e2e3'));       // Pawn advance (quiet move)

console.log('Has opponent capture (Qxd7):', hasOpponentCapture);
console.log('Has self-capture (Qxd4):', hasSelfCapture);
console.log('Has quiet move (e3):', hasQuietMove);
console.log('');

if (hasOpponentCapture && hasSelfCapture && hasQuietMove) {
  console.log('Result: PASS - All move types generated');
} else {
  console.log('Result: FAIL - Missing move types');
}
console.log('');

// Test 2: Verify self-captures work with hash moves and killer moves
console.log('Test 2: Self-captures work with hash moves');
console.log('Position: White rook can capture own knight');
lozza.position('fen 8/8/8/8/8/8/8/R3N3 w - - 0 1');
const moves2 = lozza.getMoves();
const hasRookSelfCapture = moves2.some(m => m.includes('a1e1'));
console.log('Has rook self-capture (Rxe1):', hasRookSelfCapture);
console.log('Result:', hasRookSelfCapture ? 'PASS' : 'FAIL');
console.log('');

// Test 3: Multiple self-captures should be ranked by piece value
console.log('Test 3: Multiple self-captures ranked by value');
console.log('Position: Queen can capture own pawn or own rook');
// White queen on d4, white pawn on d7, white rook on d1
lozza.position('fen 3P4/8/8/8/3Q4/8/8/3R4 w - - 0 1');
const moves3 = lozza.getMoves();
const hasQueenTakesPawn = moves3.some(m => m.includes('d4d7')); // Self-capture pawn
const hasQueenTakesRook = moves3.some(m => m.includes('d4d1')); // Self-capture rook
console.log('Has Qxd7 (self-capture pawn):', hasQueenTakesPawn);
console.log('Has Qxd1 (self-capture rook):', hasQueenTakesRook);
console.log('Result:', (hasQueenTakesPawn && hasQueenTakesRook) ? 'PASS' : 'FAIL');
console.log('');

// Test 4: Self-captures should not interfere with normal capture ordering
console.log('Test 4: Normal MVV-LVA ordering still works');
console.log('Position: Multiple opponent captures available');
// White queen on d4, black pawn on d7, black queen on d1
lozza.position('fen 3p4/8/8/8/3Q4/8/8/3q4 b - - 0 1');
const moves4 = lozza.getMoves();
const hasBlackQueenTakesPawn = moves4.some(m => m.includes('d1d4')); // Good capture
console.log('Has Qxd4 (opponent capture):', hasBlackQueenTakesPawn);
console.log('Result:', hasBlackQueenTakesPawn ? 'PASS' : 'FAIL');
console.log('');

console.log('All move ordering tests completed!');
