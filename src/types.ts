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
	isFirstTime?: boolean
	enPassant?: boolean
	readonly id: number
}
export interface PlayerData {
	color: Colors
}

export interface FigureData {
	readonly type: FigureType
	readonly color: Colors
}
export interface BoardProps {
	cells: CellData[][]
	setCells: (cells: CellData[][]) => void
	currentPlayer: PlayerData
	setCurrentPlayer: (currentPlayer: PlayerData) => void
	lostBlackFigures: FigureData[]
	setLostBlackFigures: (figures: FigureData[]) => void
	lostWhiteFigures: FigureData[]
	setLostWhiteFigures: (figures: FigureData[]) => void
	isItStarted: boolean
	setIsItStarted: (arg: boolean) => void
}
export interface CellProps {
	cell: CellData
	selectedCell: CellData | null
	selected: boolean
	onClick: () => void
}
export interface LostFiguresProps {
	title: string
	figures: FigureData[]
	color: Colors
}
export interface TimerProps {
	currentPlayer: PlayerData
	restart: () => void
	isItStarted: boolean
	setIsItStarted: (arg: boolean) => void
	whiteTime: number
	blackTime: number
	setWhiteTime: (arg: number | ((arg: number) => number)) => void
	setBlackTime: (arg: number | ((arg: number) => number)) => void
}
export interface GameState {
	cells: CellData[][]
	currentPlayer: PlayerData
	whiteTime: number
	blackTime: number
	lostBlackFigures: FigureData[]
	lostWhiteFigures: FigureData[]
}
