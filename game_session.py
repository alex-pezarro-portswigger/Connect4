#!/usr/bin/env python3
"""
Connect 4 game session with board visualization after each move
"""
from connect4 import Connect4

# Initialize the game
game = Connect4()
print("🔴 Welcome to Connect 4! 🟡")
print("You are X (🔴), AI is O (🟡)")
print("Enter column numbers 1-7 to make your move")
print()

# Display initial empty board
game.display_board()

def play_human_move(column):
    """Play a human move and return the game state"""
    if game.game_over:
        return "Game is already over!"
    
    if game.current_player != 'X':
        return "It's not your turn!"
    
    try:
        col_index = int(column) - 1
        if col_index < 0 or col_index > 6:
            return "Please enter a column number between 1 and 7"
        
        if not game.is_valid_move(col_index):
            return "That column is full! Choose another column."
        
        # Make the move
        game.make_move(col_index)
        
        print(f"\n🔴 You played column {column}")
        game.display_board()
        
        if game.game_over:
            if game.winner == 'X':
                return "\n🎉 You win! Congratulations!"
            elif game.winner == 'Tie':
                return "\n🤝 It's a tie game!"
        
        return f"\nYour move complete. AI's turn next."
        
    except ValueError:
        return "Please enter a valid column number (1-7)"

def play_ai_move():
    """Play the AI move with strategic analysis"""
    if game.game_over:
        return "Game is already over!"
    
    if game.current_player != 'O':
        return "It's not the AI's turn!"
    
    # Get current board state for analysis
    board_state = []
    for row in game.board:
        board_state.append(''.join(row))
    
    # AI makes its move using the existing logic
    import random
    preferred_cols = [3, 2, 4, 1, 5, 0, 6]
    ai_column = None
    
    for col in preferred_cols:
        if game.is_valid_move(col):
            ai_column = col
            break
    
    if ai_column is not None:
        game.make_move(ai_column)
        print(f"\n🟡 AI played column {ai_column + 1}")
        game.display_board()
        
        if game.game_over:
            if game.winner == 'O':
                return "\n🤖 AI wins!"
            elif game.winner == 'Tie':
                return "\n🤝 It's a tie game!"
        
        return f"\nAI move complete. Your turn!"
    
    return "No valid moves available"

# Game is ready - instructions for playing
print("\n=== GAME READY ===")
print("To play:")
print("- play_human_move(column_number)  # Your turn")  
print("- play_ai_move()                  # AI's turn")
print("- game.display_board()            # Show current board")
print("\nYou go first! Use: play_human_move(1) through play_human_move(7)")