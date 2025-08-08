#!/usr/bin/env python3
"""
Interactive Connect 4 game manager for playing with Claude Code
"""
from connect4 import Connect4

def main():
    game = Connect4()
    game.start_game()
    
    print("Welcome to Connect 4!")
    print("You are X (human), AI is O")
    print("Enter column numbers 1-7 to make your move")
    print("Enter 'q' to quit\n")
    
    game.display_board()
    
    while not game.game_over:
        if game.current_player == 'X':
            # Human turn
            try:
                move = input(f"\nYour turn (X). Enter column (1-7): ").strip()
                if move.lower() == 'q':
                    print("Thanks for playing!")
                    break
                    
                column = int(move) - 1  # Convert to 0-based indexing
                if column < 0 or column > 6:
                    print("Please enter a column number between 1 and 7")
                    continue
                    
                success = game.play_turn(column)
                if not success:
                    print("That column is full! Try another column.")
                    continue
                    
            except ValueError:
                print("Please enter a valid number or 'q' to quit")
                continue
                
        else:
            # AI turn - this will be handled by the AI
            print(f"\nAI's turn (O)...")
            # AI will make its move here
            ai_column = game.get_ai_move()  # This method exists in the Connect4 class
            game.play_turn(ai_column)
            print(f"AI played column {ai_column + 1}")
            
        # Show board after each move
        print()
        game.display_board()
        
        # Check for game end
        if game.game_over:
            if game.winner:
                winner_name = "You" if game.winner == 'X' else "AI"
                print(f"\n🎉 {winner_name} wins!")
            else:
                print("\n🤝 It's a tie!")

if __name__ == "__main__":
    main()