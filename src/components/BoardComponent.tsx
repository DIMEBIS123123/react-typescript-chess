import React, { useState, type FC } from 'react'

import CellComponent from './CellComponent'

import type { BoardProps, CellData } from '../types'
import { canMove, moveFigure } from '../utils/canMove'
import { highlightCells } from '../utils/highlightCells'

const BoardComponent: FC<BoardProps> = ({ cells, setCells }) => {
	const [selectedCell, setSelectedCell] = useState<CellData | null>(null)

	return (
		<div className='board'>
			{cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map(cell => (
						<CellComponent
							cell={cell}
							key={cell.id}
							onClick={() => {
								if (
									selectedCell &&
									selectedCell !== cell &&
									canMove(selectedCell, cell)
								) {
									const newCells = moveFigure(cells, selectedCell, cell)
									setCells(newCells)
									setSelectedCell(null)
								} else if (cell.figure) {
									setSelectedCell(cell)
									const newCells = highlightCells(cells, cell)
									setCells(newCells)
								}
							}}
							selected={cell.x === selectedCell?.x && cell.y === selectedCell.y}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	)
}

export default BoardComponent
