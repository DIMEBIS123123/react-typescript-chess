import type { GameState } from '../types'

const STORAGE_KEY = 'chess-game-state'

export const saveGameState = (state: GameState) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	} catch (e) {
		alert('Не удалось сохранить игру:' + e)
		console.log('Не удалось сохранить игру:', e)
	}
}

export const loadGameState = (): GameState | null => {
	try {
		const gameState = localStorage.getItem(STORAGE_KEY)
		if (!gameState) return null
		return JSON.parse(gameState)
	} catch (e) {
		alert('Не удалось сохранить игру:' + e)
		console.log('Не удалось сохранить игру:', e)
		return null
	}
}
export function clearGameState(): void {
	localStorage.removeItem(STORAGE_KEY)
}
