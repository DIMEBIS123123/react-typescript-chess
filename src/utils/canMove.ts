import type { CellData } from '../types'

export function canMove(selectedCell: CellData, target: CellData) {
	if (selectedCell.figure) return true
}

export function moveFigure(
	cells: CellData[][],
	selectedCell: CellData,
	target: CellData,
) {
	return cells.map(row =>
		row.map(cell => {
			if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
				return { ...cell, figure: null }
			}
			if (cell.x === target.x && cell.y === target.y) {
				return { ...cell, figure: selectedCell.figure }
			}
			return cell
		}),
	)
}
