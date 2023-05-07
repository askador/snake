import Apple from 'elements/Apple'
import Segment from 'elements/Segment'
import Snake from 'elements/Snake'
import { useState } from 'react'
import {
	APPLE_EAT_SCORE_REWARD,
	APPLE_RADIUS,
	BOARD_SIZE,
	CELL_COLORS,
	CELL_COUNT,
	CELL_SIZE,
	MOVEMENT_SPEED,
	PLAYER_1_CONTROLS,
	PLAYER_2_CONTROLS,
} from 'utils/constants'
import randint from 'utils/randint'
import { createTail } from 'utils/snake'
import {
	Direction,
	GameState,
	Player1Controls,
	Player2Controls,
} from 'utils/types'
import useInterval from './useInterval'
import funnySound from 'sounds/woah.wav'


const initSnakeHeadSegment1: Segment = {
	x: BOARD_SIZE / 2,
	y: BOARD_SIZE / 2,
	color: CELL_COLORS.head1,
}

const initSnakeHeadSegment2: Segment = {
	x: BOARD_SIZE / 2,
	y: BOARD_SIZE / 2,
	color: CELL_COLORS.head2,
}

const initApple = (): Apple => {
	return new Apple(
		randint(10, BOARD_SIZE - 10),
		randint(10, BOARD_SIZE - 10),
		CELL_COLORS.apple
	)
}

const initSnakes = (
	score: Record<number, number> = { 1: 0, 2: 0 } // keep score
): Snake[] => {
	const snake1Direction: Direction = 'LEFT'
	const snake2Direction: Direction = 'RIGHT'

	return [
		new Snake(
			1,
			initSnakeHeadSegment1,
			createTail(initSnakeHeadSegment1, snake1Direction, CELL_COLORS.tail1),
			CELL_COLORS.head1,
			CELL_COLORS.tail1,
			snake1Direction,
			score[1]
		),
		new Snake(
			2,
			initSnakeHeadSegment2,
			createTail(initSnakeHeadSegment2, snake2Direction, CELL_COLORS.tail2),
			CELL_COLORS.head2,
			CELL_COLORS.tail2,
			snake2Direction,
			score[2]
		),
	]
}

interface UseGameProps {
	gameState: GameState
	onGameOver: () => void
}

const useGame = ({ gameState, onGameOver }: UseGameProps) => {
	const [snakes, setSnakes] = useState<Snake[]>(initSnakes())
	const [apple, setApple] = useState<Apple>(initApple())

	const firstPlayerKeyHandler = (code: string) => {
		if (!Object.keys(PLAYER_1_CONTROLS).includes(code)) return
		const direction = PLAYER_1_CONTROLS[code as Player1Controls]
		updateSnakeDirection(1, direction)
	}

	const secondPlayerKeyHandler = (code: string) => {
		if (!Object.keys(PLAYER_2_CONTROLS).includes(code)) return
		const direction = PLAYER_2_CONTROLS[code as Player2Controls]
		updateSnakeDirection(2, direction)
	}

	const updateSnakeDirection = (id: number, direction: Direction) => {
		setSnakes((prev) => {
			const newSnakes = [...prev]
			const snakeIndex = newSnakes.findIndex((snake) => snake.id === id)
			if (snakeIndex !== -1) {
				newSnakes[snakeIndex].turn(direction)
			}
			return newSnakes
		})
	}

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		firstPlayerKeyHandler(e.code)
		secondPlayerKeyHandler(e.code)
	}

  const playFunnySound = () => {
    const audio = new Audio(funnySound)
    audio.play()
  }

	const checkFoodCollision = () => {
		snakes.forEach((snake) => {
			if (
				!(
					Math.abs(snake.head.x - apple.x) <
						(APPLE_RADIUS * 2 > CELL_SIZE ? APPLE_RADIUS * 2 : CELL_SIZE) &&
					Math.abs(snake.head.y - apple.y) <
						(APPLE_RADIUS * 2 > CELL_SIZE ? APPLE_RADIUS * 2 : CELL_SIZE)
				)
			)
				return

      playFunnySound()

			setSnakes((prev) => {
				const newSnakes = [...prev]
				const snakeIndex = newSnakes.findIndex(
					(_snake) => _snake.id === snake.id
				)
				if (snakeIndex !== -1) {
					newSnakes[snakeIndex].eat(APPLE_EAT_SCORE_REWARD)
				}
				return newSnakes
			})

			setApple((prev) => {
				const newApple = prev
				newApple.x = randint(10, BOARD_SIZE - 10)
				newApple.y = randint(10, BOARD_SIZE - 10)
				return newApple
			})
			checkSnakeLenght()
		})
	}

	const checkSnakeLenght = () => {
		snakes.forEach((snake) => {
			if (snake.tail.length >= CELL_COUNT) {
				onGameOver()
			}
		})
	}

	const moveSnakes = () => {
		setSnakes((prev) => {
			const newSnakes = [...prev]
			newSnakes.map((snake) => snake.move())
			return newSnakes
		})
		checkFoodCollision()
	}

	const resetGame = () => {
		setSnakes((prevSnakes) => {
			const scores = prevSnakes.reduce((result, snake) => {
				result[snake.id] = snake.score
				return result
			}, {} as Record<number, number>)
			return initSnakes(scores)
		})
	}

	useInterval(moveSnakes, gameState === 'RUNNING' ? MOVEMENT_SPEED : null)

	return {
		snakes,
		apple,
		onKeyDownHandler,
		resetGame,
	}
}

export default useGame
