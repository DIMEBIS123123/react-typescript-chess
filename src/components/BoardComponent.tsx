import React, { type FC } from 'react'
import type { Board } from '../models/Board'
import CellComponent from './CellComponent'

interface BoardProps {
	board: Board
	setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }: BoardProps) => {
	return (
		<div className='board'>
			{board.cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map(cell => (
						<CellComponent />
					))}
				</React.Fragment>
			))}
		</div>
	)
}

export default BoardComponent
