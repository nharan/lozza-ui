# Requirements Document

## Introduction

This document specifies the requirements for implementing self-capture rules in the chess game. Self-capture chess is a variant where players can capture their own pieces in addition to opponent pieces, with the exception that the king can never be captured (only checkmated). This modification requires changes to both the move generation/validation logic in chess.js and the AI evaluation strategy in lozza.js to enable the AI to consider self-captures as viable strategic options during planning.

## Glossary

- **Chess Engine**: The core chess.js library that handles move generation, validation, and game state management
- **AI Engine**: The Lozza chess AI (lozza.js) that evaluates positions and selects moves
- **Self-Capture**: A move where a player captures their own piece
- **Move Generator**: The function that generates all possible legal moves for a given position
- **Move Validator**: The logic that determines if a move is legal according to the rules
- **Evaluation Function**: The AI function that assigns a numerical score to a chess position
- **Move Ordering**: The AI's prioritization of which moves to examine first during search
- **Search Tree**: The AI's exploration of possible future positions
- **King Safety**: Rules ensuring the king cannot be captured, only checkmated

## Requirements

### Requirement 1: Enable Self-Capture Move Generation

**User Story:** As a chess player, I want to be able to capture my own pieces (except the king) so that I can use self-capture as a strategic option.

#### Acceptance Criteria

1. WHEN the Move Generator creates moves for any piece, THE Chess Engine SHALL include moves that capture friendly pieces as valid pseudo-legal moves
2. WHEN a pawn can capture diagonally, THE Chess Engine SHALL include diagonal captures of friendly pieces in the move list
3. WHEN a sliding piece (bishop, rook, queen) generates moves, THE Chess Engine SHALL not stop at friendly pieces but include them as capture targets
4. WHEN a knight generates moves, THE Chess Engine SHALL include jumps that land on friendly pieces as captures
5. WHERE a piece can capture either an enemy or friendly piece on the same square, THE Chess Engine SHALL generate only one move for that square

### Requirement 2: Maintain King Safety Rules

**User Story:** As a chess player, I want the king to remain uncapturable so that checkmate remains the only way to end the game.

#### Acceptance Criteria

1. WHEN the Move Generator creates moves, THE Chess Engine SHALL exclude any move that would capture a friendly king
2. WHEN the Move Generator creates moves, THE Chess Engine SHALL exclude any move that would capture an enemy king
3. WHEN validating if a king is in check, THE Chess Engine SHALL use the same attack detection logic as standard chess
4. WHEN determining checkmate, THE Chess Engine SHALL verify that the king has no legal moves and is under attack
5. WHEN determining stalemate, THE Chess Engine SHALL verify that the player has no legal moves and the king is not under attack

### Requirement 3: Update Move Validation Logic

**User Story:** As a chess player, I want moves that capture my own pieces to be validated correctly so that illegal moves are prevented.

#### Acceptance Criteria

1. WHEN a move is validated, THE Chess Engine SHALL accept captures of friendly pieces as legal
2. WHEN a move would leave the king in check, THE Chess Engine SHALL reject the move as illegal
3. WHEN a move captures a friendly piece, THE Chess Engine SHALL update the board state correctly
4. WHEN undoing a move that captured a friendly piece, THE Chess Engine SHALL restore the captured piece correctly
5. WHEN generating FEN notation, THE Chess Engine SHALL represent the board state accurately after self-captures

### Requirement 4: Modify AI Move Evaluation

**User Story:** As a player against the AI, I want the AI to consider self-capture moves strategically so that it can use this rule effectively.

#### Acceptance Criteria

1. WHEN the AI Engine evaluates a position, THE AI Engine SHALL assign appropriate scores to self-capture moves based on positional advantage
2. WHEN the AI Engine orders moves for search, THE AI Engine SHALL include self-capture moves in the appropriate priority categories
3. WHEN the AI Engine calculates material balance, THE AI Engine SHALL account for self-captured pieces correctly
4. WHEN the AI Engine performs static exchange evaluation, THE AI Engine SHALL consider self-captures in the exchange sequence
5. WHEN the AI Engine generates moves in quiescence search, THE AI Engine SHALL include self-captures that improve position

### Requirement 5: Update AI Move Ordering

**User Story:** As a player against the AI, I want the AI to examine promising self-capture moves early in its search so that it finds good self-capture tactics.

#### Acceptance Criteria

1. WHEN the AI Engine ranks moves for search, THE AI Engine SHALL categorize self-captures based on tactical value
2. WHEN a self-capture improves piece positioning significantly, THE AI Engine SHALL rank it higher than quiet moves
3. WHEN a self-capture clears a critical square, THE AI Engine SHALL consider it in the move ordering heuristics
4. WHEN a self-capture is part of a tactical sequence, THE AI Engine SHALL include it in the principal variation
5. WHERE a self-capture sacrifices material for positional gain, THE AI Engine SHALL evaluate the compensation accurately

### Requirement 6: Integrate Self-Capture into AI Search

**User Story:** As a player against the AI, I want the AI to plan multi-move sequences involving self-captures so that it can execute complex self-capture strategies.

#### Acceptance Criteria

1. WHEN the AI Engine searches the game tree, THE AI Engine SHALL explore branches containing self-capture moves
2. WHEN the AI Engine detects a tactical pattern, THE AI Engine SHALL recognize self-captures as part of the pattern
3. WHEN the AI Engine evaluates a position after a self-capture, THE AI Engine SHALL assess the resulting position accurately
4. WHEN the AI Engine uses pruning techniques, THE AI Engine SHALL not prematurely prune promising self-capture lines
5. WHEN the AI Engine extends search depth, THE AI Engine SHALL extend for tactically interesting self-captures

### Requirement 7: Update Special Move Handling

**User Story:** As a chess player, I want special moves (castling, en passant, promotion) to work correctly with self-capture rules so that all chess rules remain consistent.

#### Acceptance Criteria

1. WHEN castling is available, THE Chess Engine SHALL verify that castling squares are not attacked using self-capture-aware attack detection
2. WHEN a pawn promotes, THE Chess Engine SHALL allow the promoted piece to immediately capture friendly pieces
3. WHEN en passant is available, THE Chess Engine SHALL not allow en passant capture of a friendly pawn
4. WHEN checking castling legality, THE Chess Engine SHALL ensure the king does not move through or into check
5. WHEN a pawn reaches the promotion rank, THE Chess Engine SHALL handle promotion normally regardless of self-captures

### Requirement 8: Maintain Game State Consistency

**User Story:** As a chess player, I want the game state to remain consistent after self-captures so that the game progresses correctly.

#### Acceptance Criteria

1. WHEN a self-capture is made, THE Chess Engine SHALL update piece counts accurately
2. WHEN a self-capture is made, THE Chess Engine SHALL update the position hash correctly
3. WHEN a self-capture is made, THE Chess Engine SHALL update castling rights if a rook or king is captured
4. WHEN a self-capture is made, THE Chess Engine SHALL reset the fifty-move counter if a pawn is captured
5. WHEN a self-capture is undone, THE Chess Engine SHALL restore all game state variables to their previous values
