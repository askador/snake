import Apple from 'elements/Apple'
import Snake from 'elements/Snake'
import { APPLE_RADIUS, CELL_SIZE } from 'utils/constants'

interface DrawArgs {
	ctx: CanvasRenderingContext2D
}

interface DrawSnakeArgs extends DrawArgs {
	snake: Snake
}

interface DrawAppleArgs extends DrawArgs {
	apple: Apple
}

export const drawSnake = ({ ctx, snake }: DrawSnakeArgs) => {
	// head
	ctx.fillStyle = snake.headColor
	ctx.fillRect(snake.head.x, snake.head.y, CELL_SIZE, CELL_SIZE)

	// tail
	ctx.fillStyle = snake.tailColor
	snake.tail.forEach((seg) => {
		ctx.fillRect(seg.x, seg.y, CELL_SIZE, CELL_SIZE)
	})
}

export const drawApple = ({ ctx, apple }: DrawAppleArgs) => {
	ctx.beginPath()
	ctx.fillStyle = apple.color
	ctx.arc(apple.x, apple.y, APPLE_RADIUS, 0, 2 * Math.PI, false)
	ctx.fill()
	// ctx.fillStyle = apple.color
	// ctx.fillRect(apple.x, apple.y, APPLE_RADIUS, APPLE_RADIUS)
}
