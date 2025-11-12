// Test game state management for self-capture chess
// Tests: FEN generation, piece counts, castling rights, fifty-move counter, position hashing

if (typeof require !== 'undefined') {
  var Chess = require('./js/chess.js').Chess;
}

function testFENGeneration() {
  console.log('\n=== Testing FEN Generation ===');
  var chess = new Chess();
  
  // Test 1: FEN after self-capture
  chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  console.log('Initial FEN:', chess.fen());
  
  // Make a normal move
  chess.move('e4');
  console.log('After e4:', chess.fen());
  
  // Set up a position where self-capture is possible
  // Knight on d5 can capture pawn on f4
  chess.load('rnbqkbnr/pppppppp/8/3N4/5P2/8/PPPPP1PP/RNBQKB1R w KQkq - 0 1');
  console.log('Before self-capture:', chess.fen());
  
  // Self-capture: knight takes own pawn on f4
  var move = chess.move({from: 'd5', to: 'f4'});
  if (move) {
    console.log('After self-capture Nxf4:', chess.fen());
    console.log('Move details:', JSON.stringify(move));
  } else {
    console.log('ERROR: Self-capture move failed!');
  }
  
  console.log('✓ FEN generation test complete');
}

function testCastlingRights() {
  console.log('\n=== Testing Castling Rights ===');
  var chess = new Chess();
  
  // Test 1: Self-capture of rook should remove castling rights
  chess.load('4k3/8/8/8/8/8/8/RK5R w KQ - 0 1');
  console.log('Initial position with castling rights:', chess.fen());
  
  // King on b1 captures rook on a1 (self-capture)
  console.log('King on b1, rook on a1');
  
  var move = chess.move({from: 'b1', to: 'a1'});
  if (move) {
    console.log('After Kxa1 (self-capture):', chess.fen());
    var fen_parts = chess.fen().split(' ');
    var castling = fen_parts[2];
    if (castling.indexOf('Q') === -1 && castling.indexOf('K') === -1) {
      console.log('✓ White castling rights correctly removed');
    } else {
      console.log('ERROR: White castling rights not removed! Castling:', castling);
    }
  } else {
    console.log('ERROR: Self-capture of rook failed!');
  }
  
  // Test 2: Self-capture of h1 rook
  chess.load('4k3/8/8/8/8/8/8/R5KR w KQ - 0 1');
  console.log('\nKing on g1, rook on h1:', chess.fen());
  
  move = chess.move({from: 'g1', to: 'h1'});
  if (move) {
    console.log('After Kxh1 (self-capture h1 rook):', chess.fen());
    var fen_parts = chess.fen().split(' ');
    var castling = fen_parts[2];
    if (castling.indexOf('K') === -1 && castling.indexOf('Q') === -1) {
      console.log('✓ White castling rights correctly removed');
    } else {
      console.log('ERROR: White castling rights not removed! Castling:', castling);
    }
  }
  
  console.log('✓ Castling rights test complete');
}

function testFiftyMoveCounter() {
  console.log('\n=== Testing Fifty-Move Counter ===');
  var chess = new Chess();
  
  // Test 1: Counter resets on self-capture
  chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 10 1');
  console.log('Initial position with half_moves=10:', chess.fen());
  
  // Set up self-capture position
  chess.load('rnbqkbnr/pppppppp/8/3N4/5P2/8/PPPPP1PP/RNBQKB1R w KQkq - 10 5');
  console.log('Before self-capture (half_moves=10):', chess.fen());
  
  var move = chess.move({from: 'd5', to: 'f4'});
  if (move) {
    console.log('After self-capture Nxf4:', chess.fen());
    var fen_parts = chess.fen().split(' ');
    var half_moves = parseInt(fen_parts[4]);
    if (half_moves === 0) {
      console.log('✓ Fifty-move counter correctly reset to 0');
    } else {
      console.log('ERROR: Fifty-move counter not reset! Value:', half_moves);
    }
  }
  
  // Test 2: Counter resets when self-capturing a pawn
  chess.load('rnbqkbnr/pppppppp/8/8/3N4/5P2/PPPPP1PP/RNBQKB1R w KQkq - 15 8');
  console.log('\nBefore self-capturing pawn (half_moves=15):', chess.fen());
  
  move = chess.move({from: 'd4', to: 'f3'});
  if (move) {
    console.log('After Nxf3 (self-capture pawn):', chess.fen());
    var fen_parts = chess.fen().split(' ');
    var half_moves = parseInt(fen_parts[4]);
    if (half_moves === 0) {
      console.log('✓ Fifty-move counter correctly reset when capturing pawn');
    } else {
      console.log('ERROR: Fifty-move counter not reset! Value:', half_moves);
    }
  }
  
  // Test 3: Counter increments on non-capture, non-pawn moves
  chess.load('rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR w KQkq - 0 1');
  console.log('\nBefore quiet move (half_moves=0):', chess.fen());
  
  move = chess.move({from: 'c3', to: 'd5'});
  if (move) {
    console.log('After Nd5 (quiet move):', chess.fen());
    var fen_parts = chess.fen().split(' ');
    var half_moves = parseInt(fen_parts[4]);
    if (half_moves === 1) {
      console.log('✓ Fifty-move counter correctly incremented');
    } else {
      console.log('ERROR: Fifty-move counter incorrect! Value:', half_moves);
    }
  }
  
  console.log('✓ Fifty-move counter test complete');
}

