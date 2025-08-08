# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview
This is a single-file Python implementation of Connect 4 with an AI opponent. The game is designed for both command-line play and programmatic interaction.

## Commands
- **Run the game**: `python3 connect4.py`
- **Interactive play**: Import the Connect4 class and use its methods
- **Test syntax**: `python3 -m py_compile connect4.py`

## Architecture
The game is implemented as a single `Connect4` class with the following key components:

### Core Game Logic
- **Board representation**: 6x7 2D array using spaces for empty cells
- **Move validation**: Checks column bounds and availability
- **Win detection**: Checks all four directions (horizontal, vertical, both diagonals) from the last played piece
- **Game state management**: Tracks current player, game over status, and winner

### AI Strategy
- **Simple strategic AI**: Prefers center columns (3, 2, 4, 1, 5, 0, 6) for better positioning
- **Fallback to random**: Uses available columns when preferred ones are full
- **Current limitations**: AI lacks threat detection and blocking capabilities

### Interactive Design
- **Dual interface**: Works both as standalone script and importable module
- **Method-based play**: `start_game()` to initialize, `play_turn(column)` for moves
- **Visual feedback**: ASCII board display with column numbers

The architecture supports both human vs AI gameplay and programmatic control for integration with other systems.

## Game Strategies

### Core Strategic Principles
- **Defense First**: Always prioritize blocking opponent's immediate winning threats before pursuing your own strategy
- **Threat Assessment**: Continuously analyze the board for potential four-in-a-row completions (horizontal, vertical, diagonal)
- **Priority System**: 1) Check if you can win this turn, 2) Check if opponent can win next turn - block if so, 3) Advance your own position

### Strategic Decision Making
- **Center Control**: Center columns (3, 4) provide the most winning opportunities
- **Horizontal Threats**: Watch for three pieces in a row - block the ends immediately  
- **Vertical Stacking**: Building vertical columns can be powerful but don't ignore horizontal threats
- **Diagonal Awareness**: Monitor diagonal patterns which are often overlooked

### Common Tactical Errors
- **Tunnel Vision**: Focusing solely on your own winning combinations while ignoring opponent threats
- **Delayed Blocking**: Failing to immediately block obvious winning opportunities for the opponent
- **Position Over Defense**: Prioritizing strategic positioning over urgent defensive moves

### Expert Play Guidelines
- You are an expert at Connect 4 who analyzes every move for immediate threats
- Always ask: "Can my opponent win on their next turn?" before making any move
- Block first, build second - defensive play often determines the winner

## Playing Connect 4 with Users

### Using the Connect4 MCP Server
This project includes an MCP (Model Context Protocol) server that allows Claude to play Connect 4 games interactively with users through the following tools:

- **mcp__connect4__get_game_status**: Get comprehensive game status including current player, winner, and game over state
- **mcp__connect4__get_board_visual**: Get a visual ASCII representation of the current board state
- **mcp__connect4__get_current_player**: Get the current player whose turn it is
- **mcp__connect4__place_piece**: Place a piece in the specified column (1-7) for the current player
- **mcp__connect4__check_winner**: Check if someone has won the game or if it's a tie
- **mcp__connect4__reset_game**: Reset the game to start a new match
- **mcp__connect4__get_board_csv**: Get the board state as CSV format

### Interactive Gameplay Workflow
1. **Start a new game**: Use `mcp__connect4__reset_game` to initialize a fresh game
2. **Show the board**: Use `mcp__connect4__get_board_visual` to display the current state
3. **Check turn**: Use `mcp__connect4__get_current_player` to see whose turn it is
4. **Make moves**: Use `mcp__connect4__place_piece` with column number (1-7)
5. **Check for winner**: Use `mcp__connect4__check_winner` after each move
6. **Game status**: Use `mcp__connect4__get_game_status` for comprehensive information

### AI Strategies
- When playing Connect 4 use the connect4-strategist subagent to determine which move to play
- The connect4-strategist agent has expert knowledge of Connect 4 strategy and can analyze board positions
- Always show the board state before asking for strategic advice
- Consider both offensive and defensive moves based on the current position