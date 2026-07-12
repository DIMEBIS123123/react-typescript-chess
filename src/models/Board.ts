import { Cell } from './Cell.ts'
import { Colors } from './Colors.ts'
import { Bishop } from './figures/Bishop.ts'
import { King } from './figures/King.ts'
import { Knight } from './figures/Knight.ts'
import { Pawn } from './figures/Pawn.ts'
import { Queen } from './figures/Queen.ts'
import { Rook } from './figures/Rook.ts'

export class Board {
	cells: Cell[][] = []

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = []
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null)) // Черные ячейки
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null)) // Белые ячейки
				}
			}
			this.cells.push(row)
		}
	}
	public getCell(y: number, x: number) {
		return this.cells[y][x]
	}
	public addFigures() {
		new Rook(Colors.WHITE, this.getCell(7, 0))
		new Rook(Colors.WHITE, this.getCell(7, 7))
		new Rook(Colors.BLACK, this.getCell(0, 7))
		new Rook(Colors.BLACK, this.getCell(0, 0))

		new Knight(Colors.WHITE, this.getCell(7, 1))
		new Knight(Colors.WHITE, this.getCell(7, 6))
		new Knight(Colors.BLACK, this.getCell(0, 6))
		new Knight(Colors.BLACK, this.getCell(0, 1))

		new Bishop(Colors.WHITE, this.getCell(7, 2))
		new Bishop(Colors.WHITE, this.getCell(7, 5))
		new Bishop(Colors.BLACK, this.getCell(0, 5))
		new Bishop(Colors.BLACK, this.getCell(0, 2))

		new Queen(Colors.WHITE, this.getCell(7, 4))
		new Queen(Colors.BLACK, this.getCell(0, 4))

		new King(Colors.WHITE, this.getCell(7, 3))
		new King(Colors.BLACK, this.getCell(0, 3))

		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.WHITE, this.getCell(6, i))
			new Pawn(Colors.BLACK, this.getCell(1, i))
		}
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let y = 0; y < this.cells.length; y++) {
			const row = this.cells[y]
			for (let x = 0; x < row.length; x++) {
				const target = row[x]
				target.available = selectedCell?.figure?.canMove(target) ? true : false
			}
		}
	}
}
