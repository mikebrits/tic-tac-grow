import React from 'react';
import { Piece } from './Piece';
import { Player, Piece as PieceType } from 'reducers/gameSlice';

interface AvailablePiecesProps {
	pieces: number[];
	player: Player;
	enabled?: boolean;
	onSelectPiece: (piece: PieceType) => void;
	selectedPiece?: PieceType;
}

export const AvailablePieces: React.FC<AvailablePiecesProps> = ({
	pieces,
	player,
	enabled = true,
	onSelectPiece,
	selectedPiece,
}) => {
	return (
		<div className={`${!enabled ? 'opacity-30' : ''}`}>
			{pieces.map((value, index) => (
				<Piece
					onClick={onSelectPiece}
					enabled={enabled}
					piece={{ value, player }}
					selected={selectedPiece?.player === player && selectedPiece?.value === value}
					key={index}
				/>
			))}
		</div>
	);
};
