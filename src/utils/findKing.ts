import type { CellData, Colors } from '../types'

export const findKing = (
	cells: CellData[][],
	color: Colors,
): CellData | null => {
	for (const row of cells) {
		for (const cell of row) {
			if (cell.figure?.type === 'king' && cell.figure.color === color) {
				return cell // ← Нашёл → немедленно возвращаешь
			}
		}
	}
	return null
}
