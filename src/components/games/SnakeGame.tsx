import React, { useEffect, useRef, useCallback } from 'react'

interface SnakeGameProps {
  isPlaying: boolean
  gameState: string
  onScoreUpdate: (score: number) => void
  onGameOver: (score: number) => void
  soundEnabled: boolean
}

interface Position {
  x: number
  y: number
}

const SnakeGame: React.FC<SnakeGameProps> = ({
  isPlaying,
  gameState,
  onScoreUpdate,
  onGameOver,
  soundEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    snake: Position[]
    food: Position
    direction: Position
    score: number
    gameLoop?: NodeJS.Timeout
  }>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: 0 },
    score: 0
  })

  const GRID_SIZE = 20
  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 400

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
    }
  }, [])

  const resetGame = useCallback(() => {
    gameRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: generateFood(),
      direction: { x: 0, y: 0 },
      score: 0
    }
    onScoreUpdate(0)
  }, [generateFood, onScoreUpdate])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { snake, food, score } = gameRef.current

    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw grid
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(CANVAS_WIDTH, y)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00f5ff' : '#00d4ff'
      ctx.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      )
      
      // Add glow effect to head
      if (index === 0) {
        ctx.shadowColor = '#00f5ff'
        ctx.shadowBlur = 10
        ctx.fillRect(
          segment.x * GRID_SIZE + 1,
          segment.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        )
        ctx.shadowBlur = 0
      }
    })

    // Draw food
    ctx.fillStyle = '#ff00ff'
    ctx.shadowColor = '#ff00ff'
    ctx.shadowBlur = 15
    ctx.fillRect(
      food.x * GRID_SIZE + 1,
      food.y * GRID_SIZE + 1,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    )
    ctx.shadowBlur = 0

    // Draw score
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px JetBrains Mono'
    ctx.fillText(`Score: ${score}`, 10, 30)
  }, [])

  const update = useCallback(() => {
    const game = gameRef.current
    const { snake, food, direction } = game

    if (direction.x === 0 && direction.y === 0) return

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

    // Check wall collision
    if (
      head.x < 0 ||
      head.x >= CANVAS_WIDTH / GRID_SIZE ||
      head.y < 0 ||
      head.y >= CANVAS_HEIGHT / GRID_SIZE
    ) {
      onGameOver(game.score)
      return
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      onGameOver(game.score)
      return
    }

    snake.unshift(head)

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      game.score += 10
      game.food = generateFood()
      onScoreUpdate(game.score)
      
      // Play sound effect if enabled
      if (soundEnabled) {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        oscillator.type = 'square'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    } else {
      snake.pop()
    }
  }, [generateFood, onGameOver, onScoreUpdate, soundEnabled])

  const gameLoop = useCallback(() => {
    update()
    draw()
  }, [update, draw])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return

      const { direction } = gameRef.current
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) gameRef.current.direction = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (direction.y !== -1) gameRef.current.direction = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (direction.x !== 1) gameRef.current.direction = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (direction.x !== -1) gameRef.current.direction = { x: 1, y: 0 }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [gameState])

  // Game loop management
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      const interval = setInterval(gameLoop, 150)
      gameRef.current.gameLoop = interval
      return () => clearInterval(interval)
    } else if (gameRef.current.gameLoop) {
      clearInterval(gameRef.current.gameLoop)
    }
  }, [isPlaying, gameState, gameLoop])

  // Reset game when needed
  useEffect(() => {
    if (gameState === 'menu') {
      resetGame()
      draw()
    }
  }, [gameState, resetGame, draw])

  // Initial draw
  useEffect(() => {
    draw()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="w-full h-auto max-w-full border border-neon-blue/30 rounded"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

export default SnakeGame