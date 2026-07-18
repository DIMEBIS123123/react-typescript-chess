import { type FC } from 'react'

import type { CellProps } from '../types'
import { FIGURE_ASSETS } from '../assets/figureAssets'

const CellComponent: FC<CellProps> = ({
	cell,
	selected,
	onClick,
	selectedCell,
}) => {
	return (
		<div
			onClick={onClick}
			className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
		>
			{selectedCell && cell.isAvailable && !cell.figure && (
				<div className='available'> </div>
			)}
			{selectedCell && cell.isAvailable && cell.figure && (
				<div className='killable'> </div>
			)}
			{cell.figure && (
				<img
					src={FIGURE_ASSETS[`${cell.figure.color}-${cell.figure.type}`]}
					className='figure'
				/>
			)}
		</div>
	)
}

export default CellComponent
