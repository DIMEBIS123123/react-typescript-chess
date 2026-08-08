import React, { type FC } from 'react'

import CellComponent from './CellComponent'

import { type BoardComponentProps } from '../types'

const BoardComponent: FC<BoardComponentProps> = ({
	selectedCell,
	clickOnCell,
	props,
}) => {
	return (
		<div className='board'>
			{props.cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map(cell => (
						<CellComponent
							cell={cell}
							key={cell.id}
							onClick={() => clickOnCell(cell)}
							selected={
								cell.x === selectedCell?.x && cell.y === selectedCell?.y
							}
							selectedCell={selectedCell}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	)
}

export default React.memo(BoardComponent)
