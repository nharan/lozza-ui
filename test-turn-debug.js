// Debug turn and check detection

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== Turn and Check Debug ===\n');

// Black to move
var chess = new Chess('4r3/4p3/8/8/8/8/8/4K3 b - - 0 1');
console.log('Position (black to move):');
console.log(chess.ascii());
console.log('Turn:', chess.turn());
console.log('Is current player (black) in check?', chess.in_check());
console.log('');

// White to move
chess = new Chess('4r3/4p3/8/8/8/8/8/4K3 w - - 0 1');
console.log('Position (white to move):');
console.log(chess.ascii());
console.log('Turn:', chess.turn());
console.log('Is current player (white) in check?', chess.in_check());
console.log('');

// Original castling scenario
chess = new Chess('r3k2r/8/8/8/8/8/4P3/R3K2R w KQkq - 0 1');
console.log('Castling scenario (white to move):');
console.log(chess.ascii());
console.log('Turn:', chess.turn());
console.log('Is current player (white) in check?', chess.in_check());

var moves = chess.moves({verbose: true});
var castlingMoves = moves.filter(m => m.flags.includes('k') || m.flags.includes('q'));
console.log('Castling moves:', castlingMoves.map(m => m.san).join(', '));
