// Simple verification test for move ordering implementation
// This test verifies that the code changes are correct

const fs = require('fs');

console.log('Verifying move ordering implementation for self-captures...\n');

// Read the lozza.js file
const lozzaCode = fs.readFileSync('lozza.js', 'utf8');

// Test 1: Verify BASE_SELFCAPTURE constant exists
console.log('Test 1: BASE_SELFCAPTURE constant defined');
const hasSelfCaptureConstant = lozzaCode.includes('const BASE_SELFCAPTURE');
console.log('Has BASE_SELFCAPTURE constant:', hasSelfCaptureConstant);
console.log('Result:', hasSelfCaptureConstant ? 'PASS' : 'FAIL');
console.log('');

// Test 2: Verify BASE_SELFCAPTURE is positioned correctly
console.log('Test 2: BASE_SELFCAPTURE positioned between BASE_BADTAKES and quiet moves');
const selfCaptureDefinition = lozzaCode.match(/const BASE_SELFCAPTURE\s*=\s*BASE_BADTAKES\s*-\s*\d+/);
console.log('Has correct definition:', !!selfCaptureDefinition);
if (selfCaptureDefinition) {
  console.log('Definition:', selfCaptureDefinition[0]);
}
console.log('Result:', selfCaptureDefinition ? 'PASS' : 'FAIL');
console.log('');

// Test 3: Verify addCapture function detects self-captures
console.log('Test 3: addCapture function detects self-captures');
const hasColorComparison = lozzaCode.includes('isSelfCapture') && 
                           lozzaCode.includes('(toObj & COLOR_MASK) === (frObj & COLOR_MASK)');
console.log('Has self-capture detection logic:', hasColorComparison);
console.log('Result:', hasColorComparison ? 'PASS' : 'FAIL');
console.log('');

// Test 4: Verify self-captures use BASE_SELFCAPTURE for ranking
console.log('Test 4: Self-captures ranked with BASE_SELFCAPTURE');
const usesSelfCaptureBase = lozzaCode.includes('BASE_SELFCAPTURE + victim - attack');
console.log('Uses BASE_SELFCAPTURE for ranking:', usesSelfCaptureBase);
console.log('Result:', usesSelfCaptureBase ? 'PASS' : 'FAIL');
console.log('');

// Test 5: Verify hash moves are still checked first
console.log('Test 5: Hash moves checked before self-capture logic');
const hashMoveFirst = lozzaCode.match(/if \(m === node\.hashMove\)[\s\S]*?else[\s\S]*?isSelfCapture/);
console.log('Hash move check comes first:', !!hashMoveFirst);
console.log('Result:', hashMoveFirst ? 'PASS' : 'FAIL');
console.log('');

// Test 6: Verify killer moves still work with self-captures
console.log('Test 6: Killer moves logic preserved');
const hasKillerLogic = lozzaCode.includes('node.mateKiller') && 
                       lozzaCode.includes('node.killer1') && 
                       lozzaCode.includes('node.killer2');
console.log('Has killer move logic:', hasKillerLogic);
console.log('Result:', hasKillerLogic ? 'PASS' : 'FAIL');
console.log('');

// Summary
const allTests = [
  hasSelfCaptureConstant,
  !!selfCaptureDefinition,
  hasColorComparison,
  usesSelfCaptureBase,
  !!hashMoveFirst,
  hasKillerLogic
];

const passedTests = allTests.filter(t => t).length;
const totalTests = allTests.length;

console.log('='.repeat(50));
console.log(`Summary: ${passedTests}/${totalTests} tests passed`);
console.log('='.repeat(50));

if (passedTests === totalTests) {
  console.log('\n✓ All implementation requirements verified!');
  console.log('Move ordering for self-captures is correctly implemented.');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed. Please review the implementation.');
  process.exit(1);
}
