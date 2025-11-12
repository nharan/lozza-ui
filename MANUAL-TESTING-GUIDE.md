# Manual Testing Guide for Self-Capture Chess

This guide provides comprehensive manual testing procedures for the self-capture chess implementation.

## Test Environment Setup

### Files Required
- `play.htm` - Main play interface
- `test-ai-vs-ai.html` - AI vs AI testing interface
- `lozza.js` - Chess engine
- `js/chess.js` - Chess logic library

### How to Run Tests
1. Open `test-ai-vs-ai.html` in a web browser for automated AI vs AI testing
2. Open `play.htm` in a web browser for manual play testing

---

## Test Suite 1: AI vs AI Self-Capture Testing

### Purpose
Verify that the AI correctly generates, evaluates, and executes self-capture moves during gameplay.

### Procedure
1. Open `test-ai-vs-ai.html` in your browser
2. Select strength levels for both players (recommend Level 3 for both)
3. Click "Start AI vs AI Game"
4. Observe the game progress

### What to Verify
- ✓ Self-captures are clearly marked with `[SELF-CAPTURE]` tag
- ✓ Self-capture counter increments correctly
- ✓ Regular capture counter increments correctly
- ✓ Move notation is correct (e.g., "Nxf3" for knight self-captures)
- ✓ Game progresses without errors
- ✓ Game ends properly (checkmate, stalemate, or draw)

### Expected Results
- AI should occasionally make self-capture moves when tactically beneficial
- Self-captures should be legal moves according to the rules
- Game should complete without crashes or infinite loops

### Test Variations
Run multiple games with different strength combinations:
- Level 1 vs Level 1 (fast, random play)
- Level 3 vs Level 3 (moderate tactical play)
- Level 5 vs Level 5 (stronger tactical play)
- Level 8 vs Level 8 (deep search)

---

## Test Suite 2: Manual Play Testing

### Purpose
Verify that human players can make self-capture moves and that the UI provides clear feedback.

### Procedure
1. Open `play.htm` in your browser
2. Select "Play with white pieces"
3. Select a strength level (recommend Level 3-5)
4. Play a game attempting to create self-capture opportunities

### Test Cases

#### TC-2.1: Basic Self-Capture
**Setup:** Play until you can create a self-capture opportunity
**Steps:**
1. Maneuver your pieces to create a self-capture scenario
2. Drag your piece to capture your own piece
3. Observe the move execution

**Verify:**
- ✓ Self-capture move is allowed
- ✓ Move is displayed in notation correctly
- ✓ Board updates correctly
- ✓ Captured piece is removed
- ✓ AI responds appropriately

#### TC-2.2: Self-Capture with Check
**Setup:** Create a position where self-capture gives check
**Steps:**
1. Set up a position where capturing your own piece exposes opponent's king
2. Execute the self-capture
3. Verify check is detected

**Verify:**
- ✓ Check is properly indicated
- ✓ AI must respond to check
- ✓ Game state is correct

#### TC-2.3: Self-Capture Promotion
**Setup:** Advance a pawn to 7th rank with own piece on 8th rank
**Steps:**
1. Move pawn to 7th rank
2. Place own piece on promotion square
3. Capture own piece with pawn promotion

**Verify:**
- ✓ Promotion dialog appears (if applicable)
- ✓ Self-capture promotion executes correctly
- ✓ Promoted piece appears on board

---

## Test Suite 3: Edge Cases and Special Positions

### TC-3.1: Self-Capture Castling Interaction
**Position:** Set up where self-capture affects castling rights
**Test:**
1. Create position where rook can self-capture
2. Execute self-capture with rook
3. Verify castling rights are lost

**Verify:**
- ✓ Castling rights updated correctly
- ✓ Castling no longer available after rook self-capture

### TC-3.2: En Passant with Self-Capture
**Position:** Set up en passant scenario with self-capture possibility
**Test:**
1. Create en passant opportunity
2. Verify en passant works normally
3. Test if self-capture affects en passant logic

**Verify:**
- ✓ En passant works correctly
- ✓ Self-capture doesn't break en passant detection

### TC-3.3: Self-Capture Leading to Checkmate
**Position:** Create position where self-capture delivers checkmate
**Test:**
1. Set up position where removing your own piece exposes opponent king
2. Execute self-capture
3. Verify checkmate is detected

**Verify:**
- ✓ Checkmate is properly detected
- ✓ Game ends correctly
- ✓ Winner is correctly identified

