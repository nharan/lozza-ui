// Test the frozen position from the game
if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== Testing Frozen Position ===\n');

// Recreate the position from the board image
// The FEN notation at bottom shows: 0 1/6 (336 cp) e3c1 e2d1
// This suggests the position after move 10

var chess = new Chess();

// Play the moves shown in the move list
var moves = [
  'e4', 'e5',
  'd3', 'Nc6', 
  'f4', 'd5',
  'fxe5', 'dxe4',
  'Bxb2', 'exd3',
  'Bxd3', 'Qh4+',
  'g3', 'Qb4+',
  'Bc3', 'Qc5',
  'Nf3', 'Qe3+'
];

console.log('Playing moves from the game:');
for (var i = 0; i < moves.length; i++) {
  var move = chess.move(moves[i]);
  if (!move) {
    console.log('Failed to play move ' + (i+1) + ': ' + moves[i]);
    console.log('Current position:');
    console.log(chess.ascii());
    console.log('FEN: ' + chess.fen());
    break;
  }
  console.log((i+1) + '. ' + moves[i]);
}

console.log('\nFinal position:');
console.log(chess.ascii());
console.log('FEN: ' + chess.fen());
console.log('Turn: ' + chess.turn());
console.log('In check: ' + chess.in_check());
console.log('In checkmate: ' + chess.in_checkmate());
console.log('In stalemate: ' + chess.in_stalemate());
console.log('Game over: ' + chess.game_over());

// Get legal moves
var legalMoves = chess.moves({verbose: true});
console.log('\nLegal moves available: ' + legalMoves.length);
if (legalMoves.length > 0) {
  console.log('First 10 moves:');
  for (var i = 0; i < Math.min(10, legalMoves.length); i++) {
    console.log('  ' + legalMoves[i].san);
  }
}

// Check if there are any self-capture moves
var selfCaptures = legalMoves.filter(function(m) {
  var from = chess.get(m.from);
  var to = chess.get(m.to);
  return to && from.color === to.color;
});
console.log('\nSelf-capture moves available: ' + selfCaptures.length);
if (selfCaptures.length > 0) {
  console.log('Self-captures:');
  for (var i = 0; i < selfCaptures.length; i++) {
    console.log('  ' + selfCaptures[i].san);
  }
}
