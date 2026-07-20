import React, { type FC } from 'react'
import { Colors, type LostFiguresProps } from '../types'
import { FIGURE_ASSETS } from '../assets/figureAssets'

const LostFiguresComponent: FC<LostFiguresProps> = ({
	title,
	figures,
	color,
}) => {
	return (
		<div
			className={[
				'lost-figures',
				color === Colors.WHITE ? 'lost-figures-white' : 'lost-figures-black',
			].join(' ')}
		>
			<h3>{title}</h3>
			<div className='lost-figures-list'>
				{figures.map((figure, index) => (
					<img
						key={`${figure.color}-${figure.type}-${index}`}
						src={FIGURE_ASSETS[`${figure.color}-${figure.type}`]}
						className='lost-figure'
						alt={`${figure.color} ${figure.type}`}
					/>
				))}
			</div>
		</div>
	)
}

export default LostFiguresComponent
