import type { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../../img/bp.png'
import whiteLogo from '../../img/wp.png'

export class Pawn extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
		this.name = FigureNames.PAWN
	}
}
