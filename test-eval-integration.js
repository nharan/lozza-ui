// Integration test for AI evaluation with self-capture positions
// Tests that the evaluation system correctly handles self-captures

console.log('=== Integration Test: AI Evaluation with Self-Captures ===\n');

// Load the chess engine
eval(require('fs').readFileSync('lozza.js', 'utf8'));

console.log('Test 1: Initialize engine and set up position with self-capture opportunity');
try {
  uciNewGame();
  setBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  console.log('Engine initialized: YES');
  console.log('Result: PASS\n');
} catch (e) {
  console.log('Engine initialization failed:', e.message);
  console.log('Result: FAIL\n');
  process.exit(1);
}

console.log('Test 2: Test hasSelfCaptureOpportunity on starting position');
try {
  // Create a test node
  const testNode = new nodeStruct();
  testNode.ply = 0;
  
  // Starting position should have no self-capture opportunities
  const hasOpportunity = hasSelfCaptureOpportunity(testNode, WHITE);
  console.log('Self-capture opportunity in starting position:', hasOpportunity ? 'YES' : 'NO');
  console.log('Expected: NO');
  console.log('Result:', hasOpportunity === 0 ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('Test 3: Test position with adjacent friendly pieces');
try {
  // Set up a position where white has pieces next to each other
  // This creates potential self-capture opportunities
  setBoard('rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR w KQkq - 0 1');
  
  const testNode = new nodeStruct();
  testNode.ply = 0;
  
  // This position has a knight on c3 next to pawns
  const hasOpportunity = hasSelfCaptureOpportunity(testNode, WHITE);
  console.log('Self-capture opportunity with adjacent pieces:', hasOpportunity ? 'YES' : 'NO');
  console.log('Expected: YES (knight can capture pawn)');
  console.log('Result:', hasOpportunity === 1 ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('Test 4: Test evaluate function on normal position');
try {
  setBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const score = evaluate(WHITE);
  console.log('Evaluation score:', score);
  console.log('Score is a number:', typeof score === 'number' ? 'YES' : 'NO');
  console.log('Result:', typeof score === 'number' ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('Test 5: Test getPositionalBonus function');
try {
  // Test positional bonus calculation
  // Moving a piece from e2 to e4 should have a positive bonus
  const bonus = getPositionalBonus(SQE2, SQE4, W_PAWN);
  console.log('Positional bonus (e2->e4 pawn):', bonus);
  console.log('Bonus is a number:', typeof bonus === 'number' ? 'YES' : 'NO');
  console.log('Result:', typeof bonus === 'number' ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('Test 6: Test quickSee with self-capture move');
try {
  // Set up a position and test quickSee
  setBoard('rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR w KQkq - 0 1');
  
  // Create a self-capture move: knight on c3 captures pawn on b2
  const move = (W_KNIGHT << MOVE_FROBJ_BITS) | 
               (W_PAWN << MOVE_TOOBJ_BITS) |
               (SQC3 << MOVE_FR_BITS) | 
               SQB2;
  
  const seeValue = quickSee(WHITE, move);
  console.log('quickSee value for self-capture:', seeValue);
  console.log('quickSee handles self-capture:', typeof seeValue === 'number' ? 'YES' : 'NO');
  console.log('Result:', typeof seeValue === 'number' ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('Test 7: Verify material balance calculations');
try {
  setBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  
  // Material should be equal in starting position
  const wMaterial = wCounts[PAWN] * MATERIAL[PAWN] +
                    wCounts[KNIGHT] * MATERIAL[KNIGHT] +
                    wCounts[BISHOP] * MATERIAL[BISHOP] +
                    wCounts[ROOK] * MATERIAL[ROOK] +
                    wCounts[QUEEN] * MATERIAL[QUEEN];
  
  const bMaterial = bCounts[PAWN] * MATERIAL[PAWN] +
                    bCounts[KNIGHT] * MATERIAL[KNIGHT] +
                    bCounts[BISHOP] * MATERIAL[BISHOP] +
                    bCounts[ROOK] * MATERIAL[ROOK] +
                    bCounts[QUEEN] * MATERIAL[QUEEN];
  
  console.log('White material:', wMaterial);
  console.log('Black material:', bMaterial);
  console.log('Material balanced:', wMaterial === bMaterial ? 'YES' : 'NO');
  console.log('Result:', wMaterial === bMaterial ? 'PASS' : 'FAIL');
  console.log();
} catch (e) {
  console.log('Test failed:', e.message);
  console.log('Result: FAIL\n');
}

console.log('=== All Integration Tests Complete ===');
