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
	setIsItStarted,
	setPromotion,
	castlingRights,
	setCastlingRights,
}) => {
	const [selectedCell, setSelectedCell] = useState<CellData | null>(null)

	function clickOnCell(cell: CellData) {
		if (!isItStarted) {
			return
		}
		if (
			selectedCell &&
			selectedCell !== cell &&
			canMove(selectedCell, cell, cells, castlingRights)
		) {
			const newCells = moveFigure(cells, selectedCell, cell)
			if (selectedCell.figure?.type === 'king') {
				if (selectedCell.figure.color === Colors.WHITE) {
					setCastlingRights({
						...castlingRights,
						whiteKingSide: false,
						whiteQueenSide: false,
					})
				} else {
					setCastlingRights({
						...castlingRights,
						blackKingSide: false,
						blackQueenSide: false,
					})
				}
			}
			if (selectedCell.figure?.type === 'rook') {
				if (selectedCell.figure.color === Colors.WHITE) {
					if (selectedCell.x === 0)
						setCastlingRights({
							...castlingRights,
							whiteQueenSide: false,
						})
					else {
						setCastlingRights({
							...castlingRights,
							whiteKingSide: false,
						})
					}
				} else {
					if (selectedCell.x === 0)
						setCastlingRights({
							...castlingRights,
							blackQueenSide: false,
						})
					else {
						setCastlingRights({
							...castlingRights,
							blackKingSide: false,
						})
					}
				}
			}

			if (
				selectedCell.figure?.type === 'pawn' &&
				(cell.y === 7 || cell.y === 0)
			) {
				setPromotion({
					cell: { ...cell, figure: selectedCell.figure },
					isIt: true,
				})
				setIsItStarted(false)
			}
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
			const newCells = highlightCells(cells, cell, castlingRights)
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

export default React.memo(BoardComponent)
