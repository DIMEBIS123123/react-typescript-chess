import React, { type FC } from 'react'
import { Colors, type FigureType, type PromotionComponentState } from '../types'
import { FIGURE_ASSETS } from '../assets/figureAssets'

const PromotionComponent: FC<PromotionComponentState> = ({
	promotion,
	onSelect,
}) => {
	const FIGURES: FigureType[] = ['queen', 'rook', 'bishop', 'knight']

	return (
		<div
			className={`promotion-overlay promotion-${promotion?.cell.figure?.color === Colors.WHITE ? 'white' : 'black'}`}
		>
			<div className='promotion-card'>
				<span className='promotion-subtitle'>Превращение</span>
				<h3 className='promotion-title'>Выберите фигуру</h3>

				<div className='promotion-options'>
					{FIGURES.map(type => (
						<button
							key={type}
							className='promotion-option'
							onClick={() => onSelect(type)}
							aria-label={`Превратить в ${type}`}
						>
							<img
								src={FIGURE_ASSETS[`${promotion?.cell.figure?.color}-${type}`]}
								alt={type}
								className='promotion-figure'
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default PromotionComponent
