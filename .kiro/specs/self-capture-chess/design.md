# Design Document

## Overview

This design implements self-capture rules in the chess game by modifying the chess.js library for move generation/validation and the lozza.js AI engine for strategic evaluation. The core principle is to treat friendly pieces as capturable targets (except kings) while maintaining all other chess rules including check, checkmate, and special moves.

The implementation follows a two-layer approach:
1. **Chess Engine Layer (chess.js)**: Modify move generation to include self-captures and update validation logic
2. **AI Engine Layer (lozza.js)**: Enhance evaluation and search to recognize self-captures as strategic options

## Architecture

### Component Interaction

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│              (play.htm, board display)                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ├──────────────────┐
                     │                  │
         ┌───────────▼──────────┐  ┌───▼──────────────┐
         │   Chess.js Engine    │  │  Lozza AI Engine │
         │  (Move Gen/Valid)    │  │  (Search/Eval)   │
         └───────────┬──────────┘  └───┬──────────────┘
                     │                  │
                     │  ┌───────────────┘
                     │  │
         ┌───────────▼──▼──────────┐
         │   Board Representation   │
         │   (0x88 board array)     │
         └──────────────────────────┘
```

### Modified Components

1. **chess.js - generate_moves()**: Core move generation function
2. **chess.js - attacked()**: Attack detection for check validation
3. **lozza.js - genMoves()**: AI move generation
4. **lozza.js - addCapture()**: Move ordering for captures
5. **lozza.js - evaluate()**: Position evaluation
6. **lozza.js - quickSee()**: Static exchange evaluation

## Components and Interfaces

### 1. Chess.js Move Generation (generate_moves)

**Current Behavior:**
- Generates moves for each piece type
- Stops at friendly pieces for sliding pieces
- Excludes friendly pieces as capture targets

**Modified Behavior:**
```javascript
// For sliding pieces (bishop, rook, queen)
while (true) {
  square += offset;
  if (square & 0x88) break;
  
  if (board[square] == null) {
    add_move(board, moves, i, square, BITS.NORMAL);
  } else {
    // OLD: if (board[square].color === us) break;
    // NEW: Allow capturing own pieces (except king)
    if (board[square].type === KING) break;  // Never capture kings
    add_move(board, moves, i, square, BITS.CAPTURE);
    break;
  }
  
  if (piece.type === 'n' || piece.type === 'k') break;
}
```

**Key Changes:**
- Remove color check for capture targets
- Add explicit king protection check
- Treat friendly pieces as valid capture targets
- Maintain BITS.CAPTURE flag for self-captures

### 2. Chess.js Attack Detection (attacked)

**Current Behavior:**
- Checks if a square is attacked by a specific color
- Used for check detection and castling validation

**Modified Behavior:**
```javascript
function attacked(color, square) {
  for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
    if (i & 0x88) { i += 7; continue; }
    
    if (board[i] == null || board[i].color !== color) continue;
    
    var piece = board[i];
    var difference = i - square;
    var index = difference + 119;
    
    if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
      // For sliding pieces, check if path is blocked
      if (piece.type === PAWN) {
        // Pawn attack logic unchanged
        if (difference > 0) {
          if (piece.color === WHITE) return true;
        } else {
          if (piece.color === BLACK) return true;
        }
        continue;
      }
      
      if (piece.type === 'n' || piece.type === 'k') return true;
      
      var offset = RAYS[index];
      var j = i + offset;
      var blocked = false;
      
      while (j !== square) {
        // OLD: if (board[j] != null) { blocked = true; break; }
        // NEW: Friendly pieces don't block attacks (can be captured)
        //      But kings still block (can't be captured)
        if (board[j] != null && board[j].type === KING) {
          blocked = true;
          break;
        }
        j += offset;
      }
      
      if (!blocked) return true;
    }
  }
  return false;
}
```

**Key Changes:**
- Friendly pieces no longer block attack rays (except kings)
- Kings still block attacks since they can't be captured
- Attack detection remains accurate for check/checkmate

### 3. Lozza.js Move Generation (genMoves)

**Current Behavior:**
- Generates moves using 0x88 board representation
- Separates captures from quiet moves
- Uses IS_W/IS_B arrays to check piece colors

**Modified Behavior:**
```javascript
// In genMoves function, for sliding pieces:
while (true) {
  to += offset;
  if (IS_O[board[to]]) {
    const toObj = board[to];
    const toPiece = toObj & PIECE_MASK;
    
    // OLD: if (IS_W[toObj]) break;  // Stop at friendly pieces
    // NEW: Allow capturing friendly pieces (except king)
    if (toPiece === KING) break;  // Never capture kings
    
    addCapture(node, move | (toObj << MOVE_TOOBJ_BITS));
    break;
  }
  else if (IS_E[board[to]]) {
    addSlide(node, move);
  }
  else {
    break;  // Off board
  }
}
```

**Key Changes:**
- Check piece type instead of color for blocking
- Kings block movement (can't be captured)
- Non-king friendly pieces are valid capture targets
- Self-captures use same addCapture() function

### 4. Lozza.js Move Ordering (addCapture)

**Current Behavior:**
- Ranks captures using MVV-LVA (Most Valuable Victim - Least Valuable Attacker)
- Separates good captures, even captures, and bad captures

**Modified Behavior:**
```javascript
function addCapture(node, move) {
  const m = move & MOVE_CLEAN_MASK;
  
  if (m === node.hashMove) {
    node.moves[node.numMoves] = move;
    node.ranks[node.numMoves++] = BASE_HASH;
  }
  else {
    const victim = RANK_VECTOR[((move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS) & PIECE_MASK];
    const attack = RANK_VECTOR[((move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS) & PIECE_MASK];
    
    // Determine if this is a self-capture
    const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;
    const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
    const isSelfCapture = (toObj & COLOR_MASK) === (frObj & COLOR_MASK);
    
    if (isSelfCapture) {
      // Self-captures: rank based on positional improvement
      // Lower priority than opponent captures but higher than quiet moves
      node.moves[node.numMoves] = move;
      node.ranks[node.numMoves++] = BASE_SELFCAPTURE + victim - attack;
    }
    else {
      // Normal opponent captures: use existing MVV-LVA logic
      if (victim > attack) {
        node.moves[node.numMoves] = move;
        node.ranks[node.numMoves++] = BASE_GOODTAKES + (victim << 6) - attack;
      }
      else if (victim === attack) {
        node.moves[node.numMoves] = move;
        node.ranks[node.numMoves++] = BASE_EVENTAKES + (victim << 6) - attack;
      }
      else {
        // Bad captures or killer moves
        // ... existing logic ...
      }
    }
  }
}
```

**New Constant:**
```javascript
const BASE_SELFCAPTURE = BASE_BADTAKES - 500;  // Between bad takes and quiet moves
```

**Key Changes:**
- Detect self-captures by comparing piece colors
- Rank self-captures separately from opponent captures
- Self-captures ranked between bad opponent captures and quiet moves
- Allows AI to consider self-captures but prioritizes opponent captures

### 5. Lozza.js Position Evaluation (evaluate)

**Current Behavior:**
- Uses neural network evaluation (NNUE)
- Calculates material balance
- Evaluates piece positioning

**Modified Behavior:**
```javascript
// No direct changes needed to evaluate() function
// The neural network will naturally learn to evaluate positions
// with self-capture opportunities through the existing evaluation

// However, we add a helper function for self-capture detection:
function hasSelfCaptureOpportunity(turn) {
  // Quick check if self-captures are available
  // Used in search extensions and pruning decisions
  const moves = genMoves(node, turn);
  for (let i = 0; i < node.numMoves; i++) {
    const move = node.moves[i];
    const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;
    const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
    if ((toObj & COLOR_MASK) === (frObj & COLOR_MASK)) {
      return true;
    }
  }
  return false;
}
```

**Key Changes:**
- Evaluation function remains largely unchanged
- Neural network will adapt to self-capture positions naturally
- Add utility function to detect self-capture availability
- Can be used for search extensions or pruning decisions

### 6. Lozza.js Static Exchange Evaluation (quickSee)

**Current Behavior:**
- Evaluates tactical exchanges on a square
- Determines if a capture is winning or losing material

**Modified Behavior:**
```javascript
function quickSee(turn, move) {
  const to = (move & MOVE_TO_MASK) >>> MOVE_TO_BITS;
  const fr = (move & MOVE_FR_MASK) >>> MOVE_FR_BITS;
  const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;
  const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
  
  // Check if this is a self-capture
  const isSelfCapture = (toObj & COLOR_MASK) === (frObj & COLOR_MASK);
  
  if (isSelfCapture) {
    // For self-captures, evaluate based on positional improvement
    // Simplified: assume self-captures are neutral or slightly negative
    // unless they clear a critical square or improve piece activity
    
    const victimValue = MATERIAL[(toObj & PIECE_MASK)];
    const attackerValue = MATERIAL[(frObj & PIECE_MASK)];
    
    // Self-capture is "losing" the captured piece's value
    // But may gain positional compensation
    return -victimValue + getPositionalBonus(fr, to, frObj);
  }
  
  // Normal SEE for opponent captures
  // ... existing logic ...
}

function getPositionalBonus(fr, to, piece) {
  // Calculate positional improvement from moving piece
  const pieceType = piece & PIECE_MASK;
  const slideScores = SLIDE_SCORES[piece];
  return (slideScores[to] - slideScores[fr]) * 10;  // Scale factor
}
```

**Key Changes:**
- Detect self-captures in SEE
- Evaluate self-captures based on positional gain vs material loss
- Add positional bonus calculation
- Prevents AI from making bad self-captures in quiescence search

## Data Models

### Move Representation

**Existing Format (32-bit integer):**
```
Bits 0-7:   To square (0x88 format)
Bits 8-15:  From square (0x88 format)
Bits 16-19: Captured piece type and color
Bits 20-23: Moving piece type and color
Bit 24:     Legal flag
Bit 25:     En passant capture
Bit 26:     En passant make
Bit 27:     Castling
Bit 28:     Promotion
Bits 29-30: Promotion piece type
```

**No changes needed** - existing format supports self-captures naturally since it stores both piece colors.

### Board Representation

**chess.js (array-based):**
```javascript
board = new Array(128);  // 0x88 representation
// Each element: null or {type: 'p'|'n'|'b'|'r'|'q'|'k', color: 'w'|'b'}
```

**lozza.js (integer-based):**
```javascript
board = new Uint8Array(144);  // 12x12 representation
// Each element: 0 (empty) or piece code (1-6 for white, 9-14 for black)
```

**No changes needed** - existing representations support self-captures.

## Error Handling

### Invalid Self-Capture Attempts

**Scenario:** User tries to capture their own king
```javascript
// In generate_moves() for chess.js
if (board[square].type === KING) {
  break;  // Don't generate king capture moves
}
```

**Scenario:** Move leaves king in check
```javascript
// Existing validation in make_move()
make_move(move);
if (!king_attacked(us)) {
  legal_moves.push(move);
}
undo_move();
```

### AI Search Edge Cases

**Scenario:** All legal moves are self-captures
```javascript
// In search() function
if (numLegalMoves === 0) {
  if (inCheck !== 0) {
    return -MATE + node.ply;  // Checkmate
  }
  else {
    return 0;  // Stalemate
  }
}
// Self-captures are legal moves, so this works correctly
```

**Scenario:** Self-capture leads to immediate checkmate
```javascript
// Handled by normal alpha-beta search
// AI will avoid self-captures that lead to losing positions
```

## Testing Strategy

### Unit Tests

1. **Move Generation Tests**
   - Test that self-captures are generated for all piece types
   - Test that king captures are never generated
   - Test that self-captures are marked with CAPTURE flag
   - Test move count increases correctly with self-captures

2. **Move Validation Tests**
   - Test that self-captures are accepted as legal
   - Test that moves leaving king in check are rejected
   - Test that self-capturing into check is illegal
   - Test undo/redo of self-capture moves

3. **Attack Detection Tests**
   - Test that friendly pieces don't block attacks (except king)
   - Test that check detection works with self-capture rules
   - Test that castling validation works correctly
   - Test that checkmate detection is accurate

### Integration Tests

1. **Chess.js Integration**
   - Play through games with self-captures
   - Verify FEN generation/parsing works
   - Test PGN notation for self-capture moves
   - Verify game state consistency

2. **Lozza.js Integration**
   - Test AI generates self-capture moves
   - Verify move ordering includes self-captures
   - Test search doesn't crash with self-captures
   - Verify evaluation handles self-capture positions

### Functional Tests

1. **UI Testing**
   - Drag and drop self-captures on board
   - Verify visual feedback for self-captures
   - Test that illegal self-captures are rejected
   - Verify move history displays correctly

2. **AI Behavior Testing**
   - Verify AI considers self-captures strategically
   - Test AI doesn't make random self-captures
   - Verify AI finds tactical self-capture sequences
   - Test AI at different strength levels

### Performance Tests

1. **Move Generation Performance**
   - Benchmark move generation speed
   - Compare with standard chess performance
   - Test perft (performance test) results
   - Verify no memory leaks

2. **AI Search Performance**
   - Measure nodes per second
   - Test search depth achievable
   - Verify pruning still works effectively
   - Test time management

### Edge Case Tests

1. **Special Positions**
   - Test with only kings remaining
   - Test positions with many self-capture options
   - Test endgame positions
   - Test positions with forced self-captures

2. **Special Moves**
   - Test castling with self-capture threats
   - Test en passant (should not allow self-capture)
   - Test promotion followed by self-capture
   - Test self-capture affecting castling rights

## Implementation Notes

### Backward Compatibility

- The changes are not backward compatible with standard chess
- No toggle switch will be implemented
- The game will always use self-capture rules
- Existing saved games may not load correctly

### Performance Considerations

- Self-captures increase branching factor slightly
- Move ordering helps mitigate search overhead
- Pruning techniques remain effective
- Expected performance impact: 5-10% slower search

### Code Organization

- Keep changes localized to move generation functions
- Maintain existing code structure
- Add comments marking self-capture modifications
- Use consistent naming conventions

### Future Enhancements

- Add self-capture statistics to UI
- Implement self-capture puzzles
- Add analysis mode highlighting self-capture tactics
- Create opening book for self-capture chess
