import 'styles/Canvas.scss'
import React, { useEffect } from 'react'

type CanvasProps = React.DetailedHTMLProps<
	React.CanvasHTMLAttributes<HTMLCanvasElement>,
	HTMLCanvasElement
> & {
	draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = React.forwardRef<HTMLCanvasElement, CanvasProps>(
	({ draw, ...props }, ref) => {
		useEffect(() => {
			const canvas = (ref as React.RefObject<HTMLCanvasElement>).current
			const ctx = canvas?.getContext('2d')

			if (!!!canvas || !!!ctx) {
				return
			}

			draw(ctx)
			return () => ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
		}, [ref, draw])

		return <canvas ref={ref} {...props} />
	}
)

export default Canvas
