import { Colors, type CellData } from '../types'
import {
	getCell,
	isEmptyDiagonal,
	isEmptyHorizontal,
	isEmptyVertical,
} from './checkAvailability'
import { findKing } from './findKing'
import { isKingAttacked } from './isKingAttacked'
import { kingMove } from './kingMove'
import { enPassantCheck, knightMove, pawnMove } from './knightAndPawnMove'

export function canMove(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
): boolean {
	if (selectedCell.figure?.color === target.figure?.color) return false

	const isPseudoLegal = isPseudoLegalMove(selectedCell, target, cells)
	if (!isPseudoLegal) return false

	const newCells = moveFigure(cells, selectedCell, target)
	const kingColor = selectedCell.figure!.color
	const kingAfterMove = findKing(newCells, kingColor)

	return !isKingAttacked(newCells, kingAfterMove)
}

function isPseudoLegalMove(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
): boolean {
	switch (selectedCell.figure?.type) {
		case 'pawn':
			return pawnMove(selectedCell, target, cells)
		case 'rook':
			return (
				isEmptyVertical(selectedCell, target, cells) ||
				isEmptyHorizontal(selectedCell, target, cells)
			)
		case 'bishop':
			return isEmptyDiagonal(selectedCell, target, cells)
		case 'knight':
			return knightMove(selectedCell, target)
		case 'queen':
			return (
				isEmptyVertical(selectedCell, target, cells) ||
				isEmptyHorizontal(selectedCell, target, cells) ||
				isEmptyDiagonal(selectedCell, target, cells)
			)
		case 'king':
			return kingMove(selectedCell, target)
		default:
			return false
	}
}

export function moveFigure(
	cells: CellData[][],
	selectedCell: CellData,
	target: CellData,
) {
	const one = selectedCell.figure?.color === Colors.BLACK ? 1 : -1
	return cells.map(row =>
		row.map(cell => {
			if (cell !== selectedCell && cell.enPassant?.isIt) {
				return { ...cell, enPassant: { ...cell.enPassant, isIt: false } }
			}
			if (
				selectedCell.enPassant?.isIt &&
				target.y === selectedCell.y + one &&
				Math.abs(target.x - selectedCell.x) === 1 &&
				getCell(target.x, selectedCell.y, cells)?.figure?.type === 'pawn' &&
				cell.x === target.x &&
				cell.y == selectedCell.y
			) {
				return { ...cell, figure: null }
			}
			if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
				if (selectedCell.isFirstTime) {
					return { ...cell, figure: null, isFirstTime: false }
				}
				if (selectedCell.enPassant?.isIt) {
					return {
						...cell,
						figure: null,
						enPassant: { ...selectedCell.enPassant, isIt: false },
					}
				}
				return { ...cell, figure: null }
			}
			if (cell.x === target.x && cell.y === target.y) {
				return { ...cell, figure: selectedCell.figure }
			}

			if (
				(cell.x === target.x + 1 && cell.y === target.y) ||
				(cell.x === target.x - 1 && cell.y === target.y)
			) {
				if (enPassantCheck(selectedCell, target, cells, cell)) {
					return {
						...cell,
						enPassant: { isIt: true, x: target.x, y: target.y },
					}
				}
			}
			return cell
		}),
	)
}
