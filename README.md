# Connect 4 Game

A command-line Connect 4 game where you play against an AI opponent.

## How to Play

1. **Start the game:**
   ```bash
   python3 connect4.py
   ```

2. **Game Rules:**
   - You are Player X (goes first)
   - AI is Player O
   - Drop pieces into columns 1-7
   - Get 4 in a row (horizontally, vertically, or diagonally) to win

3. **Making Moves:**
   - The game will display the current board
   - Choose a column number (1-7) to drop your piece
   - The AI will automatically make its move after yours

## Interactive Play

For interactive gameplay with Claude Code:
```python
from connect4 import Connect4
game = Connect4()
game.start_game()
game.play_turn(column_number)  # Your move
```

## Game Board

```
  1 2 3 4 5 6 7
  -------------
|               |
|               |
|               |
|               |
|               |
|               |
  -------------
```

Pieces fall to the lowest available position in each column.

## Winning

- Get 4 of your pieces in a row (horizontal, vertical, or diagonal)
- Game ends when someone wins or the board is full (tie)

Have fun playing!