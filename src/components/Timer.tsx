import React, { useEffect, useRef, useState, type FC } from 'react'
import { Colors, type TimerProps } from '../types'

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(600)
	const [whiteTime, setWhiteTime] = useState(600)
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)

	useEffect(startTimer, [currentPlayer])

	function decrementWhiteTime() {
		setWhiteTime(prev => prev - 1)
	}
	function decrementBlackTime() {
		setBlackTime(prev => prev - 1)
	}

	function startTimer() {
		const callback =
			currentPlayer.color === Colors.WHITE
				? decrementWhiteTime
				: decrementBlackTime
		timer.current = setInterval(callback, 1000)
		return () => {
			if (timer.current !== null) {
				clearInterval(timer.current)
				timer.current = null
			}
		}
	}

	return (
		<div>
			<div>
				<button onClick={restart}>Restart Game</button>
				<h2>Черные - {blackTime}</h2>
				<h2>Белые - {whiteTime}</h2>
			</div>
		</div>
	)
}

export default Timer
