// Find what chess.js thinks is attacking the black king

const Chess = require('./js/chess.js').Chess;

const fen = 'rnbqkb1r/ppp2ppp/8/4N2n/3P1p2/8/PPP1Q1PP/RNB1KB1R b KQkq - 0 7';
const chess = new Chess(fen);

console.log('Position:');
console.log(chess.ascii());
console.log('');

console.log('Black king is on e8');
console.log('chess.js says black is in check:', chess.in_check());
console.log('');

console.log('White pieces that could potentially attack e8:');
console.log('- Queen on e2: Can attack e8 vertically if nothing blocks');
console.log('- Knight on e5: Cannot attack e8 (wrong squares)');
console.log('');

console.log('Checking if queen on e2 can see e8:');
console.log('Path from e2 to e8: e3, e4, e5, e6, e7');
console.log('e3: empty');
console.log('e4: empty');
console.log('e5: WHITE KNIGHT');
console.log('e6: empty');
console.log('e7: empty');
console.log('');
console.log('With self-capture rules, the white knight on e5 does NOT block');
console.log('the white queen from attacking e8!');
console.log('So the queen on e2 CAN attack the king on e8 through the knight!');
console.log('');
console.log('This is why Black is in check and Qh4 is illegal!');
