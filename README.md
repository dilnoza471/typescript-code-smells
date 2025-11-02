### Code Smell Report

1. **Long Method**
   The `Winner()` method contained repeated logic and was incomplete. It only checked rows for three matching symbols. To improve readability and maintainability, I separated the pattern-checking logic into a dedicated function `checkPattern()`. I also introduced a `Position` interface to store tile position details more cleanly.

2. **Long Parameter List**
   The `AddTileAt()` method had multiple parameters instead of using the existing `Tile` interface. I refactored it to accept a single `Tile` object, reducing the parameter count and improving cohesion.

3. **Repetition and Poor Test Structure**
   The original test file had heavy duplication — identical test steps written multiple times for different cases. I created helper functions such as `playMoves()` (to execute multiple moves in one call) and `expectWinner()` (to check for the correct winner).
   Tests are now grouped logically using `describe()` blocks like _“invalid moves”_ and _“winning conditions”_, improving clarity, organization, and readability.
