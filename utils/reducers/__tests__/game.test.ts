import boardReducer, {
	GameState,
	initialState as gameSliceInitialState,
	Piece,
	placePiece,
} from '../gameSlice';

describe('Game', () => {
	const defaultGameStateFields = {
		...gameSliceInitialState,
	};
	describe('Placing pieces', () => {
		it('should allow placing a piece if the block is empty', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
			};
			const piece: Piece = { player: 'A', value: 3 };
			const result = boardReducer(initialState, placePiece({ col: 0, row: 0, piece }));

			expect(result.board).toStrictEqual([
				[piece, undefined, undefined],
				[undefined, undefined, undefined],
				[undefined, undefined, undefined],
			]);
		});
		it('should allow placing a piece if the block contains a piece that is smaller than the piece being placed', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
				board: [
					[{ player: 'A', value: 1 }, undefined, undefined],
					[undefined, undefined, undefined],
					[undefined, undefined, undefined],
				],
			};
			const piece: Piece = { player: 'A', value: 3 };
			const result = boardReducer(initialState, placePiece({ col: 0, row: 0, piece }));

			expect(result.board).toStrictEqual([
				[piece, undefined, undefined],
				[undefined, undefined, undefined],
				[undefined, undefined, undefined],
			]);
		});

		it('should not allow a piece to be placed if the block contains a bigger or equal size piece', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
				board: [
					[{ player: 'A', value: 5 }, undefined, undefined],
					[undefined, undefined, undefined],
					[undefined, undefined, undefined],
				],
			};
			const piece: Piece = { player: 'A', value: 3 };
			const result = boardReducer(initialState, placePiece({ col: 0, row: 0, piece }));

			expect(result.board).toStrictEqual(initialState.board);
		});

		it('should switch players after a piece has been played', function () {
			const piece: Piece = { player: 'A', value: 3 };
			const result = boardReducer(
				defaultGameStateFields,
				placePiece({ col: 0, row: 0, piece })
			);
			expect(result.currentPlayer).toBe('B');
		});

		it('should remove the piece from the current players hand', function () {
			const piece1: Piece = { player: 'A', value: 3 };
			const piece2: Piece = { player: 'B', value: 1 };
			const midState = boardReducer(
				defaultGameStateFields,
				placePiece({ col: 0, row: 0, piece: piece1 })
			);
			const result = boardReducer(midState, placePiece({ col: 2, row: 2, piece: piece2 }));
			expect(result.currentPlayer).toBe('A');
			expect(result.availablePieces.A).not.toContain(piece1.value);
			expect(result.availablePieces.A.length).toBe(
				defaultGameStateFields.availablePieces.A.length - 1
			);
			expect(result.availablePieces.B).not.toContain(piece2.value);
			expect(result.availablePieces.B.length).toBe(
				defaultGameStateFields.availablePieces.A.length - 1
			);
		});
	});

	describe('Ending the game', () => {
		it('should end the game when the winning piece is placed', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
				board: [
					[{ player: 'A', value: 5 }, { player: 'A', value: 5 }, undefined],
					[undefined, undefined, undefined],
					[undefined, undefined, undefined],
				],
			};
			const piece: Piece = { player: 'A', value: 3 };
			const result = boardReducer(initialState, placePiece({ col: 2, row: 0, piece }));

			expect(result.isGameOver).toBe(true);
			expect(result.message).toBe(`Player A wins the game!`);
		});

		it('should end the game when player A has no pieces to play', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
				currentPlayer: 'B',
				availablePieces: {
					A: [],
					B: [1],
				},
			};
			const piece: Piece = { player: 'B', value: 1 };
			const result = boardReducer(initialState, placePiece({ col: 0, row: 2, piece }));

			expect(result.isGameOver).toBe(true);
			expect(result.message).toBe(`It's a stalemate!`);
		});

		it('should end the game when the board is full and there is no winning combination', function () {
			const initialState: GameState = {
				...defaultGameStateFields,
				board: [
					[{ player: 'A', value: 1 }, { player: 'B', value: 1 }, undefined],
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
				],
			};
			const piece: Piece = { player: 'A', value: 1 };
			const result = boardReducer(initialState, placePiece({ col: 2, row: 0, piece }));

			expect(result.isGameOver).toBe(true);
			expect(result.message).toBe(`It's a stalemate!`);
		});
	});
});
