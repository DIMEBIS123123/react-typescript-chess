import moveSound from '../assets/move.wav'
const audio = new Audio(moveSound)
audio.volume = 0.3
audio.preload = 'auto'
export function playMoveSound() {
	audio.currentTime = 0
	audio.play().catch(() => {})
}
