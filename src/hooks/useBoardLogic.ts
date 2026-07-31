import { useCallback, useState } from 'react'
import { Colors, type BoardProps, type CellData } from '../types'
import { canMove, moveFigure } from '../utils/canMove'
import { playMoveSound } from '../utils/sound'
import { highlightCells } from '../utils/highlightCells'
import { swapPlayer } from '../utils/PlayersLogic'
import { canCastle } from '../utils/canCastle'
import { checkmateLogic } from '../utils/checkmateLogic'

// hooks/useBoardLogic.ts
export function useBoardLogic(props: BoardProps) {
	// Деструктуризация ВНУТРИ хука — стабильные ссылки на сеттеры
	const {
		cells,
		setCells,
		currentPlayer,
		setCurrentPlayer,
		isItStarted,
		castlingRights,
		setCastlingRights,
		setLostBlackFigures,
		setLostWhiteFigures,
		setPromotion,
		setWinner,
		setIsItStarted,
	} = props

	const [selectedCell, setSelectedCell] = useState<CellData | null>(null)

	const clickOnCell = useCallback(
		(cell: CellData) => {
			if (!isItStarted) return

			if (
				selectedCell &&
				selectedCell !== cell &&
				(canMove(selectedCell, cell, cells) ||
					canCastle(selectedCell, cell, cells, castlingRights))
			) {
				const newCells = moveFigure(cells, selectedCell, cell)

				// Сброс прав рокировки
				if (selectedCell.figure?.type === 'king') {
					if (selectedCell.figure.color === Colors.WHITE) {
						setCastlingRights(prev => ({
							...prev,
							whiteKingSide: false,
							whiteQueenSide: false,
						}))
					} else {
						setCastlingRights(prev => ({
							...prev,
							blackKingSide: false,
							blackQueenSide: false,
						}))
					}
				}
				if (selectedCell.figure?.type === 'rook') {
					if (selectedCell.figure.color === Colors.WHITE) {
						setCastlingRights(prev => ({
							...prev,
							[selectedCell.x === 0 ? 'whiteQueenSide' : 'whiteKingSide']:
								false,
						}))
					} else {
						setCastlingRights(prev => ({
							...prev,
							[selectedCell.x === 0 ? 'blackQueenSide' : 'blackKingSide']:
								false,
						}))
					}
				}

				// Превращение пешки
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

				// Взятие фигуры
				if (cell.figure) {
					if (cell.figure.color === Colors.WHITE) {
						setLostWhiteFigures(prev => [...prev, cell.figure!])
					} else {
						setLostBlackFigures(prev => [...prev, cell.figure!])
					}
				}

				playMoveSound()
				setCells(newCells)
				setSelectedCell(null)
				setCurrentPlayer({ color: swapPlayer(currentPlayer) })

				if (
					checkmateLogic(newCells, swapPlayer(currentPlayer)) === 'continue'
				) {
					console.log('continue')
					return true
				} else if (
					checkmateLogic(newCells, swapPlayer(currentPlayer)) === 'checkmate'
				) {
					setWinner({
						color:
							swapPlayer(currentPlayer) === Colors.WHITE
								? Colors.BLACK
								: Colors.WHITE,
					})
					console.log('checkmate')
					setIsItStarted(false)
				} else {
					console.log('stalemate')
					setWinner({ color: Colors.GRAY })

					setIsItStarted(false)
				}
			} else if (cell.figure && cell.figure.color === currentPlayer?.color) {
				setSelectedCell(cell)
				setCells(highlightCells(cells, cell, castlingRights))
			}
		},
		[
			selectedCell,
			cells,
			currentPlayer,
			isItStarted,
			setCastlingRights,
			setCells,
			setCurrentPlayer,
			setPromotion,
			setIsItStarted,
			setLostBlackFigures,
			setLostWhiteFigures,
		],
	)

	return { selectedCell, clickOnCell }
}
