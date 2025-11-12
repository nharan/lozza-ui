# Quick Start: Testing Self-Capture Chess

## Fastest Way to See Self-Captures in Action

### Option 1: AI vs AI (Recommended for Quick Testing)

1. **Open the test file:**
   ```bash
   # Open test-ai-vs-ai.html in your browser
   # On Linux:
   xdg-open test-ai-vs-ai.html
   # Or just drag the file into your browser
   ```

2. **Start a game:**
   - Leave both players at Level 3 (default)
   - Click "Start AI vs AI Game"
   - Watch the moves appear in real-time

3. **What to look for:**
   - Moves marked with `[SELF-CAPTURE]` tag
   - Self-capture counter incrementing
   - Game progressing smoothly to completion

4. **Try different settings:**
   - Change White to Level 1, Black to Level 8
   - Run multiple games to see different patterns
   - Higher levels = stronger play but slower moves

### Option 2: Play Against the AI

1. **Open the play interface:**
   ```bash
   # Open play.htm in your browser
   xdg-open play.htm
   ```

2. **Start playing:**
   - Click "Play" → "With white pieces"
   - Select "Strength" → "Level 3" (or your preference)
   - Make moves by dragging pieces

3. **Create self-capture opportunities:**
   - Maneuver your pieces to create tactical positions
   - Try to set up positions where capturing your own piece is beneficial
   - Drag your piece onto your own piece to self-capture

4. **Observe:**
   - Move notation in the move list
   - AI's response to your self-captures
   - Whether AI makes self-captures

### Option 3: Quick Command-Line Test

```bash
node test-ai-vs-ai-quick.js
```

This will show you that self-capture logic is working without needing a browser.

## What You Should See

### In AI vs AI Test:
```
1. White: e4
2. Black: e5
3. White: Nf3
4. Black: Nc6
5. White: Nxe2 [SELF-CAPTURE]  ← Look for this!
...
```

### Statistics Panel:
```
Game Status: Playing
Moves Played: 45
Self-Captures: 3        ← Should increment when self-captures occur
Regular Captures: 12
Current Turn: Black
```

## Common Questions

**Q: How often should self-captures occur?**
A: Self-captures are tactical moves. You might see 0-5 per game depending on the position and AI strength. They're not common but should appear occasionally.

**Q: What if I don't see any self-captures?**
A: This is normal! Self-captures are situational. Try:
- Running multiple AI vs AI games
- Using different strength levels
- Playing manually and creating specific positions

**Q: The AI seems stuck or slow?**
A: Higher strength levels (7-8) take longer to think. This is normal. Try Level 3-5 for faster games.

**Q: How do I know if it's working correctly?**
A: If you can:
1. Start an AI vs AI game without errors
2. See moves being made
3. See the game complete (checkmate/draw)
Then it's working! Self-captures will appear when tactically appropriate.

## Troubleshooting

### Browser Console Errors
If you see errors in the browser console (F12):
1. Check that all files are in the correct locations
2. Verify lozza.js, js/chess.js exist
3. Try refreshing the page

### Game Won't Start
1. Make sure you're using a modern browser (Chrome, Firefox, Edge)
2. Check browser console for errors
3. Verify Web Workers are supported

### Moves Not Appearing
1. Check that JavaScript is enabled
2. Look for errors in console
3. Try a different browser

## Next Steps

Once you've verified the basic functionality:

1. **Read the full testing guide:**
   - Open `MANUAL-TESTING-GUIDE.md`
   - Follow the detailed test procedures
   - Use the testing checklist

2. **Test specific scenarios:**
   - Self-capture with check
   - Self-capture promotion
   - Edge cases from the guide

3. **Document your findings:**
   - Use the issue template in the guide
   - Note any unexpected behavior
   - Track statistics across multiple games

## Quick Reference

| File | Purpose |
|------|---------|
| `test-ai-vs-ai.html` | AI vs AI testing interface |
| `play.htm` | Manual play interface |
| `MANUAL-TESTING-GUIDE.md` | Comprehensive testing procedures |
| `test-ai-vs-ai-quick.js` | Command-line verification |
| `TASK-12.4-MANUAL-TESTING.md` | Implementation summary |

## Support

If you encounter issues:
1. Check the browser console (F12) for errors
2. Review `MANUAL-TESTING-GUIDE.md` for detailed procedures
3. Verify all files are present and in correct locations
4. Try the quick command-line test to verify core logic

---

**Ready to test?** Open `test-ai-vs-ai.html` and click "Start AI vs AI Game"!
