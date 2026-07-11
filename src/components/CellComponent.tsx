import React, { type FC } from 'react'
import type { Cell } from '../models/Cell'

interface CellProps {
	cell: Cell
	selected: boolean
	onClick: () => void
}

const CellComponent: FC<CellProps> = ({ cell, selected, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
		>
			{cell.available && !cell.figure && <div className='available'> </div>}
			{cell.available && cell.figure && <div className='killable'> </div>}
			{cell.figure?.logo && <img src={cell.figure.logo} className='figure' />}
		</div>
	)
}

export default CellComponent
