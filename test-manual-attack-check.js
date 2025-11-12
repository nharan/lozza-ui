// Manually check if f2 is attacked

const Chess = require('./js/chess.js').Chess;

console.log('=== Manual Attack Check for f2 ===\n');

const afterKxf2Fen = 'r4rk1/1pp2ppp/p1p2n2/8/3N4/6Pb/PPPP1P1b/RNB1R1K1 w - - 2 14';
const chess = new Chess(afterKxf2Fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

// Get all black pieces
const blackPieces = [];
for (let file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
  for (let rank of ['1', '2', '3', '4', '5', '6', '7', '8']) {
    const square = file + rank;
    const piece = chess.get(square);
    if (piece && piece.color === 'b') {
      blackPieces.push({ square, piece });
    }
  }
}

console.log('Black pieces:');
blackPieces.forEach(p => {
  console.log(`  ${p.square}: ${p.piece.type}`);
});
console.log('');

// Check which pieces can attack f2
console.log('Checking which black pieces can attack f2:');
console.log('');

// h3 bishop
console.log('h3 bishop (light-squared):');
console.log('  Diagonals: h3-g4-f5-e6-d7-c8 and h3-g2-f1');
console.log('  Can attack f2? NO (f2 not on these diagonals)');
console.log('');

// h2 bishop  
console.log('h2 bishop (light-squared):');
console.log('  Diagonals: h2-g3-f4-e5-d6-c7-b8 and h2-g1');
console.log('  Can attack f2? NO (f2 not on these diagonals)');
console.log('  NOTE: g3 has white pawn, but with self-capture rules, friendly pieces don\'t block');
console.log('  So h2 bishop can see through g3 to attack f4, e5, d6, c7, b8');
console.log('  But f2 is still NOT on the diagonal!');
console.log('');

// f6 knight
console.log('f6 knight:');
console.log('  Knight moves: 2 squares in one direction, 1 square perpendicular');
console.log('  From f6: e4, g4, h5, h7, g8, e8, d7, d5');
console.log('  Can attack f2? NO');
console.log('');

console.log('CONCLUSION: No black piece should be able to attack f2!');
console.log('But chess.in_check() returns:', chess.in_check());
console.log('');

// Try to find what chess.js thinks is attacking
console.log('Let me check if there\'s a white piece that chess.js thinks is a black piece...');
console.log('Pieces on rank 2:');
for (let file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
  const square = file + '2';
  const piece = chess.get(square);
  if (piece) {
    console.log(`  ${square}: ${piece.color} ${piece.type}`);
  }
}
