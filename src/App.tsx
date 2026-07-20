import { useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'

import { createInitialBoard } from './utils/boardInitialization'
import { Colors, type FigureData, type PlayerData } from './types'
import LostFiguresComponent from './components/LostFiguresComponent'

function App() {
	const [cells, setCells] = useState(() => {
		return createInitialBoard()
	})

	const [currentPlayer, setCurrentPlayer] = useState<PlayerData>({
		color: Colors.WHITE,
	})
	const [lostBlackFigures, setLostBlackFigures] = useState<FigureData[]>([])
	const [lostWhiteFigures, setLostWhiteFigures] = useState<FigureData[]>([])

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
