import Segment from 'elements/Segment'
import { INIT_SNAKE_SIZE, CELL_SIZE } from './constants'
import { CellColor, type Direction } from './types'

const createTail = (
	head: Segment,
	direction: Direction,
	color: CellColor
): Segment[] => {
	const tail: Segment[] = []

	for (let i = 0; i < INIT_SNAKE_SIZE - 1; i++) {
		let x = head.x
		let y = head.y
		switch (direction) {
			case 'UP':
				y += (i + 1) * CELL_SIZE
				break
			case 'DOWN':
				y -= (i + 1) * CELL_SIZE
				break
			case 'LEFT':
				x += (i + 1) * CELL_SIZE
				break
			case 'RIGHT':
				x -= (i + 1) * CELL_SIZE
				break
		}
		const segment = new Segment(x, y, color)
		tail.push(segment)
	}
	return tail
}

export { createTail }
