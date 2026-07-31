import React, { type FC } from 'react'
import { Colors, type WinAlertProps } from '../types'

const WinAlertComponent: FC<WinAlertProps> = ({ winner, restart }) => {
	if (!winner?.color) return null

	const isDraw = winner.color === Colors.GRAY
	const isWhite = winner.color === Colors.WHITE

	// Определяем CSS-классы и тексты в зависимости от результата
	const overlayClass = isDraw ? 'draw-win' : isWhite ? 'white-win' : 'black-win'

	const cardClass = isDraw
		? 'victory-draw'
		: isWhite
			? 'victory-white'
			: 'victory-black'

	const title = isDraw
		? 'Ничья'
		: isWhite
			? 'Белые победили'
			: 'Чёрные победили'

	const flavor = isDraw
		? 'Ни свет, ни тьма не одержали верх'
		: isWhite
			? 'Свет верхнего мира рассеял тьму'
			: 'Бездна поглотила последнюю надежду'

	return (
		<div className={`victory-overlay ${overlayClass}`}>
			<div className={`victory-card ${cardClass}`}>
				<div className='victory-border' />
				<div className='victory-content'>
					<span className='victory-subtitle'>Партия завершена</span>
					<h2 className='victory-title'>{title}</h2>
					<p className='victory-flavor'>{flavor}</p>
					<button className='victory-btn' onClick={restart}>
						Начать новую партию
					</button>
				</div>
			</div>
		</div>
	)
}

export default WinAlertComponent
