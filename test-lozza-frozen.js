// Test Lozza AI with the frozen position
const fs = require('fs');

// Load lozza.js
eval(fs.readFileSync('lozza.js', 'utf8'));

console.log('=== Testing Lozza with Frozen Position ===\n');

// Initialize Lozza
var lozza = lozzaInit();

// Set the position
var fen = 'r1b1kbnr/ppp2ppp/2n5/4P3/8/2BBqNP1/P1P4P/RN1QK2R w KQkq - 5 10';
console.log('Setting position: ' + fen);

lozza.uci.position('fen ' + fen);

console.log('Position set. Board state:');
console.log('Turn:', lozza.board.turn === WHITE ? 'white' : 'black');
console.log('White king square:', lozza.board.wKingSq);
console.log('Black king square:', lozza.board.bKingSq);

// Try to generate moves
console.log('\nGenerating moves...');
try {
  var node = lozza.rootNode;
  lozza.board.genMoves(node, lozza.board);
  console.log('Moves generated: ' + node.numMoves);
  
  if (node.numMoves > 0) {
    console.log('First 10 moves:');
    for (var i = 0; i < Math.min(10, node.numMoves); i++) {
      var move = node.moves[i];
      var moveStr = lozza.board.formatMove(move, lozza.board.USE_ALGEBRAIC);
      console.log('  ' + (i+1) + '. ' + moveStr);
    }
  }
  
  // Check for self-captures
  var selfCaptures = 0;
  for (var i = 0; i < node.numMoves; i++) {
    var move = node.moves[i];
    var toObj = (move & lozza.board.MOVE_TOOBJ_MASK) >>> lozza.board.MOVE_TOOBJ_BITS;
    var frObj = (move & lozza.board.MOVE_FROBJ_MASK) >>> lozza.board.MOVE_FROBJ_BITS;
    
    // Check if capturing same color
    if (toObj !== 0 && ((toObj & lozza.board.COLOR_MASK) === (frObj & lozza.board.COLOR_MASK))) {
      selfCaptures++;
    }
  }
  console.log('\nSelf-capture moves: ' + selfCaptures);
  
} catch (e) {
  console.log('ERROR generating moves:', e.message);
  console.log(e.stack);
}

// Try a short search
console.log('\n\nAttempting search (depth 1)...');
try {
  var result = lozza.uci.go('depth 1');
  console.log('Search completed!');
  console.log('Best move:', result);
} catch (e) {
  console.log('ERROR during search:', e.message);
  console.log(e.stack);
}
