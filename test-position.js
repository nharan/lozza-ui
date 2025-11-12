const Chess = require('./js/chess.js').Chess;

// From the screenshot, the position appears to be around move 9
// Let me test if Kxf2 is a valid self-capture

const chess = new Chess();

// Try to recreate the position from the move list shown
const moves = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bad', 'Nf6', 'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+', 'Qe2', 'Qxe2+', 'Kxe2'];

console.log('Attempting to recreate position...\n');

for (let i = 0; i < moves.length; i++) {
    const result = chess.move(moves[i]);
    if (!result) {
        console.log(`Failed at move ${i + 1}: ${moves[i]}`);
        break;
    }
    console.log(`${Math.ceil((i+1)/2)}. ${result.san}`);
}

console.log('\nCurrent position:');
console.log(chess.ascii());
console.log('\nFEN:', chess.fen());

// Check if there's a white pawn on f2
const f2 = chess.get('f2');
console.log('\nPiece on f2:', f2);

// Check if king can capture f2
const kingPos = chess.get('e1');
console.log('Piece on e1:', kingPos);

// Try the move
console.log('\nAttempting Kxf2...');
const moves_available = chess.moves({ verbose: true });
const kxf2 = moves_available.find(m => m.from === 'e1' && m.to === 'f2');
console.log('Kxf2 available?', kxf2 ? 'YES' : 'NO');

if (kxf2) {
    console.log('Move details:', kxf2);
    const result = chess.move(kxf2);
    console.log('Move executed:', result ? 'SUCCESS' : 'FAILED');
}

// List all king moves
const kingMoves = moves_available.filter(m => m.piece === 'k');
console.log('\nAll king moves available:', kingMoves.map(m => m.san).join(', '));
