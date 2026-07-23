import { type CellData } from '../types'
import {
	isEmptyDiagonal,
	isEmptyHorizontal,
	isEmptyVertical,
} from './checkAvailability'
import { kingMove } from './kingMove'
import { enPassantCheck, knightMove, pawnMove } from './knightAndPawnMove'

export function canMove(
	selectedCell: CellData,
	target: CellData,
	cells?: CellData[][],
) {
	// Первая проверка: если своя фигура уже на клетке то нельзя ходить
	if (selectedCell.figure?.color === target.figure?.color) return false
	// Вторая проверка: короля логично что есть нельзя
	if (target.figure?.type === 'king') return false
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

export function moveFigure(
	cells: CellData[][],
	selectedCell: CellData,
	target: CellData,
) {
	return cells.map(row =>
		row.map(cell => {
			if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
				if (selectedCell.isFirstTime === true) {
					return { ...cell, figure: null, isFirstTime: false }
				}
				return { ...cell, figure: null }
			}
			if (cell.x === target.x && cell.y === target.y) {
				return { ...cell, figure: selectedCell.figure }
			}
			if (
				(cell.x === target.x + 1 && cell.y === target.y) ||
				(cell.x === target.x - 1 && cell.y === target.y)
			) {
				if (enPassantCheck(selectedCell, target, cells)) {
					return {
						...cell,
						enPassant: true,
					}
				}
			}
			return cell
		}),
	)
}
