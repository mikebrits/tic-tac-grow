import React from 'react';
import { Piece } from './Piece';
import { Player, Piece as PieceType } from 'utils/reducers/gameSlice';

interface AvailablePiecesProps {
	pieces: number[];
	player: Player;
	enabled: boolean;
	onSelectPiece: (piece: PieceType) => void;
}

export const AvailablePieces: React.FC<AvailablePiecesProps> = ({
	pieces,
	player,
	enabled,
	onSelectPiece,
}) => {
	return (
		<>
			{pieces.map((value, index) => (
				<Piece
					onClick={onSelectPiece}
					enabled={enabled}
					piece={{ value, player }}
					key={index}
				/>
			))}
		</>
	);
};
