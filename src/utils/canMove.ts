import {
	Colors,
	type CastlingRights,
	type CellData,
	type FigureData,
} from '../types'
import {
	getCell,
	isEmptyDiagonal,
	isEmptyHorizontal,
	isEmptyVertical,
} from './checkAvailability'
import { findKing } from './findKing'
import { isKingAttacked } from './isKingAttacked'
import { kingMove } from './kingMove'
import { enPassantCheck, knightMove, pawnMove } from './knightAndPawnMove'

export function canMove(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
	castlightRights: CastlingRights,
): boolean {
	if (selectedCell.figure?.color === target.figure?.color) return false

	const isPseudoLegal = isPseudoLegalMove(
		selectedCell,
		target,
		cells,
		castlightRights,
	)
	if (!isPseudoLegal) return false

	const newCells = moveFigure(cells, selectedCell, target)
	const kingColor = selectedCell.figure!.color
	const kingAfterMove = findKing(newCells, kingColor)

	return !isKingAttacked(newCells, kingAfterMove, castlightRights)
}

function isPseudoLegalMove(
	selectedCell: CellData,
	target: CellData,
	cells: CellData[][],
	castlightRights: CastlingRights,
): boolean {
	switch (selectedCell.figure?.type) {
		case 'pawn':
			return pawnMove(selectedCell, target, cells)
		case 'rook':
			return (
				isEmptyVertical(selectedCell, target, cells) ||
				isEmptyHorizontal(selectedCell, target, cells)
			)
		case 'bishop':
			return isEmptyDiagonal(selectedCell, target, cells)
		case 'knight':
			return knightMove(selectedCell, target)
		case 'queen':
			return (
				isEmptyVertical(selectedCell, target, cells) ||
				isEmptyHorizontal(selectedCell, target, cells) ||
				isEmptyDiagonal(selectedCell, target, cells)
			)
		case 'king':
			return kingMove(selectedCell, target, castlightRights, cells)
		default:
			return false
	}
}

export function moveFigure(
	cells: CellData[][],
	selectedCell: CellData,
	target: CellData,
) {
	// Направление движения пешки: чёрные вниз (+1), белые вверх (-1)
	const direction = selectedCell.figure?.color === Colors.BLACK ? 1 : -1
	const moduleKingX = selectedCell.x - target.x

	return cells.map(row =>
		row.map(cell => {
			if (
				cell.x === target.x + 1 &&
				cell.y === target.y &&
				selectedCell.figure?.type === 'king' &&
				moduleKingX === 2
			) {
				return {
					...cell,
					figure: {
						type: 'rook',
						color: selectedCell.figure?.color,
					} as FigureData,
				}
			}
			if (
				cell.x === 0 &&
				cell.y === target.y &&
				selectedCell.figure?.type === 'king' &&
				moduleKingX === 2
			) {
				return {
					...cell,
					figure: null,
				}
			}
			if (
				cell.x === target.x - 1 &&
				cell.y === target.y &&
				selectedCell.figure?.type === 'king' &&
				moduleKingX === -2
			) {
				return {
					...cell,
					figure: {
						type: 'rook',
						color: selectedCell.figure?.color,
					} as FigureData,
				}
			}
			if (
				cell.x === 7 &&
				cell.y === target.y &&
				selectedCell.figure?.type === 'king' &&
				moduleKingX === -2
			) {
				return {
					...cell,
					figure: null,
				}
			}

			// ──────────────────────────────────────────────
			// 1. СБРОС EN PASSANT
			// Право на взятие на проходе действует только один ход.
			// При любом новом ходе сбрасываем флаг у всех клеток.
			// ──────────────────────────────────────────────
			if (cell !== selectedCell && cell.enPassant?.isIt) {
				return { ...cell, enPassant: { ...cell.enPassant, isIt: false } }
			}

			// ──────────────────────────────────────────────
			// 2. ВЫПОЛНЕНИЕ ВЗЯТИЯ НА ПРОХОДЕ
			// Если берущая пешка имеет право enPassant и движется
			// по диагонали на пустую клетку — удаляем вражескую пешку,
			// которая стоит на той же горизонтали, что и берущая.
			// ──────────────────────────────────────────────
			if (
				selectedCell.enPassant?.isIt &&
				target.y === selectedCell.y + direction &&
				Math.abs(target.x - selectedCell.x) === 1 &&
				getCell(target.x, selectedCell.y, cells)?.figure?.type === 'pawn' &&
				cell.x === target.x &&
				cell.y === selectedCell.y
			) {
				return { ...cell, figure: null }
			}

			// ──────────────────────────────────────────────
			// 3. ОЧИСТКА ИСХОДНОЙ КЛЕТКИ
			// Убираем фигуру с клетки, откуда был сделан ход.
			// Для пешки при первом ходе сбрасываем isFirstTime.
			// Для пешки с enPassant сбрасываем флаг после использования.
			// ──────────────────────────────────────────────
			if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
				if (selectedCell.isFirstTime) {
					return { ...cell, figure: null, isFirstTime: false }
				}
				if (selectedCell.enPassant?.isIt) {
					return {
						...cell,
						figure: null,
						enPassant: { ...selectedCell.enPassant, isIt: false },
					}
				}
				return { ...cell, figure: null }
			}

			// ──────────────────────────────────────────────
			// 4. РАЗМЕЩЕНИЕ ФИГУРЫ НА ЦЕЛЕВОЙ КЛЕТКЕ
			// Обычное перемещение: ставим фигуру на новую позицию.
			// ──────────────────────────────────────────────
			if (cell.x === target.x && cell.y === target.y) {
				return { ...cell, figure: selectedCell.figure }
			}

			// ──────────────────────────────────────────────
			// 5. УСТАНОВКА ФЛАГА EN PASSANT
			// После двойного хода пешки проверяем соседние клетки.
			// Если рядом есть вражеская пешка — помечаем её флагом,
			// давая право взять на проходе на следующем ходу.
			// ──────────────────────────────────────────────
			if (
				(cell.x === target.x + 1 && cell.y === target.y) ||
				(cell.x === target.x - 1 && cell.y === target.y)
			) {
				if (enPassantCheck(selectedCell, target, cells, cell)) {
					return {
						...cell,
						enPassant: { isIt: true, x: target.x, y: target.y },
					}
				}
			}

			// Все остальные клетки возвращаются без изменений
			return cell
		}),
	)
}
