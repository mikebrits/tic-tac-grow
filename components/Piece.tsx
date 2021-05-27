import React from 'react';
import { Piece as PieceType } from 'reducers/gameSlice';

interface PieceProps {
	piece: PieceType;
	enabled: boolean;
	selected?: boolean;
	onClick?: (piece: PieceType) => void;
}

export const Piece: React.FC<PieceProps> = ({ piece, enabled, onClick = () => {}, selected }) => {
	const color = piece.player === 'A' ? 'blue' : 'red';
	const colorWeight = selected ? '700' : '500';
	return (
		<button
			className={`bg-${color}-${colorWeight} ${
				enabled ? `hover:bg-${color}-700` : 'cursor-default'
			} text-white font-bold py-2 px-4 rounded-full m-1`}
			disabled={!enabled}
			onClick={() => {
				onClick(piece);
			}}
		>
			{piece.value}
		</button>
	);
};
