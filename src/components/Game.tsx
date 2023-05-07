import 'styles/Game.scss'
import React, { useEffect, useRef, useState } from 'react'
import Canvas from './Canvas'
import { BOARD_SIZE } from 'utils/constants'
import { GameState } from 'utils/types'
import { drawApple, drawSnake } from 'utils/draw'
import { useGame } from 'hooks'

export const Game: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [gameState, setGameState] = useState<GameState>('RUNNING')

	const onGameOver = () => {
		setGameState((prev) => 'GAME_OVER')

		setGameState((prev) => 'RUNNING')
		resetGame()
	}

	const { snakes, apple, onKeyDownHandler, resetGame } = useGame({
		gameState,
		onGameOver,
	})

	const handleCanvasDraw = (ctx: CanvasRenderingContext2D) => {
		snakes.map((snake) => drawSnake({ ctx, snake: snake }))
		drawApple({ ctx, apple: apple })
	}

	// focus
	useEffect(() => {
		document.getElementById('game')?.focus()
	}, [])

	return (
		<div className="Game" id="game" onKeyDown={onKeyDownHandler} tabIndex={0}>
			<div className="GameWrapper">
				<div className="GameName">SSSSSSERHII</div>
				<div className="Score">
					<span style={{ color: 'red' }}>{snakes[0].score}</span>
					<span style={{ color: 'black', padding: '0 5px 0 5px' }}>:</span>
					<span style={{ color: 'black' }}>{snakes[1].score}</span>
				</div>
				<Canvas
					ref={canvasRef}
					draw={handleCanvasDraw}
					width={BOARD_SIZE}
					height={BOARD_SIZE}
				/>
			</div>
			<div className="ControlsInfo">
				<b>Control</b>
				<br />
				Red snake via WASD
				<br />
				Black snake via arrow keys (←↓↑→)
			</div>
		</div>
	)
}

export default Game
