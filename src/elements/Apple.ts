import { CellColor } from 'utils/types'

interface IApple {
	x: number
	y: number
	color: CellColor
}

class Apple implements IApple {
	x: number
	y: number
	color: CellColor

	constructor(x: number, y: number, color: CellColor) {
		this.x = x
		this.y = y
		this.color = color
	}
}

export default Apple
