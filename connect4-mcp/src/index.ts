#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Connect4Game } from './connect4.js';

// Global game instance - only one game at a time
let game = new Connect4Game();

const server = new Server(
  {
    name: 'connect4-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_current_player',
        description: 'Get the current player whose turn it is',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'check_winner',
        description: 'Check if someone has won the game or if it\'s a tie',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'place_piece', 
        description: 'Place a piece in the specified column for the current player',
        inputSchema: {
          type: 'object',
          properties: {
            column: {
              type: 'number',
              description: 'Column number (1-7) where to place the piece',
              minimum: 1,
              maximum: 7,
            },
          },
          required: ['column'],
        },
      },
      {
        name: 'get_board_visual',
        description: 'Get a visual ASCII representation of the current board state',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_board_csv',
        description: 'Get the board state as CSV format',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'reset_game',
        description: 'Reset the game to start a new match',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_game_status',
        description: 'Get comprehensive game status including current player, winner, and game over state',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_current_player':
        return {
          content: [
            {
              type: 'text',
              text: game.getCurrentPlayer(),
            },
          ],
        };

      case 'check_winner':
        const winner = game.getWinner();
        const isGameOver = game.isGameOver();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                gameOver: isGameOver,
                winner: winner,
                message: isGameOver 
                  ? (winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`)
                  : "Game is still in progress"
              }),
            },
          ],
        };

      case 'place_piece':
        if (!args || typeof args.column !== 'number') {
          throw new Error('Column number (1-7) is required');
        }
        
        const column = args.column - 1; // Convert to 0-based indexing
        const currentPlayer = game.getCurrentPlayer();
        
        if (game.isGameOver()) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  message: `Game is over! Winner: ${game.getWinner()}`,
                  currentPlayer: currentPlayer
                }),
              },
            ],
          };
        }

        const success = game.placePiece(column);
        
        if (!success) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  message: `Invalid move! Column ${args.column} is full or out of bounds.`,
                  currentPlayer: currentPlayer
                }),
              },
            ],
          };
        }

        const newWinner = game.getWinner();
        const newGameOver = game.isGameOver();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: `Player ${currentPlayer} placed piece in column ${args.column}`,
                gameOver: newGameOver,
                winner: newWinner,
                nextPlayer: newGameOver ? null : game.getCurrentPlayer()
              }),
            },
          ],
        };

      case 'get_board_visual':
        return {
          content: [
            {
              type: 'text',
              text: game.getBoardVisual(),
            },
          ],
        };

      case 'get_board_csv':
        return {
          content: [
            {
              type: 'text',
              text: game.getBoardCsv(),
            },
          ],
        };

      case 'reset_game':
        game.reset();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                message: "Game has been reset",
                currentPlayer: game.getCurrentPlayer(),
                gameOver: false
              }),
            },
          ],
        };

      case 'get_game_status':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                currentPlayer: game.getCurrentPlayer(),
                gameOver: game.isGameOver(),
                winner: game.getWinner(),
                boardState: game.getBoard()
              }),
            },
          ],
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Connect4 MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});