import { CellColor, Direction } from 'utils/types'
import Segment from './Segment'
import { BOARD_SIZE, CELL_SIZE } from 'utils/constants'

interface ISnake {
	id: number
	head: Segment
	tail: Segment[]
	headColor: CellColor
	tailColor: CellColor
	direction: Direction
	score: number
}

class Snake implements ISnake {
	id: number
	head: Segment
	tail: Segment[]
	headColor: CellColor
	tailColor: CellColor
	direction: Direction
	score: number = 0

	constructor(
		id: number,
		head: Segment,
		tail: Segment[],
		headColor: CellColor,
		tailColor: CellColor,
		direction: Direction,
		score: number = 0
	) {
		this.id = id
		this.head = head
		this.tail = tail
		this.headColor = headColor
		this.tailColor = tailColor
		this.direction = direction
		this.score = score
	}

	move() {
		const newHead = this.getNextHead()
		this.tail.unshift(this.head)
		this.head = newHead
		this.tail.pop()
	}

	getNextHead(): Segment {
		let { x, y } = this.head
		switch (this.direction) {
			case 'RIGHT':
				x = (x + CELL_SIZE) % BOARD_SIZE
				break
			case 'LEFT':
				x = (x - CELL_SIZE + BOARD_SIZE) % BOARD_SIZE
				break
			case 'UP':
				y = (y - CELL_SIZE + BOARD_SIZE) % BOARD_SIZE
				break
			case 'DOWN':
				y = (y + CELL_SIZE) % BOARD_SIZE
				break
		}
		return new Segment(x, y, this.headColor)
	}

	turn(direction: Direction) {
		// The snake cannot turn back on itself
		if (
			(this.direction === 'RIGHT' && direction === 'LEFT') ||
			(this.direction === 'LEFT' && direction === 'RIGHT') ||
			(this.direction === 'UP' && direction === 'DOWN') ||
			(this.direction === 'DOWN' && direction === 'UP')
		) {
			return
		}
		this.direction = direction
	}

	eat(reward: number) {
		this.score = this.score + reward
		for (let i = 0; i < reward; i++) {
			const tailLen = this.tail.length
			const lastSeg = this.tail[tailLen - 1]
			this.tail.push(new Segment(lastSeg.x, lastSeg.y, lastSeg.color))
		}
	}
}

export default Snake
