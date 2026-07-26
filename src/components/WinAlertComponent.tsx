import React, { type FC } from 'react'
import { Colors, type WinAlertProps } from '../types'

const WinAlertComponent: FC<WinAlertProps> = ({ winner, restart }) => {
	if (winner?.color) {
		return (
			<div
				className={`victory-overlay ${winner.color === Colors.WHITE ? 'white-win' : 'black-win'}`}
			>
				<div
					className={`victory-card victory-${winner.color === Colors.WHITE ? 'white' : 'black'}`}
				>
					<div className='victory-border' />
					<div className='victory-content'>
						<span className='victory-subtitle'>Партия завершена</span>
						<h2 className='victory-title'>
							{winner.color === Colors.WHITE
								? 'Белые победили'
								: 'Чёрные победили'}
						</h2>
						<p className='victory-flavor'>
							{winner.color === Colors.WHITE
								? 'Свет верхнего мира рассеял тьму'
								: 'Бездна поглотила последнюю надежду'}
						</p>
						<button className='victory-btn' onClick={restart}>
							Начать новую партию
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default WinAlertComponent
