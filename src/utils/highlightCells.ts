import type { CellData } from '../types'
import { canMove } from './canMove'

export function highlightCells(
	cells: CellData[][],
	selectedCell: CellData | null,
) {
	return cells.map(row => {
		return row.map(target => {
			const shouldBeAvailable = canMove(selectedCell, target) ?? false
			if (target.isAvailable !== shouldBeAvailable) {
				console.log('true')
				return { ...target, isAvailable: shouldBeAvailable }
			}
			return target
		})
	})
}
export function getHighlightedCells(
	cells: CellData[][],
	selectedCell: CellData | null,
	setCells: (cells: CellData[][]) => void,
) {
	const newCells = highlightCells(cells, selectedCell)
	setCells(newCells)
}
