# Implementation Plan

- [x] 1. Modify chess.js move generation for self-captures
  - Update the `generate_moves()` function to include friendly pieces as capture targets (except kings)
  - Modify sliding piece move generation (bishops, rooks, queens) to not stop at friendly pieces
  - Update pawn capture generation to include friendly pieces on diagonal squares
  - Modify knight and king move generation to include friendly piece captures
  - Add explicit king protection check to prevent king captures
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2_

- [x] 2. Update chess.js attack detection for self-capture rules
  - Modify the `attacked()` function to handle friendly pieces not blocking attacks (except kings)
  - Update sliding piece attack detection to allow attacks through friendly pieces
  - Ensure kings still block attack rays since they cannot be captured
  - Verify check detection works correctly with new attack rules
  - Test castling validation with self-capture-aware attack detection
  - _Requirements: 2.3, 2.4, 2.5, 7.1, 7.4_

- [x] 3. Update chess.js move validation and execution
  - Verify `make_move()` correctly handles self-capture moves
  - Ensure captured friendly pieces are removed from the board
  - Update `undo_move()` to restore self-captured pieces correctly
  - Verify move flags (BITS.CAPTURE) are set correctly for self-captures
  - Test that illegal moves (king captures, moving into check) are rejected
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Update chess.js game state management
  - Verify FEN generation works correctly after self-captures
  - Ensure piece counts are updated accurately
  - Update castling rights when rooks or kings are self-captured
  - Reset fifty-move counter when pawns are self-captured
  - Test position hashing with self-captures
  - _Requirements: 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 5. Modify lozza.js move generation for self-captures
  - Update `genMoves()` function to include friendly pieces as capture targets
  - Modify sliding piece generation to not stop at friendly pieces (except kings)
  - Update pawn, knight, and king move generation for self-captures
  - Ensure move encoding includes correct piece information for self-captures
  - Verify move generation matches chess.js behavior
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2_

- [x] 6. Implement AI move ordering for self-captures
  - Add new constant `BASE_SELFCAPTURE` for self-capture move ranking
  - Modify `addCapture()` function to detect and rank self-captures separately
  - Rank self-captures between bad opponent captures and quiet moves
  - Ensure hash moves and killer moves work with self-captures
  - Test that move ordering improves search efficiency
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Update AI static exchange evaluation (SEE)
  - Modify `quickSee()` function to detect self-captures
  - Implement positional bonus calculation for self-captures
  - Evaluate self-captures based on positional gain vs material loss
  - Add `getPositionalBonus()` helper function
  - Ensure quiescence search handles self-captures correctly
  - _Requirements: 4.4, 5.5_

- [x] 8. Integrate self-captures into AI search
  - Verify `search()` function explores self-capture moves
  - Ensure pruning techniques don't eliminate promising self-captures
  - Test that search extensions work with self-captures
  - Verify principal variation includes self-captures when appropriate
  - Test that AI finds tactical self-capture sequences
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 9. Update AI evaluation for self-capture positions
  - Add `hasSelfCaptureOpportunity()` helper function
  - Verify neural network evaluation handles self-capture positions
  - Test that material balance calculations account for self-captures
  - Ensure evaluation doesn't penalize strategic self-captures excessively
  - Verify AI recognizes positional compensation for self-captures
  - _Requirements: 4.1, 4.2, 4.3, 5.5_

- [x] 10. Handle special moves with self-capture rules
  - Verify castling works correctly with self-capture attack detection
  - Ensure en passant does not allow capturing friendly pawns
  - Test pawn promotion followed by immediate self-capture
  - Verify self-capturing a rook updates castling rights
  - Test all special move combinations with self-captures
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 11. Update move notation and display
  - Verify SAN (Standard Algebraic Notation) generation for self-captures
  - Ensure PGN export includes self-capture moves correctly
  - Test move history display shows self-captures clearly
  - Verify UCI move format works with self-captures
  - Update move formatting to distinguish self-captures if needed
  - _Requirements: 3.5, 8.1_

- [x] 12. Test and validate implementation
  - Run perft tests to verify move generation correctness
  - Test all piece types can perform self-captures
  - Verify kings can never be captured
  - Test checkmate and stalemate detection with self-captures
  - Run AI vs AI games to verify strategic behavior
  - _Requirements: All requirements_

- [x] 12.1 Write unit tests for chess.js modifications
  - Test move generation includes self-captures
  - Test king capture prevention
  - Test attack detection with friendly pieces
  - Test move validation and execution
  - Test game state consistency
  - _Requirements: 1.1-1.5, 2.1-2.5, 3.1-3.5_

- [x] 12.2 Write unit tests for lozza.js modifications
  - Test AI move generation includes self-captures
  - Test move ordering ranks self-captures correctly
  - Test SEE evaluates self-captures properly
  - Test search explores self-capture lines
  - Test evaluation handles self-capture positions
  - _Requirements: 4.1-4.4, 5.1-5.5, 6.1-6.5_

- [x] 12.3 Write integration tests
  - Test chess.js and lozza.js work together
  - Test UI displays self-captures correctly
  - Test complete games with self-captures
  - Test AI makes reasonable self-capture decisions
  - Test performance is acceptable
  - _Requirements: All requirements_

- [x] 12.4 Perform manual testing
  - Play test games with self-captures
  - Verify UI feedback is clear
  - Test edge cases and special positions
  - Verify AI behavior at different strength levels
  - Document any issues found
  - _Requirements: All requirements_
