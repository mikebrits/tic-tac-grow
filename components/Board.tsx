import React from 'react';
import { Board as BoardType } from 'utils/reducers/gameSlice';
import { Piece as PieceType } from 'utils/reducers/gameSlice';

interface BoardProps {
	board: BoardType;
	onPlace: ({ row, col }: { row: number; col: number }) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onPlace }) => {
	return (
		<>
			{board.map((row, rowIndex) => (
				<div key={rowIndex}>
					{row.map((cell, colIndex) => {
						const piece = board[rowIndex][colIndex] as PieceType;
						return (
							<span
								style={{
									padding: 40,
									width: 50,
									height: 50,
									border: '1px solid black',
									cursor: 'pointer',
									display: 'inline-block',
								}}
								key={colIndex}
								onClick={() => onPlace({ row: rowIndex, col: colIndex })}
							>
								{piece ? `${piece.player}${piece.value}` : '-'}
							</span>
						);
					})}
				</div>
			))}
		</>
	);
};
