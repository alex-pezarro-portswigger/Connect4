export type Player = 'X' | 'O';
export type Cell = Player | ' ';
export type Board = Cell[][];
export type GameResult = Player | 'Tie' | null;

export class Connect4Game {
  private board: Board;
  private currentPlayer: Player;
  private gameOver: boolean;
  private winner: GameResult;

  constructor() {
    this.board = Array(6).fill(null).map(() => Array(7).fill(' '));
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getWinner(): GameResult {
    return this.winner;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getBoard(): Board {
    return this.board.map(row => [...row]);
  }

  getBoardVisual(): string {
    let visual = "\n  1 2 3 4 5 6 7\n";
    visual += "  " + "-".repeat(13) + "\n";
    
    for (const row of this.board) {
      visual += "| " + row.join(" ") + " |\n";
    }
    
    visual += "  " + "-".repeat(13) + "\n";
    return visual;
  }

  getBoardCsv(): string {
    return this.board.map(row => row.join(",")).join("\n");
  }

  isValidMove(col: number): boolean {
    return col >= 0 && col < 7 && this.board[0][col] === ' ';
  }

  placePiece(col: number): boolean {
    if (this.gameOver) {
      throw new Error("Game is over");
    }

    if (!this.isValidMove(col)) {
      return false;
    }

    let placedRow = -1;
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] === ' ') {
        this.board[row][col] = this.currentPlayer;
        placedRow = row;
        break;
      }
    }

    if (this.checkWinner(placedRow, col)) {
      this.gameOver = true;
      this.winner = this.currentPlayer;
    } else if (this.isBoardFull()) {
      this.gameOver = true;
      this.winner = "Tie";
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    return true;
  }

  private checkWinner(row: number, col: number): boolean {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal /
      [1, -1]   // diagonal \
    ];

    for (const [dr, dc] of directions) {
      let count = 1;

      // Check in positive direction
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === this.currentPlayer) {
        count++;
        r += dr;
        c += dc;
      }

      // Check in negative direction
      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === this.currentPlayer) {
        count++;
        r -= dr;
        c -= dc;
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  }

  private isBoardFull(): boolean {
    return this.board[0].every(cell => cell !== ' ');
  }

  reset(): void {
    this.board = Array(6).fill(null).map(() => Array(7).fill(' '));
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
  }
}