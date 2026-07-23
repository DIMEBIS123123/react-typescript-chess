import { Colors, type CellData } from '../types'
import { getCell, isEmpty } from './checkAvailability'

export function knightMove(selectedCell: CellData, target: CellData) {
	const dx = Math.abs(selectedCell.x - target.x)
	const dy = Math.abs(selectedCell.y - target.y)

	if ((dx === 2 && dy === 1) || (dy === 2 && dx === 1)) {
		return true
	}
}
export function pawnMove(
	selectedCell: CellData,
	target: CellData,
	cells?: CellData[][],
) {
	let direction
	const one = selectedCell.figure?.color === Colors.BLACK ? 1 : -1
	if (!selectedCell.isFirstTime) {
		direction = selectedCell.figure?.color === Colors.BLACK ? 1 : -1
	} else {
		direction = selectedCell.figure?.color === Colors.BLACK ? 2 : -2
	}
	if (
		(target.y === selectedCell.y + direction ||
			target.y === selectedCell.y + one) &&
		target.x === selectedCell.x &&
		isEmpty(getCell(target.x, target.y, cells)) &&
		(isEmpty(getCell(target.x, target.y - one, cells)) ||
			target.y - one === selectedCell.y)
	) {
		return true
	}
	if (
		target.y === selectedCell.y + one &&
		(target.x === selectedCell.x + 1 || target.x === selectedCell.x - 1) &&
		target.figure
	) {
		return true
	}
}
export function enPassantCheck(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
) {
	const enPassantPawn = getCell(target.x + 1, target.y, cells)
	const enPassantPawn2 = getCell(target.x - 1, target.y, cells)
	if (
		selectedCell.figure?.type === 'pawn' &&
		Math.abs(target.y - selectedCell.y) === 2 &&
		enPassantPawn?.figure?.type === 'pawn'
	) {
		return true
	} else if (
		selectedCell.figure?.type === 'pawn' &&
		Math.abs(target.y - selectedCell.y) === 2 &&
		enPassantPawn2?.figure?.type === 'pawn'
	) {
		return true
	}
}
