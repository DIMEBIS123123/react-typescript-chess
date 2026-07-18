import type { CellData } from '../types'

function isEmpty(cell: CellData | undefined) {
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
) {
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
) {
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
