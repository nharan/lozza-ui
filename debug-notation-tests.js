const Chess = require('./js/chess.js').Chess;

console.log('=== Debug Notation Tests ===\n');

// Test 1: Bishop self-capture
console.log('Test 1: Bishop self-capture');
const chess1 = new Chess('rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR w KQkq - 0 1');
console.log('Position:', chess1.fen());
console.log('Board:');
console.log(chess1.ascii());

const moves1 = chess1.moves({ verbose: true });
const bishopMoves = moves1.filter(m => m.piece === 'b');
console.log('\nBishop moves:');
bishopMoves.forEach(m => {
  console.log(`  ${m.from} -> ${m.to}: ${m.san} (flags: ${m.flags})`);
});

// Try the move
const move1 = chess1.move({ from: 'f1', to: 'f3' });
console.log('\nMove result:', move1);

// Test 2: Two knights capturing same square
console.log('\n\nTest 2: Two knights capturing same square');
const chess2 = new Chess('rnbqkbnr/pppppppp/8/8/8/2N2N2/PPPPPPPP/R1BQKB1R w KQkq - 0 1');
console.log('Position:', chess2.fen());
console.log('Board:');
console.log(chess2.ascii());

const moves2 = chess2.moves({ verbose: true });
const knightCaptures = moves2.filter(m => m.piece === 'n' && m.flags.includes('c'));
console.log('\nKnight capture moves:');
knightCaptures.forEach(m => {
  console.log(`  ${m.from} -> ${m.to}: ${m.san} (captured: ${m.captured})`);
});

// Group by target square
const byTarget = {};
knightCaptures.forEach(m => {
  if (!byTarget[m.to]) byTarget[m.to] = [];
  byTarget[m.to].push(m);
});

console.log('\nGrouped by target:');
for (const target in byTarget) {
  console.log(`  ${target}: ${byTarget[target].length} moves`);
  byTarget[target].forEach(m => {
    console.log(`    ${m.from} -> ${m.to}: ${m.san}`);
  });
}
