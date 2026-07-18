import type { CellData } from '../types'
import { canMove } from './canMove'

export function highlightCells(cells: CellData[][], selectedCell: CellData) {
	return cells.map(row => {
		return row.map(target => {
			const shouldBeAvailable = canMove(selectedCell, target, cells) ?? false
			if (target.isAvailable !== shouldBeAvailable) {
				return { ...target, isAvailable: shouldBeAvailable }
			}
			return target
		})
	})
}
