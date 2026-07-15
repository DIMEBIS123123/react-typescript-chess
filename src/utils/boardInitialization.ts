// engine/boardFactory.ts

import { Colors, type CellData, type FigureType } from '../types'

export function createInitialBoard(): CellData[][] {
	const cells: CellData[][] = []

	for (let y = 0; y < 8; y++) {
		const row: CellData[] = []
		for (let x = 0; x < 8; x++) {
			row.push({
				x,
				y,
				color: (x + y) % 2 === 0 ? Colors.WHITE : Colors.BLACK,
				figure: null,
				isAvailable: false,
				id: y * 8 + x,
			})
		}
		cells.push(row)
	}

	const place = (x: number, y: number, type: FigureType, color: Colors) => {
		cells[y][x].figure = { type, color }
	}

	// Черные
	place(0, 0, 'rook', Colors.BLACK)
	place(7, 0, 'rook', Colors.BLACK)
	place(1, 0, 'knight', Colors.BLACK)
	place(6, 0, 'knight', Colors.BLACK)
	place(2, 0, 'bishop', Colors.BLACK)
	place(5, 0, 'bishop', Colors.BLACK)
	place(3, 0, 'queen', Colors.BLACK)
	place(4, 0, 'king', Colors.BLACK)
	for (let x = 0; x < 8; x++) place(x, 1, 'pawn', Colors.BLACK)

	// Белые
	for (let x = 0; x < 8; x++) place(x, 6, 'pawn', Colors.WHITE)
	place(0, 7, 'rook', Colors.WHITE)
	place(7, 7, 'rook', Colors.WHITE)
	place(1, 7, 'knight', Colors.WHITE)
	place(6, 7, 'knight', Colors.WHITE)
	place(2, 7, 'bishop', Colors.WHITE)
	place(5, 7, 'bishop', Colors.WHITE)
	place(3, 7, 'queen', Colors.WHITE)
	place(4, 7, 'king', Colors.WHITE)

	return cells
}
