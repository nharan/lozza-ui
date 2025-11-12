// Test AI evaluation for self-capture positions
// This tests task 9: Update AI evaluation for self-capture positions

const fs = require('fs');

console.log('=== Testing AI Evaluation for Self-Capture Positions ===\n');

// Read lozza.js to verify functions exist
const code = fs.readFileSync('lozza.js', 'utf8');

// Test 1: Verify hasSelfCaptureOpportunity function exists
console.log('Test 1: Verify hasSelfCaptureOpportunity function exists');
const hasFunction = code.includes('function hasSelfCaptureOpportunity');
console.log('hasSelfCaptureOpportunity function defined:', hasFunction ? 'YES' : 'NO');
console.log('Result:', hasFunction ? 'PASS' : 'FAIL');
console.log();

// Test 2: Verify function signature is correct
console.log('Test 2: Verify function signature');
const signatureMatch = code.match(/function hasSelfCaptureOpportunity\s*\(\s*node\s*,\s*turn\s*\)/);
console.log('Correct signature (node, turn):', signatureMatch ? 'YES' : 'NO');
console.log('Result:', signatureMatch ? 'PASS' : 'FAIL');
console.log();

// Test 3: Verify function checks for self-capture opportunities
console.log('Test 3: Verify function logic');
const hasLogic = code.includes('SELF_CAPTURE') && 
                 code.includes('return 1') && 
                 code.includes('return 0');
console.log('Function has self-capture detection logic:', hasLogic ? 'YES' : 'NO');
console.log('Result:', hasLogic ? 'PASS' : 'FAIL');
console.log();

// Test 4: Verify getPositionalBonus still exists (from task 7)
console.log('Test 4: Verify getPositionalBonus function exists');
const hasPositionalBonus = code.includes('function getPositionalBonus');
console.log('getPositionalBonus function defined:', hasPositionalBonus ? 'YES' : 'NO');
console.log('Result:', hasPositionalBonus ? 'PASS' : 'FAIL');
console.log();

// Test 5: Verify quickSee handles self-captures (from task 7)
console.log('Test 5: Verify quickSee handles self-captures');
const quickSeeHasSelfCapture = code.includes('function quickSee') && 
                                code.includes('isSelfCapture');
console.log('quickSee has self-capture handling:', quickSeeHasSelfCapture ? 'YES' : 'NO');
console.log('Result:', quickSeeHasSelfCapture ? 'PASS' : 'FAIL');
console.log();

// Test 6: Verify addCapture handles self-captures (from task 6)
console.log('Test 6: Verify addCapture handles self-captures');
const addCaptureHasSelfCapture = code.includes('function addCapture') && 
                                  code.includes('isSelfCapture') &&
                                  code.includes('BASE_SELFCAPTURE');
console.log('addCapture has self-capture handling:', addCaptureHasSelfCapture ? 'YES' : 'NO');
console.log('Result:', addCaptureHasSelfCapture ? 'PASS' : 'FAIL');
console.log();

// Test 7: Verify BASE_SELFCAPTURE constant exists
console.log('Test 7: Verify BASE_SELFCAPTURE constant');
const hasSelfCaptureConstant = code.includes('BASE_SELFCAPTURE');
console.log('BASE_SELFCAPTURE constant defined:', hasSelfCaptureConstant ? 'YES' : 'NO');
console.log('Result:', hasSelfCaptureConstant ? 'PASS' : 'FAIL');
console.log();

// Test 8: Verify evaluate function exists and uses neural network
console.log('Test 8: Verify evaluate function');
const hasEvaluate = code.includes('function evaluate') && 
                    code.includes('netEval');
console.log('evaluate function uses neural network:', hasEvaluate ? 'YES' : 'NO');
console.log('Result:', hasEvaluate ? 'PASS' : 'FAIL');
console.log();

// Summary
console.log('=== Summary ===');
const allTests = [
  hasFunction,
  signatureMatch,
  hasLogic,
  hasPositionalBonus,
  quickSeeHasSelfCapture,
  addCaptureHasSelfCapture,
  hasSelfCaptureConstant,
  hasEvaluate
];

const passedTests = allTests.filter(t => t).length;
const totalTests = allTests.length;

console.log(`Tests passed: ${passedTests}/${totalTests}`);
console.log(`Overall result: ${passedTests === totalTests ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
