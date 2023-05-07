export type Element = 'empty' | 'apple' | 'head1' | 'tail1' | 'head2' | 'tail2'
export type CellColor = 'black' | 'white' | 'red'
export type Direction = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT'
export type Player2Controls = 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD'
export type Player1Controls =
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'

export type GameState = 'GAME_OVER' | 'RUNNING'
