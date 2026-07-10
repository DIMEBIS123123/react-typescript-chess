import React, { type FC } from 'react'
import type { Cell } from '../models/Cell'

interface CellProps {
	cell: Cell
}

const CellComponent: FC<CellProps> = ({ cell }) => {
	return <div className={['cell', cell.color].join(' ')}>{cell.figure}</div>
}

export default CellComponent
