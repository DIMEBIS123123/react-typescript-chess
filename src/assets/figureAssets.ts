import bb from './bb.png'
import wb from './wb.png'
import bking from './bking.png'
import wking from './wking.png'
import bknight from './bknight.png'
import wknight from './wknight.png'
import bp from './bp.png'
import wp from './wp.png'
import bq from './bq.png'
import wq from './wq.png'
import br from './br.png'
import wr from './wr.png'

export const FIGURE_ASSETS: Record<string, string> = {
	// Black
	'BLACK-bishop': bb,
	'BLACK-king': bking,
	'BLACK-knight': bknight,
	'BLACK-pawn': bp,
	'BLACK-queen': bq,
	'BLACK-rook': br,

	// White
	'WHITE-bishop': wb,
	'WHITE-king': wking,
	'WHITE-knight': wknight,
	'WHITE-pawn': wp,
	'WHITE-queen': wq,
	'WHITE-rook': wr,
}
