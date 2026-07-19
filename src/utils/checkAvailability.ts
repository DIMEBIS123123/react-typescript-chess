import type { CellData } from '../types'

export function isEmpty(cell: CellData | undefined) {
	if (cell) return cell.figure === null
}
export function getCell(
	x: number,
	y: number,
	cells?: CellData[][],
): CellData | undefined {
	if (cells) return cells[y]?.[x]
}
export function isEmptyVertical(
	selectedCell: CellData,
	target: CellData,
	cells?: CellData[][],
): boolean {
	if (selectedCell.x !== target.x) {
		return false
	}

	const min = Math.min(selectedCell.y, target.y)
	const max = Math.max(selectedCell.y, target.y)
	for (let y = min + 1; y < max; y++) {
		if (!isEmpty(getCell(selectedCell.x, y, cells))) return false
	}
	return true
}
export function isEmptyHorizontal(
	selectedCell: CellData,
	target: CellData,
	cells?: CellData[][],
): boolean {
	if (selectedCell.y !== target.y) {
		return false
	}

	const min = Math.min(selectedCell.x, target.x)
	const max = Math.max(selectedCell.x, target.x)
	for (let x = min + 1; x < max; x++) {
		if (!isEmpty(getCell(x, selectedCell.y, cells))) return false
	}
	return true
}
export function isEmptyDiagonal(
	selectedCell: CellData,
	target: CellData,
	cells?: CellData[][],
): boolean {
	const absX = Math.abs(target.x - selectedCell.x)
	const absY = Math.abs(target.y - selectedCell.y)
	if (absX !== absY) {
		return false
	}

	const dx = selectedCell.x < target.x ? 1 : -1
	const dy = selectedCell.y < target.y ? 1 : -1

	let countX = 0
	let countY = 0

	const minX = Math.min(selectedCell.x, target.x)
	const maxX = Math.max(selectedCell.x, target.x)
	const length = maxX - minX

	for (let x = 1; x < length; x++) {
		countX += dx
		countY += dy
		if (
			!isEmpty(getCell(selectedCell.x + countX, selectedCell.y + countY, cells))
		)
			return false
	}
	return true
}
