# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Playing Connect 4 with Users

### Using the Connect4 MCP Server
This project includes an MCP (Model Context Protocol) server that allows Claude to play Connect 4 games interactively with users through the following tools:

- **mcp__connect4__get_game_status**: Get comprehensive game status including current player, winner, and game over state
- **mcp__connect4__get_board_visual**: Get a visual ASCII representation of the current board state
- **mcp__connect4__get_current_player**: Get the current player whose turn it is
- **mcp__connect4__check_winner**: Check if someone has won the game or if it's a tie
- **mcp__connect4__reset_game**: Reset the game to start a new match
- **mcp__connect4__get_board_csv**: Get the board state as CSV format

### Interactive Gameplay Workflow
1. **Start a new game**: Use `mcp__connect4__reset_game` to initialize a fresh game
2. **Show the board**: Use `mcp__connect4__get_board_visual` to display the current state
3. **Check turn**: Use `mcp__connect4__get_current_player` to see whose turn it is
4. **Use expert**: Use @connect4-strategist which will analyse and play for you.
5. **Check for winner**: Use `mcp__connect4__check_winner` after each move
6. **Game status**: Use `mcp__connect4__get_game_status` for comprehensive information

### AI Strategies
- **IMPORTANT**: Claude must NOT provide any strategic decisions or analysis for Connect 4 gameplay
- When playing Connect 4, always use connect4-strategist to make the next move
- The connect4-strategist expert has expert knowledge of Connect 4 strategy and can analyze board positions
- Always show the board state before delegating to connect4-strategist
- Claude's role is purely facilitative - managing the game interface and delegating strategy and execution to the expert
- **CRITICAL**: The conversation should ONLY end once the game has a winner (or tie) - continue playing until completion