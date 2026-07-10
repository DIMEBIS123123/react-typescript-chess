import type { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'
import blackBishop from '../../img/bb.png'
import whiteBishop from '../../img/wb.png'

export class Bishop extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.WHITE ? whiteBishop : blackBishop
		this.name = FigureNames.BISHOP
	}
}
