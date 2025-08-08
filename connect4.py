#!/usr/bin/env python3

class Connect4:
    def __init__(self):
        self.board = [[' ' for _ in range(7)] for _ in range(6)]
        self.current_player = 'X'
        self.game_over = False
        self.winner = None
    
    def display_board(self):
        print("\n  1 2 3 4 5 6 7")
        print("  " + "-" * 13)
        for row in self.board:
            print("| " + " ".join(row) + " |")
        print("  " + "-" * 13)
    
    def is_valid_move(self, col):
        return 0 <= col < 7 and self.board[0][col] == ' '
    
    def make_move(self, col):
        if not self.is_valid_move(col):
            return False
        
        for row in range(5, -1, -1):
            if self.board[row][col] == ' ':
                self.board[row][col] = self.current_player
                break
        
        if self.check_winner(row, col):
            self.game_over = True
            self.winner = self.current_player
        elif self.is_board_full():
            self.game_over = True
            self.winner = "Tie"
        else:
            self.current_player = 'O' if self.current_player == 'X' else 'X'
        
        return True
    
    def check_winner(self, row, col):
        directions = [
            (0, 1),   # horizontal
            (1, 0),   # vertical
            (1, 1),   # diagonal /
            (1, -1)   # diagonal \
        ]
        
        for dr, dc in directions:
            count = 1
            
            # Check in positive direction
            r, c = row + dr, col + dc
            while 0 <= r < 6 and 0 <= c < 7 and self.board[r][c] == self.current_player:
                count += 1
                r, c = r + dr, c + dc
            
            # Check in negative direction
            r, c = row - dr, col - dc
            while 0 <= r < 6 and 0 <= c < 7 and self.board[r][c] == self.current_player:
                count += 1
                r, c = r - dr, c - dc
            
            if count >= 4:
                return True
        
        return False
    
    def is_board_full(self):
        return all(self.board[0][col] != ' ' for col in range(7))
    
    def play_turn(self, col=None):
        if self.game_over:
            return f"Game is over! Winner: {self.winner}"
        
        if self.current_player == 'X':
            if col is None:
                return "Please specify a column (1-7) for your move"
            col = col - 1  # Convert to 0-based indexing
            if not self.make_move(col):
                return "Invalid move! Try again."
        else:
            import random
            # Simple AI: try center columns first, then random
            preferred_cols = [3, 2, 4, 1, 5, 0, 6]
            for col in preferred_cols:
                if self.is_valid_move(col):
                    self.make_move(col)
                    break
        
        result = ""
        self.display_board()
        
        if self.game_over:
            if self.winner == "Tie":
                result += "\nIt's a tie!"
            else:
                result += f"\nPlayer {self.winner} wins!"
        else:
            result += f"\nIt's Player {self.current_player}'s turn"
        
        return result
    
    def start_game(self):
        print("Welcome to Connect 4!")
        print("You are X, I am O")
        print("Enter column numbers 1-7 to make your move")
        self.display_board()
        return "Game started! Make your first move by calling play_turn(column_number)"

if __name__ == "__main__":
    game = Connect4()
    print(game.start_game())