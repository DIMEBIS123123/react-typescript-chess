export enum Colors {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
}

export type FigureType =
	| 'pawn'
	| 'rook'
	| 'knight'
	| 'bishop'
	| 'queen'
	| 'king'

export interface CellData {
	readonly x: number
	readonly y: number
	color: Colors
	figure: FigureData | null
	isAvailable: boolean
	readonly id: number
}

export interface FigureData {
	readonly type: FigureType
	readonly color: Colors
}
export interface BoardProps {
	cells: CellData[][]
	setCells: (cells: CellData[][]) => void
}
export interface CellProps {
	cell: CellData
	selected: boolean
	onClick: () => void
}
