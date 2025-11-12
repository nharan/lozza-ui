const Chess = require('./js/chess.js').Chess;

// Try to recreate the exact position from the screenshot
// The move list shows: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bad Nf6 5. Bxc6 dxc6 6. Nxe5 Qd4 7. Nf3 Qxe4+ 8. Qe2 Qxe2+ 9. Kxe2

const chess = new Chess();

console.log('Recreating position from screenshot...\n');

// Try the moves from the notation
const moves = [
    'e4', 'e5',
    'Nf3', 'Nc6',
    'Bb5', 'a6',
    'Ba4', 'Nf6',  // Assuming "Bad" was "Ba4"
    'Bxc6', 'dxc6',
    'Nxe5', 'Qd4',
    'Nf3', 'Qxe4+',
    'Qe2', 'Qxe2+',
    'Kxe2'
];

for (let i = 0; i < moves.length; i++) {
    const result = chess.move(moves[i]);
    if (!result) {
        console.log(`Failed at move ${i + 1}: ${moves[i]}`);
        console.log('Current position:');
        console.log(chess.ascii());
        console.log('\nFEN:', chess.fen());
        break;
    }
    console.log(`${Math.ceil((i+1)/2)}. ${result.san}`);
}

if (chess.history().length === moves.length) {
    console.log('\n✓ All moves executed successfully!');
    console.log('\nFinal position:');
    console.log(chess.ascii());
    console.log('\nFEN:', chess.fen());
    
    // Check what's on f2
    const f2 = chess.get('f2');
    const e2 = chess.get('e2');
    console.log('\nPiece on e2:', e2);
    console.log('Piece on f2:', f2);
    
    // Now try Kxf2
    console.log('\n--- Testing Kxf2 ---');
    const allMoves = chess.moves({ verbose: true });
    const kxf2 = allMoves.find(m => m.from === 'e2' && m.to === 'f2');
    
    if (kxf2) {
        console.log('✓ Kxf2 is available!');
        console.log('Move details:', kxf2);
        
        const result = chess.move(kxf2);
        if (result) {
            console.log('✓ Kxf2 executed successfully!');
            console.log('Position after Kxf2:');
            console.log(chess.ascii());
        } else {
            console.log('✗ Kxf2 failed to execute');
        }
    } else {
        console.log('✗ Kxf2 is NOT available');
        console.log('\nAll king moves:');
        const kingMoves = allMoves.filter(m => m.piece === 'k');
        kingMoves.forEach(m => console.log('  ' + m.san));
    }
}
