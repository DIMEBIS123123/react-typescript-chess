import { useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'

import { createInitialBoard } from './utils/boardInitialization'

function App() {
	const [cells, setCells] = useState(() => {
		return createInitialBoard()
	})

	return (
		<div className='app'>
			<BoardComponent cells={cells} setCells={setCells}></BoardComponent>
		</div>
	)
}

export default App
