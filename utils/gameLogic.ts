import { Board } from './reducers/gameSlice';

export const gameHasWinner = (board: Board): boolean => {
	const combinations = [
		[
			[0, 0],
			[0, 1],
			[0, 2],
		],
		[
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[2, 0],
			[2, 1],
			[2, 2],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
		],
		[
			[0, 1],
			[1, 1],
			[2, 1],
		],
		[
			[0, 2],
			[1, 2],
			[2, 2],
		],
		[
			[0, 0],
			[1, 1],
			[2, 2],
		],
		[
			[0, 2],
			[1, 1],
			[2, 0],
		],
	];
	for (let i = 0; i < combinations.length; i++) {
		const [row, col] = combinations[i][0];
		const firstItem = board[row][col];
		if (!firstItem) continue;
		if (combinations[i].every(([row, col]) => board[row][col]?.player === firstItem.player)) {
			return true;
		}
	}

	return false;
};

export const isBoardFull = (board: Board) =>
	board.every((row) => row.every((cell) => cell !== undefined));
