import { isBoardFull, gameHasWinner } from '../gameLogic';
import { Board } from '../reducers/gameSlice';

describe('gameLogic', () => {
	it('should return false if there are no pieces placed', function () {
		const board: Board = [
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
		];

		expect(gameHasWinner(board)).toBe(false);
	});

	it('should return true if all places are full', function () {
		const board: Board = [
			[
				{ player: 'A', value: 1 },
				{ player: 'B', value: 1 },
				{ player: 'A', value: 1 },
			],
			[
				{ player: 'A', value: 1 },
				{ player: 'B', value: 1 },
				{ player: 'B', value: 1 },
			],
			[
				{ player: 'B', value: 1 },
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
			],
		];

		expect(isBoardFull(board)).toBe(true);
	});

	it('should return true if a row belongs to a single player', function () {
		const board1: Board = [
			[
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
			],
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
		];

		expect(gameHasWinner(board1)).toBe(true);

		const board2: Board = [
			[undefined, undefined, undefined],
			[
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
			],
			[undefined, undefined, undefined],
		];

		expect(gameHasWinner(board2)).toBe(true);
		const board3: Board = [
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
			[
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
				{ player: 'A', value: 1 },
			],
		];

		expect(gameHasWinner(board3)).toBe(true);
	});

	it('should return true if a col belongs to a single player', function () {
		const board: Board = [
			[{ player: 'A', value: 1 }, undefined, undefined],
			[{ player: 'A', value: 1 }, undefined, undefined],
			[{ player: 'A', value: 1 }, undefined, undefined],
		];

		expect(gameHasWinner(board)).toBe(true);

		const board2: Board = [
			[undefined, { player: 'A', value: 1 }, undefined],
			[undefined, { player: 'A', value: 1 }, undefined],
			[undefined, { player: 'A', value: 1 }, undefined],
		];

		expect(gameHasWinner(board2)).toBe(true);

		const board3: Board = [
			[undefined, undefined, { player: 'A', value: 1 }],
			[undefined, undefined, { player: 'A', value: 1 }],
			[undefined, undefined, { player: 'A', value: 1 }],
		];

		expect(gameHasWinner(board3)).toBe(true);
	});

	it('should return true when diagonals are filled out by the same player', function () {
		const board: Board = [
			[{ player: 'A', value: 1 }, undefined, undefined],
			[undefined, { player: 'A', value: 1 }, undefined],
			[undefined, undefined, { player: 'A', value: 1 }],
		];

		expect(gameHasWinner(board)).toBe(true);

		const board2: Board = [
			[undefined, undefined, { player: 'A', value: 1 }],
			[undefined, { player: 'A', value: 1 }, undefined],
			[{ player: 'A', value: 1 }, undefined, undefined],
		];

		expect(gameHasWinner(board2)).toBe(true);
	});
});
