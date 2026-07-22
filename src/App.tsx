import { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'

import { createInitialBoard } from './utils/boardInitialization'
import { Colors, type FigureData, type PlayerData } from './types'
import LostFiguresComponent from './components/LostFiguresComponent'
import Timer from './components/Timer'
import { loadGameState, saveGameState } from './utils/storage'

function App() {
	const [cells, setCells] = useState(() => {
		const saved = loadGameState()
		if (saved?.cells) {
			return saved.cells
		}
		return createInitialBoard()
	})
	const [whiteTime, setWhiteTime] = useState(
		() => loadGameState()?.whiteTime ?? 600,
	)
	const [blackTime, setBlackTime] = useState(
		() => loadGameState()?.blackTime ?? 600,
	)

	const [currentPlayer, setCurrentPlayer] = useState<PlayerData>(() => {
		return (
			loadGameState()?.currentPlayer ?? {
				color: Colors.WHITE,
			}
		)
	})
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
			blackTime,
			whiteTime,
			currentPlayer,
			lostBlackFigures,
			lostWhiteFigures,
		})
	}, [
		cells,
		blackTime,
		whiteTime,
		currentPlayer,
		lostBlackFigures,
		lostWhiteFigures,
	])

	return (
		<div className='app'>
			<h1
				className={
					currentPlayer.color === Colors.WHITE ? 'h1-white' : 'h1-black'
				}
			>
				Текущий игрок:{' '}
				{currentPlayer.color === Colors.WHITE ? 'Белый' : 'Черный'}
			</h1>
			<Timer
				currentPlayer={currentPlayer}
				restart={() => {
					setLostBlackFigures([])
					setLostWhiteFigures([])
					setCurrentPlayer({
						color: Colors.WHITE,
					})
					setCells(createInitialBoard())
				}}
				isItStarted={isItStarted}
				setIsItStarted={setIsItStarted}
				blackTime={blackTime}
				setBlackTime={setBlackTime}
				whiteTime={whiteTime}
				setWhiteTime={setWhiteTime}
			></Timer>
			<LostFiguresComponent
				title='Черные потери'
				figures={lostBlackFigures}
				color={Colors.BLACK}
			></LostFiguresComponent>
			<BoardComponent
				cells={cells}
				setCells={setCells}
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				lostBlackFigures={lostBlackFigures}
				setLostBlackFigures={setLostBlackFigures}
				lostWhiteFigures={lostWhiteFigures}
				setLostWhiteFigures={setLostWhiteFigures}
				isItStarted={isItStarted}
				setIsItStarted={setIsItStarted}
			></BoardComponent>
			<LostFiguresComponent
				title='Белые потери'
				figures={lostWhiteFigures}
				color={Colors.WHITE}
			></LostFiguresComponent>
		</div>
	)
}

export default App
