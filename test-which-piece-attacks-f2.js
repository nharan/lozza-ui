// Find which black piece is attacking f2

const fs = require('fs');
const chessCode = fs.readFileSync('./js/chess.js', 'utf8');

// Inject debugging into the attacked function
const modifiedCode = chessCode.replace(
  'if (!blocked) return true;',
  `if (!blocked) {
    if (square === 21) { // f2 in 0x88 representation
      console.log('  -> Piece at', algebraic(i), 'type:', piece.type, 'CAN attack f2');
    }
    return true;
  }`
);

// Write modified version
fs.writeFileSync('./js/chess-debug.js', modifiedCode);

// Now use the debug version
delete require.cache[require.resolve('./js/chess.js')];
const Chess = require('./js/chess-debug.js').Chess;

console.log('=== Finding Which Piece Attacks f2 ===\n');

const afterKxf2Fen = 'r4rk1/1pp2ppp/p1p2n2/8/3N4/6Pb/PPPP1P1b/RNB1R1K1 w - - 2 14';

console.log('Position after Kxf2:');
const chess = new Chess(afterKxf2Fen);
console.log(chess.ascii());
console.log('');

console.log('Checking if white king on f2 is in check...');
const inCheck = chess.in_check();
console.log('Result:', inCheck);
console.log('');

// Clean up
fs.unlinkSync('./js/chess-debug.js');
