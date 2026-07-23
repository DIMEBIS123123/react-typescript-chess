import type { CellData } from '../types'

export function kingMove(selectedCell: CellData, target: CellData) {
	const dx = Math.abs(selectedCell.x - target.x)
	const dy = Math.abs(selectedCell.y - target.y)
	if ((dx === 1 || dx === 0) && (dy === 1 || dy === 0)) {
		return true
	}
}
