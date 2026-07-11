import type { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../../img/bb.png'
import whiteLogo from '../../img/wb.png'

export class Bishop extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
		this.name = FigureNames.BISHOP
	}
}
