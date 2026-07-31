import { Colors, type CastlingRights, type CellData } from '../types'
import { getCell } from './checkAvailability'
import { isUnderAttack } from './isUnderAttack'

export function canCastle(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
	castlingRights: CastlingRights,
) {
	if (selectedCell.figure?.type === 'king') {
		if (selectedCell.figure?.color === Colors.WHITE) {
			if (
				castlingRights.whiteKingSide &&
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
						)
					) {
						return false
					}
				}
				return true
			}
			if (
				castlingRights.whiteQueenSide &&
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
						)
					) {
						return false
					}
				}
				return true
			}
		} else {
			if (
				castlingRights.blackKingSide &&
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
						)
					) {
						return false
					}
				}
				return true
			}
			if (
				castlingRights.blackQueenSide &&
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
						)
					) {
						return false
					}
				}
				return true
			}
		}
	}
}
