const Chess = require('./js/chess.js').Chess;

// Simulate what happens in the UI when you try to drag King to f2
const chess = new Chess();

console.log('Testing UI move handling...\n');

// Simplified position with king on e1 and pawn on f2
chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1');

console.log('Position:');
console.log(chess.ascii());
console.log('\nPiece on e1:', chess.get('e1'));
console.log('Piece on f2:', chess.get('f2'));

// This is what the onDrop function does:
const source = 'e1';
const target = 'f2';

console.log('\n--- Simulating onDrop function ---');
console.log(`source: ${source}, target: ${target}`);

// Check the condition
if (target == 'offboard' || target == source) {
    console.log('BLOCKED: offboard or same square');
} else {
    console.log('PASSED: not offboard, not same square');
    
    // Try the move
    const move = chess.move({from: source, to: target, promotion: 'q'});
    
    if (!move) {
        console.log('BLOCKED: chess.move() returned null/false');
        console.log('This would trigger "snapback" in the UI');
    } else {
        console.log('SUCCESS: Move executed');
        console.log('Move details:', move);
    }
}

// Check all available moves
console.log('\n--- All available moves from e1 ---');
const allMoves = chess.moves({ verbose: true, square: 'e1' });
allMoves.forEach(m => {
    console.log(`  ${m.san} (${m.from} -> ${m.to})${m.captured ? ' [captures ' + m.captured + ']' : ''}`);
});
