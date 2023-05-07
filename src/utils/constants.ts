import {
	type Element,
	type CellColor,
	Player2Controls,
	Direction,
	Player1Controls,
} from './types'

export const INIT_SNAKE_SIZE = 15
export const MOVEMENT_SPEED = 50
export const BOARD_SIZE = 554
export const APPLE_EAT_SCORE_REWARD = 5
export const APPLE_RADIUS = 3
export const CELL_SIZE = 5
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE
export const CELL_COLORS: Record<Element, CellColor> = {
	apple: 'red',
	empty: 'white',
	head2: 'black',
	tail2: 'red',
	head1: 'red',
	tail1: 'black',
}

export const PLAYER_2_CONTROLS: Record<Player2Controls, Direction> = {
	KeyA: 'LEFT',
	KeyD: 'RIGHT',
	KeyW: 'UP',
	KeyS: 'DOWN',
}

export const PLAYER_1_CONTROLS: Record<Player1Controls, Direction> = {
	ArrowLeft: 'LEFT',
	ArrowRight: 'RIGHT',
	ArrowUp: 'UP',
	ArrowDown: 'DOWN',
}
