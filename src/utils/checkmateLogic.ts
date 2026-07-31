import { Colors, type CellData } from '../types'
import { canMove } from './canMove'
import { findKing } from './findKing'
import { isKingAttacked } from './isKingAttacked'

const ORTHOGONAL_DIRS = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
]
const DIAGONAL_DIRS = [
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
]
const ALL_DIRS = [...ORTHOGONAL_DIRS, ...DIAGONAL_DIRS]

export function getPseudoLegalTargets(
	cell: CellData,
): { x: number; y: number }[] {
	if (!cell.figure) return []

	const targets: { x: number; y: number }[] = []
	const { type, color } = cell.figure
	const { x, y } = cell

	switch (type) {
		case 'pawn': {
			const direction = color === Colors.WHITE ? -1 : 1
			const startRank = color === Colors.WHITE ? 6 : 1

			// Вперёд на 1
			targets.push({ x, y: y + direction })

			// Вперёд на 2 (только с начальной позиции)
			if (y === startRank) {
				targets.push({ x, y: y + direction * 2 })
			}

			// Диагонали (взятие / en passant)
			if (x === 0) {
				targets.push({ x: x + 1, y: y + direction })
			} else if (x === 7) {
				targets.push({ x: x - 1, y: y + direction })
			} else {
				targets.push({ x: x + 1, y: y + direction })
				targets.push({ x: x - 1, y: y + direction })
			}

			break
		}

		case 'knight': {
			const jumps = [
				[-2, -1],
				[-2, 1],
				[-1, -2],
				[-1, 2],
				[1, -2],
				[1, 2],
				[2, -1],
				[2, 1],
			]
			for (const [dx, dy] of jumps) {
				const nx = x + dx
				const ny = y + dy
				if (nx >= 0 && nx <= 7 && ny >= 0 && ny <= 7) {
					targets.push({ x: nx, y: ny })
				}
			}
			break
		}

		case 'king': {
			// 8 соседних клеток (рокировка НЕ включена)
			for (let dx = -1; dx <= 1; dx++) {
				for (let dy = -1; dy <= 1; dy++) {
					if (dx === 0 && dy === 0) continue
					const nx = x + dx
					const ny = y + dy
					if (nx >= 0 && nx <= 7 && ny >= 0 && ny <= 7) {
						targets.push({ x: nx, y: ny })
					}
				}
			}
			break
		}

		case 'rook': {
			addSlidingTargets(x, y, ORTHOGONAL_DIRS, targets)
			break
		}

		case 'bishop': {
			addSlidingTargets(x, y, DIAGONAL_DIRS, targets)
			break
		}

		case 'queen': {
			addSlidingTargets(x, y, ALL_DIRS, targets)
			break
		}
	}

	return targets
}

function addSlidingTargets(
	startX: number,
	startY: number,
	directions: number[][],
	targets: { x: number; y: number }[],
): void {
	for (const [dx, dy] of directions) {
		let nx = startX + dx
		let ny = startY + dy

		while (nx >= 0 && nx <= 7 && ny >= 0 && ny <= 7) {
			targets.push({ x: nx, y: ny })
			nx += dx
			ny += dy
		}
	}
}

export type GameResult = 'continue' | 'checkmate' | 'stalemate'

/**
 * Определяет результат партии после завершения хода.
 * Проверяет текущего игрока (того, чей сейчас ход).
 */
export function checkmateLogic(
	cells: CellData[][],
	currentPlayerColor: Colors,
): GameResult {
	// 1. Ищем хотя бы один легальный ход у текущего игрока
	const hasLegalMove = findAnyLegalMove(cells, currentPlayerColor)

	// 2. Если ходы есть — игра продолжается (даже если шах)
	if (hasLegalMove) return 'continue'

	// 3. Ходов нет. Разница между матом и патом — только в наличии шаха
	const king = findKing(cells, currentPlayerColor)
	const inCheck = isKingAttacked(cells, king)

	return inCheck ? 'checkmate' : 'stalemate'
}

/**
 * Перебирает все фигуры игрока и их псевдолегальные цели.
 * Возвращает true при первом найденном легальном ходе (ранний выход).
 */
function findAnyLegalMove(cells: CellData[][], color: Colors): boolean {
	for (const row of cells) {
		for (const cell of row) {
			if (!cell.figure || cell.figure.color !== color) continue

			const targets = getPseudoLegalTargets(cell)
			for (const t of targets) {
				const targetCell = cells[t.y][t.x]
				console.log('Таргет и сама клетка и сам массив целей')
				console.log(targetCell)
				console.log(cell)
				console.log(targets)
				if (canMove(cell, targetCell, cells)) {
					return true // ← Ранний выход! Не проверяем остальные фигуры
				}
			}
		}
	}
	return false
}
