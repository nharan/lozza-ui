const Chess = require('./js/chess.js').Chess;

const chess = new Chess();

console.log('=== Testing Kxf2 after Black makes a move ===\n');

// Play up to the position
const moves = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+', 'Qe2', 'Qxe2+', 'Kxe2'];
moves.forEach(m => chess.move(m));

console.log('After Kxe2, it is Black\'s turn');
console.log('Turn:', chess.turn());
console.log('\nLet Black make a move (e.g., Bd6):');

chess.move('Bd6');
console.log('Black played: Bd6');
console.log('Turn:', chess.turn());

console.log('\nNow it\'s White\'s turn. Testing Kxf2...');
console.log(chess.ascii());

const allMoves = chess.moves({ verbose: true });
const kxf2 = allMoves.find(m => m.from === 'e2' && m.to === 'f2');

if (kxf2) {
    console.log('\n✓ Kxf2 IS available!');
    console.log('Move details:', kxf2);
    
    const result = chess.move(kxf2);
    if (result) {
        console.log('\n✓✓✓ Kxf2 WORKS! ✓✓✓');
        console.log('This is a SELF-CAPTURE (White king captures white pawn)');
        console.log('\nPosition after Kxf2:');
        console.log(chess.ascii());
    }
} else {
    console.log('\n✗ Kxf2 is still not available');
    const kingMoves = allMoves.filter(m => m.piece === 'k');
    console.log('King moves:', kingMoves.map(m => m.san).join(', '));
}
