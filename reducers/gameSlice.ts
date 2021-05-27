import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { gameHasWinner, isBoardFull } from '../utils/gameLogic';
import { RootState } from '../utils/store';

export type Player = 'A' | 'B';

export interface Piece {
	value: number;
	player: Player;
}

export type Board = (Piece | undefined)[][];

export interface GameState {
	board: Board;
	message?: string;
	currentPlayer: Player;
	isGameOver: boolean;
	availablePieces: AvailablePieces;
	heldPiece?: Piece;
}

export interface AvailablePieces {
	A: number[];
	B: number[];
}

export const initialState: GameState = {
	message: "Player A's turn",
	board: [
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	],
	currentPlayer: 'A',
	isGameOver: false,
	availablePieces: {
		A: [1, 2, 3, 4, 5, 6],
		B: [1, 2, 3, 4, 5, 6],
	},
};

export const gameSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		placePiece: (
			state,
			action: PayloadAction<{
				row: number;
				col: number;
				piece: Piece;
			}>
		) => {
			const { row, col, piece } = action.payload;
			const { board, availablePieces, currentPlayer } = state;
			const targetBlock = board[row][col];
			if (targetBlock && targetBlock.value >= piece.value) return;

			//play the piece on the board
			board[row][col] = piece;

			// remove the piece from the players hand
			availablePieces[currentPlayer] = availablePieces[currentPlayer].filter(
				(i) => i !== piece.value
			);

			state.heldPiece = undefined;

			if (gameHasWinner(board)) {
				state.isGameOver = true;
				state.message = `Player ${state.currentPlayer} wins the game!`;
				return;
			}

			if (isBoardFull(board)) {
				state.isGameOver = true;
				state.message = `It's a stalemate!`;
				return;
			}

			const nextPlayer = state.currentPlayer === 'A' ? 'B' : 'A';

			if (nextPlayer === 'A' && state.availablePieces.A.length === 0) {
				state.isGameOver = true;
				state.message = "It's a stalemate!";
				return;
			}

			state.currentPlayer = nextPlayer;
			state.message = `Player ${nextPlayer}'s turn`;
		},

		pickUpPiece: (state, action: PayloadAction<Piece>) => {
			state.heldPiece = action.payload;
		},

		restartGame: (state) => {
			state = initialState;
		},
	},
});

export const { placePiece, pickUpPiece, restartGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
