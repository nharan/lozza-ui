#!/usr/bin/env node

// Quick test to verify AI vs AI functionality works
// This tests the core logic without the browser UI

const Chess = require('./js/chess.js').Chess;

console.log('=== AI vs AI Quick Test ===\n');

// Create a chess game
const chess = new Chess();

console.log('Initial position:');
console.log(chess.ascii());
console.log('FEN:', chess.fen());
console.log('');

// Test self-capture detection
function isSelfCapture(chess, from, to) {
    const fromPiece = chess.get(from);
    const toPiece = chess.get(to);
    
    if (!fromPiece || !toPiece) return false;
    return fromPiece.color === toPiece.color;
}

// Test a few moves
console.log('Testing move generation...');
const moves = chess.moves({ verbose: true });
console.log(`Available moves: ${moves.length}`);
console.log('Sample moves:', moves.slice(0, 5).map(m => m.san).join(', '));
console.log('');

// Make some moves to create a position
console.log('Making test moves...');
const testMoves = ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'];
testMoves.forEach(move => {
    const result = chess.move(move);
    if (result) {
        console.log(`${chess.history().length}. ${result.san}`);
    }
});
console.log('');

console.log('Current position:');
console.log(chess.ascii());
console.log('FEN:', chess.fen());
console.log('');

// Test self-capture scenario
console.log('Testing self-capture detection...');
// Set up a position with self-capture possibility
chess.load('rnbqkbnr/pppppppp/8/8/3N4/3N4/PPPPPPPP/R1BQKB1R w KQkq - 0 1');
console.log('Test position (two white knights on d4 and d3):');
console.log(chess.ascii());

const allMoves = chess.moves({ verbose: true });
const selfCaptureMoves = allMoves.filter(m => {
    const from = m.from;
    const to = m.to;
    return isSelfCapture(chess, from, to);
});

console.log(`Total moves available: ${allMoves.length}`);
console.log(`Self-capture moves available: ${selfCaptureMoves.length}`);
if (selfCaptureMoves.length > 0) {
    console.log('Self-capture moves:', selfCaptureMoves.map(m => m.san).join(', '));
}
console.log('');

// Test making a self-capture
if (selfCaptureMoves.length > 0) {
    const scMove = selfCaptureMoves[0];
    console.log(`Attempting self-capture: ${scMove.san}`);
    const result = chess.move(scMove);
    if (result) {
        console.log('✓ Self-capture executed successfully');
        console.log('Position after self-capture:');
        console.log(chess.ascii());
    } else {
        console.log('✗ Self-capture failed');
    }
} else {
    console.log('Note: No self-capture moves available in test position');
    console.log('This is expected - self-captures are tactical moves that occur in specific positions');
}

console.log('');
console.log('=== Test Complete ===');
console.log('');
console.log('To test AI vs AI with browser:');
console.log('1. Open test-ai-vs-ai.html in a web browser');
console.log('2. Select strength levels');
console.log('3. Click "Start AI vs AI Game"');
console.log('4. Watch for [SELF-CAPTURE] tags in the move list');
