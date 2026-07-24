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
	if (
		selectedCell.enPassant?.isIt &&
		target.y === selectedCell.y + one &&
		Math.abs(target.x - selectedCell.x) === 1 &&
		getCell(target.x, selectedCell.y, cells)?.figure?.type === 'pawn' &&
		selectedCell.enPassant.x === target.x &&
		selectedCell.enPassant.y === selectedCell.y
	) {
		return true
	}
	return false
}
export function enPassantCheck(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
	cell: CellData,
) {
	const enPassantPawn = getCell(cell.x, cell.y, cells)

	if (
		selectedCell.figure?.type === 'pawn' &&
		Math.abs(target.y - selectedCell.y) === 2 &&
		enPassantPawn?.figure?.type === 'pawn' &&
		enPassantPawn?.figure?.color !== selectedCell.figure?.color
	) {
		return true
	}
}
