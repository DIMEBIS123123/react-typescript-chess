import type { CellData } from '../types'

import {
	isEmptyDiagonal,
	isEmptyHorizontal,
	isEmptyVertical,
} from './checkAvailability'
import { kingMove } from './kingMove'
import { knightMove, pawnMove } from './knightAndPawnMove'

export function kingThreat(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
) {
	{
		// Первая проверка: если своя фигура уже на клетке то нельзя ходить
		if (selectedCell.figure?.color === target.figure?.color) return false

		// Третья проверка,ПЕШКА:
		if (selectedCell.figure?.type === 'pawn') {
			if (pawnMove(selectedCell, target, cells)) {
				return true
			}
		}
		// Четвертая проверка,ЛАДЬЯ:
		else if (selectedCell.figure?.type === 'rook') {
			if (isEmptyVertical(selectedCell, target, cells)) {
				return true
			} else if (isEmptyHorizontal(selectedCell, target, cells)) {
				return true
			}
		}
		// Пятая проверка,СЛОН:
		else if (selectedCell.figure?.type === 'bishop') {
			if (isEmptyDiagonal(selectedCell, target, cells)) {
				return true
			}
		}
		// Шестая проверка,КОНЬ:
		else if (selectedCell.figure?.type === 'knight') {
			if (knightMove(selectedCell, target)) {
				return true
			}
		}
		// Седьмая проверка,КОРОЛЕВА:
		else if (selectedCell.figure?.type === 'queen') {
			if (isEmptyVertical(selectedCell, target, cells)) {
				return true
			} else if (isEmptyHorizontal(selectedCell, target, cells)) {
				return true
			} else if (isEmptyDiagonal(selectedCell, target, cells)) {
				return true
			}
		}
		// Восьмая проверка,КОРОЛЬ:
		else if (selectedCell.figure?.type === 'king') {
			if (kingMove(selectedCell, target)) {
				return true
			}
		}
		return false
	}
}

export function isKingAttacked(cells: CellData[][], kingCell: CellData | null) {
	for (const row of cells) {
		for (const cell of row) {
			if (kingThreat(cell, kingCell!, cells)) {
				return true
			}
		}
	}
	return false
}
