import { CellColor } from 'utils/types'

interface ISegment {
	x: number
	y: number
	color: CellColor
}

class Segment implements ISegment {
	x: number
	y: number
	color: CellColor

	constructor(x: number, y: number, color: CellColor) {
		this.x = x
		this.y = y
		this.color = color
	}
}

export default Segment
