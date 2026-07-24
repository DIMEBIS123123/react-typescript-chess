import React, { useState, type FC } from 'react'

import CellComponent from './CellComponent'

import { Colors, type BoardProps, type CellData } from '../types'
import { canMove, moveFigure } from '../utils/canMove'
import { highlightCells } from '../utils/highlightCells'
import { swapPlayer } from '../utils/PlayersLogic'
import { playMoveSound } from '../utils/sound'

const BoardComponent: FC<BoardProps> = ({
	cells,
	setCells,
	currentPlayer,
	setCurrentPlayer,
	lostBlackFigures,
	setLostBlackFigures,
	lostWhiteFigures,
	setLostWhiteFigures,
	isItStarted,
}) => {
	const [selectedCell, setSelectedCell] = useState<CellData | null>(null)
	function clickOnCell(cell: CellData) {
		if (!isItStarted) {
			return
		}
		if (
			selectedCell &&
			selectedCell !== cell &&
			canMove(selectedCell, cell, cells)
		) {
			const newCells = moveFigure(cells, selectedCell, cell)

			if (cell.figure) {
				if (cell.figure.color === Colors.WHITE) {
					setLostWhiteFigures([...lostWhiteFigures, cell.figure])
				} else {
					setLostBlackFigures([...lostBlackFigures, cell.figure])
				}
			}
			playMoveSound()
			setCells(newCells)
			setSelectedCell(null)

			setCurrentPlayer({ color: swapPlayer(currentPlayer) })
		} else if (cell.figure && cell.figure.color === currentPlayer?.color) {
			setSelectedCell(cell)
			const newCells = highlightCells(cells, cell)
			setCells(newCells)
		}
	}

	return (
		<div className='board'>
			{cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map(cell => (
						<CellComponent
							cell={cell}
							key={cell.id}
							onClick={() => {
								clickOnCell(cell)
							}}
							selected={cell.x === selectedCell?.x && cell.y === selectedCell.y}
							selectedCell={selectedCell}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	)
}

export default BoardComponent
