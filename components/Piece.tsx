import React from 'react';
import { Piece as PieceType } from 'utils/reducers/gameSlice';

interface PieceProps {
	piece: PieceType;
	enabled: boolean;
	onClick?: (piece: PieceType) => void;
}

export const Piece: React.FC<PieceProps> = ({ piece, enabled, onClick = () => {} }) => {
	return (
		<button
			disabled={!enabled}
			onClick={() => {
				onClick(piece);
			}}
		>
			{piece.player}
			{piece.value}
		</button>
	);
};
