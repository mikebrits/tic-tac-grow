import React from 'react';
import { Board as BoardType } from 'reducers/gameSlice';
import { Piece as PieceType } from 'reducers/gameSlice';
import { Piece } from './Piece';

interface BoardProps {
	board: BoardType;
	onPlace: ({ row, col }: { row: number; col: number }) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onPlace }) => {
	return (
		<div>
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((cell, colIndex) => {
						const piece = board[rowIndex][colIndex] as PieceType;
						return (
							<div
								style={{
									width: 100,
									height: 100,
									border: '1px solid black',
									cursor: 'pointer',
									display: 'flex',
								}}
								className="items-center justify-center bg-white"
								key={colIndex}
								onClick={() => onPlace({ row: rowIndex, col: colIndex })}
							>
								{piece && (
									<Piece
										piece={piece}
										enabled={true}
										onClick={() => onPlace({ row: rowIndex, col: colIndex })}
									/>
								)}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};
