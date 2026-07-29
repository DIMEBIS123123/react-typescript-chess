import { useState, useEffect, useMemo, useCallback } from 'react'
import {
	type CellData,
	type CastlingRights,
	type PromotionState,
	type PlayerData,
	type FigureData,
	Colors,
	type FigureType,
} from '../types'
import { clearGameState, loadGameState, saveGameState } from '../utils/storage'
import { createInitialBoard } from '../utils/boardInitialization'
export function useChessGame() {
	const [cells, setCells] = useState<CellData[][]>(
		() => loadGameState()?.cells ?? createInitialBoard(),
	)

	const [castlingRights, setCastlingRights] = useState<CastlingRights>(
		() =>
			loadGameState()?.castlingRights ?? {
				whiteKingSide: true,
				whiteQueenSide: true,
				blackKingSide: true,
				blackQueenSide: true,
			},
	)

	const [promotion, setPromotion] = useState<PromotionState | null>(
		() => loadGameState()?.promotion ?? null,
	)

	const [whiteTime, setWhiteTime] = useState(
		() => loadGameState()?.whiteTime ?? 600,
	)

	const [blackTime, setBlackTime] = useState(
		() => loadGameState()?.blackTime ?? 600,
	)

	const [currentPlayer, setCurrentPlayer] = useState<PlayerData>(
		() => loadGameState()?.currentPlayer ?? { color: Colors.WHITE },
	)

	const [winner, setWinner] = useState<PlayerData | null>(null)
	const [isItStarted, setIsItStarted] = useState(false)

	const [lostBlackFigures, setLostBlackFigures] = useState<FigureData[]>(
		() => loadGameState()?.lostBlackFigures ?? [],
	)

	const [lostWhiteFigures, setLostWhiteFigures] = useState<FigureData[]>(
		() => loadGameState()?.lostWhiteFigures ?? [],
	)

	useEffect(() => {
		saveGameState({
			cells,
			castlingRights,
			promotion,
			whiteTime,
			blackTime,
			currentPlayer,
			lostBlackFigures,
			lostWhiteFigures,
		})
	}, [
		cells,
		castlingRights,
		promotion,
		whiteTime,
		blackTime,
		currentPlayer,
		lostBlackFigures,
		lostWhiteFigures,
	])

	const restart = useCallback(() => {
		setLostBlackFigures([])
		setLostWhiteFigures([])
		setCurrentPlayer({ color: Colors.WHITE })
		setCells(createInitialBoard())
		setWinner(null)
		setBlackTime(600)
		setWhiteTime(600)
		setIsItStarted(true)
		setPromotion(null)
		setCastlingRights({
			whiteKingSide: true,
			whiteQueenSide: true,
			blackKingSide: true,
			blackQueenSide: true,
		})
		clearGameState()
	}, [])

	const completePromotion = useCallback(
		(type: FigureType) => {
			if (!promotion) return
			const newCells = cells.map(row =>
				row.map(cell => {
					if (
						cell.x === promotion.cell.x &&
						cell.y === promotion.cell.y &&
						promotion.cell.figure
					) {
						return {
							...cell,
							figure: { color: promotion.cell.figure.color, type },
						}
					}
					return cell
				}),
			)
			setCells(newCells)
			setPromotion(null)
			setIsItStarted(true)
		},
		[cells, promotion],
	)

	const boardProps = useMemo(
		() => ({
			cells,
			setCells,
			currentPlayer,
			setCurrentPlayer,
			lostBlackFigures,
			setLostBlackFigures,
			lostWhiteFigures,
			setLostWhiteFigures,
			isItStarted,
			setIsItStarted,
			setPromotion,
			castlingRights,
			setCastlingRights,
		}),
		[
			cells,
			currentPlayer,
			lostBlackFigures,
			lostWhiteFigures,
			isItStarted,
			castlingRights,
		],
	)

	const timerProps = useMemo(
		() => ({
			currentPlayer,
			restart,
			isItStarted,
			setIsItStarted,
			blackTime,
			setBlackTime,
			whiteTime,
			setWhiteTime,
			setWinner,
		}),
		[currentPlayer, restart, isItStarted, blackTime, whiteTime],
	)

	return {
		currentPlayer,
		winner,
		promotion,

		boardProps,
		timerProps,

		restart,
		completePromotion,

		lostBlackFigures,
		lostWhiteFigures,
	}
}
