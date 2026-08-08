export enum Colors {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
	GRAY = 'GRAY',
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
	enPassant?: { isIt: boolean; x: number; y: number }
	readonly id: number
}
export interface PlayerData {
	color: Colors
}
export interface PromotionState {
	cell: CellData
	isIt: boolean
}
export interface FigureData {
	type: FigureType
	readonly color: Colors
}
export interface CastlingRights {
	whiteKingSide: boolean
	whiteQueenSide: boolean
	blackKingSide: boolean
	blackQueenSide: boolean
}
export interface BoardProps {
	cells: CellData[][]
	setCells: (cells: CellData[][]) => void
	currentPlayer: PlayerData
	setCurrentPlayer: (currentPlayer: PlayerData) => void
	lostBlackFigures: FigureData[]
	setLostBlackFigures: (
		figures: FigureData[] | ((figures: FigureData[]) => FigureData[]),
	) => void
	lostWhiteFigures: FigureData[]
	setLostWhiteFigures: (
		figures: FigureData[] | ((figures: FigureData[]) => FigureData[]),
	) => void
	isItStarted: boolean
	setIsItStarted: (arg: boolean) => void
	setPromotion: (arg: PromotionState | null) => void
	castlingRights: CastlingRights
	setCastlingRights: (
		arg: CastlingRights | ((arg: CastlingRights) => CastlingRights),
	) => void
	setWinner: (arg: PlayerData) => void
}
export interface BoardComponentProps {
	props: BoardProps

	selectedCell: CellData | null
	clickOnCell: (cell: CellData) => true | undefined
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
	staleMateTest: () => void
	isItStarted: boolean
	setIsItStarted: (arg: boolean) => void
	whiteTime: number
	blackTime: number
	setSelectedCell: (cell: CellData | null) => void
	setWhiteTime: (arg: number | ((arg: number) => number)) => void
	setBlackTime: (arg: number | ((arg: number) => number)) => void
	setWinner: (arg: PlayerData) => void
}
export interface WinAlertProps {
	winner: PlayerData | null
	restart: () => void
}
export interface GameState {
	cells: CellData[][]
	currentPlayer: PlayerData
	whiteTime: number
	blackTime: number
	lostBlackFigures: FigureData[]
	lostWhiteFigures: FigureData[]
	promotion: PromotionState | null
	castlingRights: CastlingRights
}
export interface PromotionComponentState {
	promotion: PromotionState | null
	onSelect: (type: FigureType) => void
}
