// Debug FEN loading

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

console.log('=== FEN Loading Debug ===\n');

var chess = new Chess('4r3/4p3/8/8/8/8/8/4K3 b - - 0 1');
console.log('Loaded FEN: 4r3/4p3/8/8/8/8/8/4K3 b - - 0 1');
console.log(chess.ascii());

console.log('\nPiece at e8:', chess.get('e8'));
console.log('Piece at e7:', chess.get('e7'));
console.log('Piece at e1:', chess.get('e1'));

console.log('\nIs black to move?', chess.turn() === 'b');
console.log('Is white king in check?', chess.in_check());

// Switch to white's turn and check again
chess.move({from: 'e8', to: 'e7'}); // Black rook captures black pawn (self-capture)
console.log('\nAfter Rxe7 (self-capture):');
console.log(chess.ascii());
console.log('Is white king in check?', chess.in_check());
