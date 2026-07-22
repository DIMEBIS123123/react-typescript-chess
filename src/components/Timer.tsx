import React, { useEffect, useRef, type FC } from 'react'
import { Colors, type TimerProps } from '../types'
import { clearGameState } from '../utils/storage'

const Timer: FC<TimerProps> = ({
	currentPlayer,
	restart,
	isItStarted,
	setIsItStarted,
	blackTime,
	setBlackTime,
	whiteTime,
	setWhiteTime,
}) => {
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)

	useEffect(startTimer, [currentPlayer, isItStarted])

	function decrementWhiteTime() {
		setWhiteTime(prev => prev - 1)
	}
	function decrementBlackTime() {
		setBlackTime(prev => prev - 1)
	}
	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60)
		const s = seconds % 60
		return `${m}:${s.toString().padStart(2, '0')}`
	}
	function startTimer() {
		if (!isItStarted) {
			return
		}
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
		<div className='timer-panel'>
			<button
				className='restart-btn'
				onClick={() => {
					clearGameState()
					setBlackTime(600)
					setWhiteTime(600)
					setIsItStarted(true)
					restart()
				}}
			>
				⟳ Перезапустить
			</button>
			<button
				className='restart-btn '
				onClick={() => {
					if (isItStarted) {
						setIsItStarted(false)
					} else {
						setIsItStarted(true)
					}
				}}
			>
				{isItStarted ? '⏸' : '►'}
			</button>
			<button
				className='restart-btn'
				onClick={() => {
					setIsItStarted(true)
					clearGameState()
					setBlackTime(600)
					setWhiteTime(600)
					restart()
				}}
			>
				Начать партию
			</button>

			<div className='timers'>
				<div
					className={`timer-unit timer-black ${currentPlayer?.color === Colors.BLACK ? 'active' : ''}`}
				>
					<span className='timer-label'>Чёрные</span>
					<span className='timer-value'>{formatTime(blackTime)}</span>
				</div>

				<div
					className={`timer-unit timer-white ${currentPlayer?.color === Colors.WHITE ? 'active' : ''}`}
				>
					<span className='timer-label'>Белые</span>
					<span className='timer-value'>{formatTime(whiteTime)}</span>
				</div>
			</div>
		</div>
	)
}

export default Timer
