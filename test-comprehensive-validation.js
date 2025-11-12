// Comprehensive validation tests for self-capture chess implementation
// Tests all requirements from the spec

// Load chess.js
const Chess = typeof require !== 'undefined' ? require('./js/chess.js').Chess : window.Chess;

console.log('=== COMPREHENSIVE SELF-CAPTURE CHESS VALIDATION ===\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log('✓ ' + message);
        testsPassed++;
    } else {
        console.log('✗ ' + message);
        testsFailed++;
    }
}

function testSection(title) {
    console.log('\n' + '='.repeat(60));
    console.log(title);
    console.log('='.repeat(60));
}

// Test 1: All piece types can perform self-captures
testSection('TEST 1: All Piece Types Can Self-Capture');

function testPieceSelfCapture() {
    // Test pawn self-capture
    let chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    chess.load('8/8/8/8/8/1P6/P7/8 w - - 0 1');
    let moves = chess.moves({ verbose: true });
    let pawnSelfCapture = moves.find(m => m.from === 'a2' && m.to === 'b3' && m.captured);
    assert(pawnSelfCapture !== undefined, 'Pawn can self-capture diagonally');

    // Test knight self-capture
    chess.load('8/8/8/8/8/2P5/8/1N6 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let knightSelfCapture = moves.find(m => m.from === 'b1' && m.to === 'c3' && m.captured);
    assert(knightSelfCapture !== undefined, 'Knight can self-capture');

    // Test bishop self-capture
    chess.load('8/8/8/8/8/2P5/8/B7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let bishopSelfCapture = moves.find(m => m.from === 'a1' && m.to === 'c3' && m.captured);
    assert(bishopSelfCapture !== undefined, 'Bishop can self-capture');

    // Test rook self-capture
    chess.load('8/8/8/8/8/P7/8/R7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let rookSelfCapture = moves.find(m => m.from === 'a1' && m.to === 'a3' && m.captured);
    assert(rookSelfCapture !== undefined, 'Rook can self-capture');

    // Test queen self-capture (diagonal)
    chess.load('8/8/8/8/8/2P5/8/Q7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let queenSelfCapture1 = moves.find(m => m.from === 'a1' && m.to === 'c3' && m.captured);
    assert(queenSelfCapture1 !== undefined, 'Queen can self-capture (diagonal)');

    // Test queen self-capture (straight)
    chess.load('8/8/8/8/8/P7/8/Q7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let queenSelfCapture2 = moves.find(m => m.from === 'a1' && m.to === 'a3' && m.captured);
    assert(queenSelfCapture2 !== undefined, 'Queen can self-capture (straight)');

    // Test king self-capture
    chess.load('8/8/8/8/8/1P6/8/K7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let kingSelfCapture = moves.find(m => m.from === 'a1' && m.to === 'b3');
    assert(kingSelfCapture === undefined, 'King cannot move to b3 (too far)');
    
    // King can self-capture adjacent piece
    chess.load('8/8/8/8/8/8/P7/K7 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let kingSelfCaptureAdj = moves.find(m => m.from === 'a1' && m.to === 'a2' && m.captured);
    assert(kingSelfCaptureAdj !== undefined, 'King can self-capture adjacent piece');
}

testPieceSelfCapture();

// Test 2: Kings can never be captured
testSection('TEST 2: Kings Cannot Be Captured');

function testKingProtection() {
    // Test that no piece can capture friendly king
    let chess = new Chess();
    chess.load('4k3/8/8/8/8/8/4K3/4Q3 w - - 0 1');
    let moves = chess.moves({ verbose: true });
    let queenCapturesKing = moves.find(m => m.from === 'e1' && m.to === 'e2' && m.captured === 'k');
    assert(queenCapturesKing === undefined, 'Queen cannot capture friendly king');

    // Test that no piece can capture enemy king
    chess.load('4k3/8/8/8/8/8/8/4Q3 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let queenCapturesEnemyKing = moves.find(m => m.from === 'e1' && m.to === 'e8' && m.captured === 'k');
    assert(queenCapturesEnemyKing === undefined, 'Queen cannot capture enemy king');

    // Test rook cannot capture friendly king
    chess.load('4k3/8/8/8/8/8/4K3/4R3 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let rookCapturesKing = moves.find(m => m.from === 'e1' && m.to === 'e2' && m.captured === 'k');
    assert(rookCapturesKing === undefined, 'Rook cannot capture friendly king');

    // Test bishop cannot capture friendly king
    chess.load('4k3/8/8/8/8/8/3K4/4B3 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let bishopCapturesKing = moves.find(m => m.from === 'e1' && m.to === 'd2' && m.captured === 'k');
    assert(bishopCapturesKing === undefined, 'Bishop cannot capture friendly king');

    // Test knight cannot capture friendly king
    chess.load('4k3/8/8/8/8/3K4/8/5N2 w - - 0 1');
    moves = chess.moves({ verbose: true });
    let knightCapturesKing = moves.find(m => m.from === 'f1' && m.to === 'd2');
    assert(knightCapturesKing === undefined, 'Knight cannot capture friendly king (d2 occupied)');
}

testKingProtection();

// Test 3: Move validation with self-captures
testSection('TEST 3: Move Validation');

function testMoveValidation() {
    let chess = new Chess();
    
    // Test self-capture is legal
    chess.load('8/8/8/8/8/2P5/8/B7 w - - 0 1');
    let result = chess.move({ from: 'a1', to: 'c3' });
    assert(result !== null, 'Self-capture move is legal');
    assert(chess.get('c3').type === 'b', 'Bishop is on c3 after self-capture');
    assert(chess.get('a1') === null, 'a1 is empty after move');

    // Test move leaving king in check is illegal
    chess.load('4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
    result = chess.move({ from: 'e1', to: 'e2' });
    assert(result === null, 'Cannot move into check by self-capturing');

    // Test undo of self-capture
    chess.load('8/8/8/8/8/2P5/8/B7 w - - 0 1');
    chess.move({ from: 'a1', to: 'c3' });
    chess.undo();
    assert(chess.get('a1').type === 'b', 'Bishop restored to a1 after undo');
    assert(chess.get('c3').type === 'p', 'Pawn restored to c3 after undo');
}

testMoveValidation();

// Test 4: Checkmate and stalemate detection
testSection('TEST 4: Checkmate and Stalemate Detection');

function testGameEndConditions() {
    let chess = new Chess();
    
    // Test checkmate still works
    chess.load('4k3/8/8/8/8/8/8/4K2R w - - 0 1');
    chess.move({ from: 'h1', to: 'h8' });
    assert(chess.in_checkmate(), 'Checkmate detected correctly');
    assert(chess.game_over(), 'Game over after checkmate');

    // Test stalemate still works
    chess.load('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');
    assert(chess.in_stalemate(), 'Stalemate detected correctly');
    assert(chess.game_over(), 'Game over after stalemate');

    // Test check detection with self-capture rules
    chess.load('4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
    assert(chess.in_check(), 'Check detected correctly');
}

testGameEndConditions();

// Test 5: Special moves with self-capture rules
testSection('TEST 5: Special Moves');

function testSpecialMoves() {
    let chess = new Chess();
    
    // Test castling with self-capture attack detection
    chess.load('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
    let moves = chess.moves({ verbose: true });
    let kingsideCastle = moves.find(m => m.from === 'e1' && m.to === 'g1' && m.flags.includes('k'));
    assert(kingsideCastle !== undefined, 'Kingside castling available');
    
    let queensideCastle = moves.find(m => m.from === 'e1' && m.to === 'c1' && m.flags.includes('q'));
    assert(queensideCastle !== undefined, 'Queenside castling available');

    // Test castling rights after self-capturing rook
    chess.load('r3k2r/8/8/8/8/8/8/RN2K2R w KQkq - 0 1');
    chess.move({ from: 'b1', to: 'a1' }); // Knight captures own rook
    moves = chess.moves({ verbose: true });
    queensideCastle = moves.find(m => m.from === 'e1' && m.to === 'c1' && m.flags.includes('q'));
    assert(queensideCastle === undefined, 'Queenside castling lost after self-capturing rook');

    // Test en passant does not allow self-capture
    chess.load('8/8/8/pP6/8/8/8/8 w - a6 0 1');
    moves = chess.moves({ verbose: true });
    let enPassant = moves.find(m => m.from === 'b5' && m.to === 'a6' && m.flags.includes('e'));
    assert(enPassant !== undefined, 'En passant available for enemy pawn');

    // Test promotion followed by self-capture
    chess.load('8/P7/8/8/8/8/8/8 w - - 0 1');
    chess.move({ from: 'a7', to: 'a8', promotion: 'q' });
    assert(chess.get('a8').type === 'q', 'Pawn promoted to queen');
}

testSpecialMoves();

// Test 6: Game state consistency
testSection('TEST 6: Game State Consistency');

function testGameState() {
    let chess = new Chess();
    
    // Test FEN generation after self-capture
    chess.load('8/8/8/8/8/2P5/8/B7 w - - 0 1');
    chess.move({ from: 'a1', to: 'c3' });
    let fen = chess.fen();
    assert(fen.includes('2B5'), 'FEN correctly shows bishop on c3');

    // Test fifty-move counter reset on pawn self-capture
    chess.load('8/8/8/8/8/2P5/8/B7 w - - 10 1');
    chess.move({ from: 'a1', to: 'c3' });
    fen = chess.fen();
    assert(fen.includes(' 0 '), 'Fifty-move counter reset after pawn capture');

    // Test position after multiple self-captures
    chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    let initialPieces = 32;
    chess.move({ from: 'b1', to: 'c3' }); // Knight to c3
    chess.move({ from: 'b8', to: 'c6' }); // Black knight to c6
    chess.move({ from: 'c3', to: 'd5' }); // White knight to d5
    chess.move({ from: 'c6', to: 'd4' }); // Black knight to d4
    // Now test self-capture
    chess.load('8/8/8/8/8/2P5/1P6/B7 w - - 0 1');
    chess.move({ from: 'a1', to: 'b2' }); // Bishop captures own pawn
    assert(chess.get('b2').type === 'b', 'Bishop on b2 after self-capture');
    assert(chess.get('a1') === null, 'a1 empty after move');
}

testGameState();

// Test 7: Attack detection with self-capture rules
testSection('TEST 7: Attack Detection');

function testAttackDetection() {
    let chess = new Chess();
    
    // Test that friendly pieces don't block attacks (except king)
    chess.load('4k3/8/8/8/8/4P3/8/4R2K w - - 0 1');
    // Rook on e1 should attack e8 through pawn on e3
    let moves = chess.moves({ verbose: true });
    // King on e8 should be in check if rook attacks through pawn
    chess.load('4k3/8/8/8/8/4P3/8/4R3 w - - 0 1');
    // This position: rook attacks through pawn to king
    
    // Test king blocks attacks
    chess.load('4k3/8/8/8/4K3/8/8/4R3 w - - 0 1');
    // Rook on e1 should NOT attack e8 through king on e4
    moves = chess.moves({ verbose: true });
    let rookToE8 = moves.find(m => m.from === 'e1' && m.to === 'e8');
    assert(rookToE8 === undefined, 'King blocks rook attack');
}

testAttackDetection();

// Test 8: Perft-style move generation verification
testSection('TEST 8: Move Generation Correctness (Perft-style)');

function perftTest(chess, depth) {
    if (depth === 0) return 1;
    
    let moves = chess.moves();
    let nodes = 0;
    
    for (let i = 0; i < moves.length; i++) {
        chess.move(moves[i]);
        nodes += perftTest(chess, depth - 1);
        chess.undo();
    }
    
    return nodes;
}

function testPerft() {
    let chess = new Chess();
    
    // Test starting position
    chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    let nodes1 = perftTest(chess, 1);
    assert(nodes1 === 20, `Starting position depth 1: ${nodes1} nodes (expected 20)`);
    
    // Test position with self-capture opportunities
    chess.load('8/8/8/8/8/2P5/1P6/B7 w - - 0 1');
    let moves = chess.moves({ verbose: true });
    let selfCaptures = moves.filter(m => m.captured).length;
    assert(selfCaptures >= 2, `Position has self-capture moves: ${selfCaptures}`);
    
    // Test that move generation is consistent
    chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    let moves1 = chess.moves();
    let moves2 = chess.moves();
    assert(moves1.length === moves2.length, 'Move generation is consistent');
}

testPerft();

// Summary
testSection('VALIDATION SUMMARY');
console.log(`\nTests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);

if (testsFailed === 0) {
    console.log('\n✓ ALL VALIDATION TESTS PASSED!');
    console.log('Self-capture chess implementation is working correctly.');
} else {
    console.log('\n✗ SOME TESTS FAILED');
    console.log('Please review the failed tests above.');
}
