// Test file for lozza.js self-capture move generation
// This test verifies that the AI engine generates self-capture moves correctly

// Load the required files
if (typeof window === 'undefined') {
  // Node.js environment
  const fs = require('fs');
  eval(fs.readFileSync('lozza.js', 'utf8'));
}

console.log('Testing lozza.js self-capture move generation...\n');

// Initialize the engine
lozza.uci();

// Test 1: White pawn can capture own piece diagonally
console.log('Test 1: White pawn self-capture');
lozza.position('fen 8/8/8/8/8/2N5/1P6/8 w - - 0 1');
const moves1 = lozza.getMoves();
const hasPawnSelfCapture = moves1.some(m => m.includes('b2c3'));
console.log('Position: White pawn on b2, white knight on c3');
console.log('Moves generated:', moves1.length);
console.log('Has b2c3 (pawn captures own knight):', hasPawnSelfCapture);
console.log('Expected: true');
console.log('Result:', hasPawnSelfCapture ? 'PASS' : 'FAIL');
console.log('');

// Test 2: Knight can capture own pieces
console.log('Test 2: Knight self-capture');
lozza.position('fen 8/8/8/8/2P5/8/N7/8 w - - 0 1');
const moves2 = lozza.getMoves();
const hasKnightSelfCapture = moves2.some(m => m.includes('a2c3') || m.includes('a2b4'));
console.log('Position: White knight on a2, white pawn on c3 or b4');
console.log('Moves generated:', moves2.length);
console.log('Has knight self-capture:', hasKnightSelfCapture);
console.log('Expected: true');
console.log('Result:', hasKnightSelfCapture ? 'PASS' : 'FAIL');
console.log('');

// Test 3: Rook can capture own pieces (sliding)
console.log('Test 3: Rook self-capture (sliding piece)');
lozza.position('fen 8/8/8/8/8/8/8/R3N3 w - - 0 1');
const moves3 = lozza.getMoves();
const hasRookSelfCapture = moves3.some(m => m.includes('a1e1'));
console.log('Position: White rook on a1, white knight on e1');
console.log('Moves generated:', moves3.length);
console.log('Has a1e1 (rook captures own knight):', hasRookSelfCapture);
console.log('Expected: true');
console.log('Result:', hasRookSelfCapture ? 'PASS' : 'FAIL');
console.log('');

// Test 4: King cannot be captured (even by own pieces)
console.log('Test 4: King cannot be captured');
lozza.position('fen 8/8/8/8/8/8/8/R3K3 w - - 0 1');
const moves4 = lozza.getMoves();
const hasKingCapture = moves4.some(m => m.includes('a1e1'));
console.log('Position: White rook on a1, white king on e1');
console.log('Moves generated:', moves4.length);
console.log('Has a1e1 (rook captures own king):', hasKingCapture);
console.log('Expected: false');
console.log('Result:', !hasKingCapture ? 'PASS' : 'FAIL');
console.log('');

// Test 5: Bishop can capture own pieces (diagonal sliding)
console.log('Test 5: Bishop self-capture (diagonal sliding)');
lozza.position('fen 8/8/8/8/4P3/8/8/B7 w - - 0 1');
const moves5 = lozza.getMoves();
const hasBishopSelfCapture = moves5.some(m => m.includes('a1e5'));
console.log('Position: White bishop on a1, white pawn on e5');
console.log('Moves generated:', moves5.length);
console.log('Has a1e5 (bishop captures own pawn):', hasBishopSelfCapture);
console.log('Expected: true');
console.log('Result:', hasBishopSelfCapture ? 'PASS' : 'FAIL');
console.log('');

console.log('All tests completed!');