### TC-3.4: Self-Capture in Endgame
**Position:** Test self-capture in various endgame scenarios
**Test:**
1. King + Rook vs King - test self-capture of rook
2. King + Pawn vs King - test self-capture of pawn
3. Verify insufficient material detection

**Verify:**
- ✓ Self-capture executes correctly
- ✓ Draw by insufficient material detected when applicable
- ✓ Game state remains consistent

---

## Test Suite 4: AI Behavior at Different Strength Levels

### Purpose
Verify that AI makes reasonable decisions about self-captures at various skill levels.

### Procedure
Test AI behavior at each strength level (1-8) by playing games or using AI vs AI.

### What to Verify

#### Level 1-2 (Beginner)
- ✓ AI makes moves quickly
- ✓ May make poor self-captures
- ✓ Doesn't hang pieces excessively

#### Level 3-4 (Intermediate)
- ✓ AI considers basic tactics
- ✓ Self-captures are somewhat tactical
- ✓ Reasonable move selection

#### Level 5-6 (Advanced)
- ✓ AI searches deeper
- ✓ Self-captures are tactical
- ✓ Good positional understanding

#### Level 7-8 (Expert)
- ✓ Deep tactical search
- ✓ Self-captures are well-calculated
- ✓ Strong overall play

---

## Test Suite 5: UI Feedback and Clarity

### Purpose
Verify that the user interface provides clear feedback for self-capture moves.

### What to Verify

#### Move Notation
- ✓ Self-captures use standard notation (e.g., "Nxf3")
- ✓ Captured piece type is clear
- ✓ Check (+) and checkmate (#) symbols appear correctly

#### Visual Feedback
- ✓ Pieces move smoothly
- ✓ Captured pieces disappear
- ✓ Board updates immediately
- ✓ No visual glitches

#### Game Information
- ✓ Move list is accurate
- ✓ Game status is clear
- ✓ Analysis shows correct evaluation
- ✓ Statistics are accurate (in AI vs AI test)

---

## Test Suite 6: Performance and Stability

### Purpose
Verify that the implementation is stable and performs well.

### Tests

#### TC-6.1: Long Games
**Test:** Play or simulate games with 100+ moves
**Verify:**
- ✓ No memory leaks
- ✓ Performance remains consistent
- ✓ No crashes

#### TC-6.2: Rapid Move Sequences
**Test:** Make moves quickly in succession
**Verify:**
- ✓ All moves process correctly
- ✓ No race conditions
- ✓ UI remains responsive

#### TC-6.3: Multiple Games
**Test:** Play multiple games in sequence
**Verify:**
- ✓ Game state resets correctly
- ✓ No state leakage between games
- ✓ Consistent behavior

---

## Issue Reporting Template

When documenting issues found during testing, use this template:

```
### Issue: [Brief Description]

**Severity:** Critical / High / Medium / Low

**Test Case:** [Which test case revealed this]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Position/FEN (if applicable):**
[FEN string of the position]

**Screenshots/Logs:**
[Any relevant screenshots or console logs]

**Browser/Environment:**
[Browser version, OS, etc.]
```

---

## Testing Checklist

Use this checklist to track testing progress:

### AI vs AI Testing
- [ ] Level 1 vs Level 1 game completed
- [ ] Level 3 vs Level 3 game completed
- [ ] Level 5 vs Level 5 game completed
- [ ] Level 8 vs Level 8 game completed
- [ ] Self-captures observed and verified
- [ ] Game endings verified (checkmate/draw)

### Manual Play Testing
- [ ] Basic self-capture executed
- [ ] Self-capture with check tested
- [ ] Self-capture promotion tested
- [ ] Castling interaction tested
- [ ] En passant interaction tested

### Edge Cases
- [ ] Self-capture checkmate tested
- [ ] Endgame self-captures tested
- [ ] Insufficient material detection tested

### AI Strength Levels
- [ ] Level 1-2 behavior verified
- [ ] Level 3-4 behavior verified
- [ ] Level 5-6 behavior verified
- [ ] Level 7-8 behavior verified

### UI Feedback
- [ ] Move notation verified
- [ ] Visual feedback verified
- [ ] Game information accuracy verified

### Performance
- [ ] Long game stability tested
- [ ] Rapid moves tested
- [ ] Multiple games tested

---

## Summary

After completing all tests, provide a summary:

**Total Tests Executed:** [number]
**Tests Passed:** [number]
**Tests Failed:** [number]
**Issues Found:** [number]

**Overall Assessment:** [Pass/Fail with notes]

**Recommendations:**
- [Any recommendations for improvements]
- [Any concerns or observations]
