# Connect4 MCP Server

A Model Context Protocol (MCP) server that provides tools to play Connect 4. The server manages a single game instance and provides tools to interact with the game.

## Features

- Single game instance management
- Complete Connect 4 game logic with win detection
- Visual ASCII board representation
- CSV export of board state
- Turn management and game state tracking

## Available Tools

### `get_current_player`
Returns the current player whose turn it is ('X' or 'O').

### `check_winner`
Returns the game status including whether the game is over and who won.

### `place_piece`
Place a piece in the specified column (1-7) for the current player.
- **Parameters**: `column` (number, 1-7)
- **Returns**: Success status and game state updates

### `get_board_visual`
Returns an ASCII visual representation of the current board state.

### `get_board_csv`
Returns the board state as CSV format with each row on a new line.

### `reset_game`
Resets the game to start a new match.

### `get_game_status`
Returns comprehensive game status including current player, winner, game over state, and board state.

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
npm start
```

The server runs on stdio and communicates using the MCP protocol.

## Game Rules

- Connect 4 is played on a 6x7 grid
- Players alternate turns dropping pieces
- First player to connect 4 pieces horizontally, vertically, or diagonally wins
- Player 'X' always goes first
- Game ends in a tie if the board fills up without a winner

## Example Usage

1. Start a new game (automatically initialized)
2. Use `get_current_player` to see whose turn it is
3. Use `place_piece` with column 1-7 to make a move
4. Use `get_board_visual` to see the current board
5. Use `check_winner` to see if someone has won
6. Use `reset_game` to start over