function testPositionHashing() {
  console.log('\n=== Testing Position Hashing (Threefold Repetition) ===');
  var chess = new Chess();
  
  // Create a position that can be repeated
  chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  
  // Make moves that create repetition
  chess.move('Nf3');
  chess.move('Nf6');
  console.log('After Nf3 Nf6:', chess.fen());
  console.log('In threefold repetition?', chess.in_threefold_repetition());
  
  chess.move('Ng1');
  chess.move('Ng8');
  console.log('After Ng1 Ng8 (back to start):', chess.fen());
  console.log('In threefold repetition?', chess.in_threefold_repetition());
  
  chess.move('Nf3');
  chess.move('Nf6');
  chess.move('Ng1');
  chess.move('Ng8');
  console.log('After second repetition:', chess.fen());
  console.log('In threefold repetition?', chess.in_threefold_repetition());
  
  if (chess.in_threefold_repetition()) {
    console.log('✓ Threefold repetition correctly detected');
  } else {
    console.log('ERROR: Threefold repetition not detected!');
  }
  
  // Test with self-capture in the sequence
  chess.load('rnbqkbnr/pppppppp/8/3N4/5P2/8/PPPPP1PP/RNBQKB1R w KQkq - 0 1');
  var fen1 = chess.fen();
  console.log('\nPosition before self-capture:', fen1);
  
  chess.move({from: 'd5', to: 'f4'}); // Self-capture
  var fen2 = chess.fen();
  console.log('Position after self-capture:', fen2);
  
  if (fen1 !== fen2) {
    console.log('✓ FEN correctly different after self-capture');
  } else {
    console.log('ERROR: FEN unchanged after self-capture!');
  }
  
  console.log('✓ Position hashing test complete');
}

function testPieceCountAccuracy() {
  console.log('\n=== Testing Piece Count Accuracy ===');
  var chess = new Chess();
  
  function countPieces(fen) {
    var position = fen.split(' ')[0];
    var counts = {w: 0, b: 0};
    for (var i = 0; i < position.length; i++) {
      var c = position[i];
      if (c >= 'A' && c <= 'Z') counts.w++;
      if (c >= 'a' && c <= 'z') counts.b++;
    }
    return counts;
  }
  
  chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  var initial = countPieces(chess.fen());
  console.log('Initial piece counts - White:', initial.w, 'Black:', initial.b);
  
  // Set up and perform self-capture
  chess.load('rnbqkbnr/pppppppp/8/3N4/5P2/8/PPPPP1PP/RNBQKB1R w KQkq - 0 1');
  var before = countPieces(chess.fen());
  console.log('Before self-capture - White:', before.w, 'Black:', before.b);
  
  chess.move({from: 'd5', to: 'f4'});
  var after = countPieces(chess.fen());
  console.log('After self-capture Nxf4 - White:', after.w, 'Black:', after.b);
  
  if (after.w === before.w - 1) {
    console.log('✓ White piece count correctly decreased by 1');
  } else {
    console.log('ERROR: White piece count incorrect! Expected:', before.w - 1, 'Got:', after.w);
  }
  
  // Test undo
  chess.undo();
  var undone = countPieces(chess.fen());
  console.log('After undo - White:', undone.w, 'Black:', undone.b);
  
  if (undone.w === before.w && undone.b === before.b) {
    console.log('✓ Piece counts correctly restored after undo');
  } else {
    console.log('ERROR: Piece counts not restored! Expected W:', before.w, 'B:', before.b, 'Got W:', undone.w, 'B:', undone.b);
  }
  
  console.log('✓ Piece count accuracy test complete');
}

// Run all tests
console.log('========================================');
console.log('Game State Management Tests');
console.log('========================================');

testFENGeneration();
testCastlingRights();
testFiftyMoveCounter();
testPositionHashing();
testPieceCountAccuracy();

console.log('\n========================================');
console.log('All tests complete!');
console.log('========================================');
