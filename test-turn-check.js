const Chess = require('./js/chess.js').Chess;

const chess = new Chess();

const moves = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'Bxc6', 'dxc6', 'Nxe5', 'Qd4', 'Nf3', 'Qxe4+', 'Qe2', 'Qxe2+', 'Kxe2'];

moves.forEach(m => chess.move(m));

console.log('After move sequence:');
console.log('Turn:', chess.turn() === 'w' ? 'White' : 'Black');
console.log('Move count:', chess.history().length);
console.log('\n--- The Issue ---');
console.log('After Kxe2 (move 9 by White), it is now BLACK\'s turn');
console.log('You cannot move the White king because it\'s Black\'s turn!');
console.log('\nIn the play interface, you need to wait for the AI to make Black\'s move');
console.log('Then it will be White\'s turn again and you can try Kxf2');
