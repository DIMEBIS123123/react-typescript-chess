import React, { useState, type FC } from 'react'

import CellComponent from './CellComponent'

import { getHighlightedCells } from '../utils/highlightCells'
import type { BoardProps, CellData } from '../types'

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
								if (cell.figure) {
									setSelectedCell(cell)
								}
								getHighlightedCells(cells, selectedCell, setCells)
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
