import type { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../../img/br.png'
import whiteLogo from '../../img/wr.png'

export class Rook extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
		this.name = FigureNames.ROOK
	}
}
