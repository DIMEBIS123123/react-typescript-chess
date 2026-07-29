import './App.css'
import BoardComponent from './components/BoardComponent'

import { Colors } from './types'
import LostFiguresComponent from './components/LostFiguresComponent'
import Timer from './components/Timer'

import WinAlertComponent from './components/WinAlertComponent'
import PromotionComponent from './components/PromotionComponent'
import { useChessGame } from './hooks/useChessGame'

function App() {
	const {
		currentPlayer,
		winner,
		promotion,
		boardProps,
		timerProps,
		restart,
		completePromotion,
		lostBlackFigures,
		lostWhiteFigures,
	} = useChessGame()

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

			<Timer {...timerProps} />

			<LostFiguresComponent
				title='Черные потери'
				figures={lostBlackFigures}
				color={Colors.BLACK}
			/>

			<BoardComponent {...boardProps} />

			<LostFiguresComponent
				title='Белые потери'
				figures={lostWhiteFigures}
				color={Colors.WHITE}
			/>

			<WinAlertComponent winner={winner} restart={restart} />

			{promotion && (
				<PromotionComponent
					promotion={promotion}
					onSelect={completePromotion}
				/>
			)}
		</div>
	)
}

export default App
