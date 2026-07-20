import { Colors, type PlayerData } from '../types'

export function swapPlayer(current: PlayerData | null): Colors {
	return current?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
}
