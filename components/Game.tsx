import React from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { pickUpPiece, Piece, placePiece, selectGame } from 'reducers/gameSlice';
import { AvailablePieces } from 'components/AvailablePieces';
import { Board } from 'components/Board';

export const Game = () => {
	const {
		currentPlayer,
		board,
		availablePieces,
		// isGameOver,
		message,
		heldPiece,
	} = useAppSelector(selectGame);
	const dispatch = useAppDispatch();

	const handlePickUpPiece = (piece: Piece) => {
		dispatch(pickUpPiece(piece));
	};

	const handlePlacePiece = ({ row, col }: { row: number; col: number }) => {
		if (heldPiece) {
			dispatch(placePiece({ row, col, piece: heldPiece }));
		}
	};

	return (
		<div className="flex flex-col items-center">
			<p>{message}</p>
			<AvailablePieces
				enabled={currentPlayer === 'A'}
				onSelectPiece={handlePickUpPiece}
				selectedPiece={heldPiece}
				pieces={availablePieces.A}
				player={'A'}
			/>
			<Board board={board} onPlace={({ row, col }) => handlePlacePiece({ row, col })} />
			<AvailablePieces
				enabled={currentPlayer === 'B'}
				onSelectPiece={handlePickUpPiece}
				pieces={availablePieces.B}
				selectedPiece={heldPiece}
				player={'B'}
			/>
		</div>
	);
};
