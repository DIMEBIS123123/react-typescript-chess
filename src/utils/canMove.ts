import type { CellData } from '../types'
import { isEmptyVertical } from './checkAvailability'

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
		return true
	}
	// Четвертая проверка,ЛАДЬЯ:
	if (selectedCell.figure?.type === 'rook') {
		return true
	}
	// Пятая проверка,СЛОН:
	if (selectedCell.figure?.type === 'bishop') {
		return true
	}
	// Шестая проверка,РЫЦАРЬ:
	if (selectedCell.figure?.type === 'knight') {
		return true
	}
	// Седьмая проверка,КОРОЛЕВА:
	if (selectedCell.figure?.type === 'queen') {
		if (isEmptyVertical(selectedCell, target, cells)) {
			return true
		}
	}
	// Восьмая проверка,КОРОЛЬ:
	if (selectedCell.figure?.type === 'king') {
		return true
	}
}

export function moveFigure(
	cells: CellData[][],
	selectedCell: CellData,
	target: CellData,
) {
	return cells.map(row =>
		row.map(cell => {
			if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
				return { ...cell, figure: null }
			}
			if (cell.x === target.x && cell.y === target.y) {
				return { ...cell, figure: selectedCell.figure }
			}
			return cell
		}),
	)
}
