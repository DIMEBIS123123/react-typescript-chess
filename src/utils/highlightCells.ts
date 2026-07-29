import type { CastlingRights, CellData } from '../types'
import { canMove } from './canMove'

export function highlightCells(
	cells: CellData[][],
	selectedCell: CellData,
	castlingRights: CastlingRights,
) {
	return cells.map(row => {
		return row.map(target => {
			const shouldBeAvailable =
				canMove(selectedCell, target, cells, castlingRights) ?? false
			if (target.isAvailable !== shouldBeAvailable) {
				return { ...target, isAvailable: shouldBeAvailable }
			}
			return target
		})
	})
}
