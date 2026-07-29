import type { CastlingRights, CellData, Colors } from '../types'
import { canMove } from './canMove'

// Проверка для рокировки конкретно клеток между королем и ладьей, под атакой ли они u know)
export function isUnderAttack(
	target: CellData,
	color: Colors,
	cells: CellData[][],
	castlingRights: CastlingRights,
) {
	for (const row of cells) {
		for (const cell of row) {
			if (
				cell.figure?.color !== color &&
				canMove(cell, target, cells, castlingRights)
			) {
				return true
			}
		}
	}
}
