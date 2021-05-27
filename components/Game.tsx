import React from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { pickUpPiece, Piece, placePiece, selectGame } from 'utils/reducers/gameSlice';
import { AvailablePieces } from 'components/AvailablePieces';
import { Board } from 'components/Board';

export const Game = () => {
	const {
		currentPlayer,
		board,
		availablePieces,
		isGameOver,
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
		<>
			{message}
			{heldPiece?.player}
			{heldPiece?.value}
			<AvailablePieces
				onSelectPiece={handlePickUpPiece}
				pieces={availablePieces.A}
				player={'A'}
				enabled={!isGameOver && currentPlayer === 'A'}
			/>
			<Board board={board} onPlace={({ row, col }) => handlePlacePiece({ row, col })} />
			<AvailablePieces
				onSelectPiece={handlePickUpPiece}
				pieces={availablePieces.B}
				player={'B'}
				enabled={!isGameOver && currentPlayer === 'B'}
			/>
		</>
	);
};
