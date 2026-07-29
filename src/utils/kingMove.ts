import { Colors, type CastlingRights, type CellData } from '../types'
import { getCell } from './checkAvailability'
import { isUnderAttack } from './isUnderAttack'

export function kingMove(
	selectedCell: CellData,
	target: CellData,
	castlightRights: CastlingRights,
	cells: CellData[][],
) {
	const dx = Math.abs(selectedCell.x - target.x)
	const dy = Math.abs(selectedCell.y - target.y)

	if (dx <= 1 && dy <= 1 && dx + dy > 0) {
		return true
	}
	if (selectedCell.figure?.color === Colors.WHITE) {
		if (
			castlightRights.whiteKingSide &&
			target.x === selectedCell.x + 2 &&
			target.y === selectedCell.y
		) {
			for (let x = selectedCell.x + 1; x < 7; x++) {
				if (
					getCell(x, selectedCell.y, cells)?.figure ||
					isUnderAttack(
						getCell(x, selectedCell.y, cells)!,
						selectedCell.figure!.color,
						cells,
						castlightRights,
					)
				) {
					return false
				}
			}
			return true
		}
		if (
			castlightRights.whiteQueenSide &&
			target.x === selectedCell.x - 2 &&
			target.y === selectedCell.y
		) {
			for (let x = selectedCell.x - 1; x > 0; x--) {
				if (
					getCell(x, selectedCell.y, cells)?.figure ||
					isUnderAttack(
						getCell(x, selectedCell.y, cells)!,
						selectedCell.figure!.color,
						cells,
						castlightRights,
					)
				) {
					return false
				}
			}
			return true
		}
	} else {
		if (
			castlightRights.blackKingSide &&
			target.x === selectedCell.x + 2 &&
			target.y === selectedCell.y
		) {
			for (let x = selectedCell.x + 1; x < 7; x++) {
				if (
					getCell(x, selectedCell.y, cells)?.figure ||
					isUnderAttack(
						getCell(x, selectedCell.y, cells)!,
						selectedCell.figure!.color,
						cells,
						castlightRights,
					)
				) {
					return false
				}
			}
			return true
		}
		if (
			castlightRights.blackQueenSide &&
			target.x === selectedCell.x - 2 &&
			target.y === selectedCell.y
		) {
			for (let x = selectedCell.x - 1; x > 0; x--) {
				if (
					getCell(x, selectedCell.y, cells)?.figure ||
					isUnderAttack(
						getCell(x, selectedCell.y, cells)!,
						selectedCell.figure!.color,
						cells,
						castlightRights,
					)
				) {
					return false
				}
			}
			return true
		}
	}
	return false
}
