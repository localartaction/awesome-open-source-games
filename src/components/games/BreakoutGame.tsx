import React, { useEffect, useRef, useCallback } from 'react'

interface BreakoutGameProps {
  isPlaying: boolean
  gameState: string
  onScoreUpdate: (score: number) => void
  onGameOver: (score: number) => void
  soundEnabled: boolean
}

interface Brick {
  x: number
  y: number
  width: number
  height: number
  destroyed: boolean
  color: string
}

const BreakoutGame: React.FC<BreakoutGameProps> = ({
  isPlaying,
  gameState,
  onScoreUpdate,
  onGameOver,
  soundEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    paddle: { x: number; y: number; width: number; height: number; speed: number }
    ball: { x: number; y: number; radius: number; speedX: number; speedY: number }
    bricks: Brick[]
    score: number
    lives: number
    keys: { [key: string]: boolean }
    gameLoop?: NodeJS.Timeout
  }>({
    paddle: { x: 250, y: 370, width: 100, height: 10, speed: 8 },
    ball: { x: 300, y: 350, radius: 8, speedX: 4, speedY: -4 },
    bricks: [],
    score: 0,
    lives: 3,
    keys: {}
  })

  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 400
  const BRICK_ROWS = 5
  const BRICK_COLS = 10
  const BRICK_WIDTH = 58
  const BRICK_HEIGHT = 20
  const BRICK_PADDING = 2

  const initBricks = useCallback((): Brick[] => {
    const bricks: Brick[] = []
    const colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff']
    
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + 50,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          destroyed: false,
          color: colors[row]
        })
      }
    }
    return bricks
  }, [])

  const resetGame = useCallback(() => {
    gameRef.current = {
      paddle: { x: 250, y: 370, width: 100, height: 10, speed: 8 },
      ball: { x: 300, y: 350, radius: 8, speedX: 4, speedY: -4 },
      bricks: initBricks(),
      score: 0,
      lives: 3,
      keys: {}
    }
    onScoreUpdate(0)
  }, [initBricks, onScoreUpdate])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { paddle, ball, bricks, score, lives } = gameRef.current

    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw paddle
    ctx.fillStyle = '#00f5ff'
    ctx.shadowColor = '#00f5ff'
    ctx.shadowBlur = 10
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.shadowBlur = 0

    // Draw ball
    ctx.fillStyle = '#ff00ff'
    ctx.shadowColor = '#ff00ff'
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Draw bricks
    bricks.forEach(brick => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color
        ctx.shadowColor = brick.color
        ctx.shadowBlur = 5
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        ctx.shadowBlur = 0
      }
    })

    // Draw UI
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px JetBrains Mono'
    ctx.fillText(`Score: ${score}`, 10, 30)
    ctx.fillText(`Lives: ${lives}`, CANVAS_WIDTH - 120, 30)

    // Draw controls
    ctx.font = '14px JetBrains Mono'
    ctx.fillText('← → : Move Paddle', 10, CANVAS_HEIGHT - 10)
  }, [])

  const checkCollision = useCallback((ball: any, rect: any) => {
    return (
      ball.x - ball.radius < rect.x + rect.width &&
      ball.x + ball.radius > rect.x &&
      ball.y - ball.radius < rect.y + rect.height &&
      ball.y + ball.radius > rect.y
    )
  }, [])

  const update = useCallback(() => {
    const { paddle, ball, bricks, keys } = gameRef.current

    // Move paddle
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      paddle.x = Math.max(0, paddle.x - paddle.speed)
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      paddle.x = Math.min(CANVAS_WIDTH - paddle.width, paddle.x + paddle.speed)
    }

    // Move ball
    ball.x += ball.speedX
    ball.y += ball.speedY

    // Ball collision with walls
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= CANVAS_WIDTH) {
      ball.speedX = -ball.speedX
    }
    if (ball.y - ball.radius <= 0) {
      ball.speedY = -ball.speedY
    }

    // Ball collision with paddle
    if (checkCollision(ball, paddle) && ball.speedY > 0) {
      ball.speedY = -ball.speedY
      
      // Add some angle based on where ball hits paddle
      const hitPos = (ball.x - paddle.x) / paddle.width
      ball.speedX = (hitPos - 0.5) * 8
      
      if (soundEnabled) {
        // Play paddle hit sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 300
        oscillator.type = 'square'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    }

    // Ball collision with bricks
    bricks.forEach(brick => {
      if (!brick.destroyed && checkCollision(ball, brick)) {
        brick.destroyed = true
        ball.speedY = -ball.speedY
        gameRef.current.score += 10
        onScoreUpdate(gameRef.current.score)
        
        if (soundEnabled) {
          // Play brick break sound
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
      }
    })

    // Check win condition
    if (bricks.every(brick => brick.destroyed)) {
      onGameOver(gameRef.current.score)
      return
    }

    // Ball falls below paddle
    if (ball.y > CANVAS_HEIGHT) {
      gameRef.current.lives--
      if (gameRef.current.lives <= 0) {
        onGameOver(gameRef.current.score)
      } else {
        // Reset ball position
        ball.x = CANVAS_WIDTH / 2
        ball.y = CANVAS_HEIGHT - 50
        ball.speedX = 4
        ball.speedY = -4
      }
    }
  }, [checkCollision, onGameOver, onScoreUpdate, soundEnabled])

  const gameLoop = useCallback(() => {
    update()
    draw()
  }, [update, draw])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key] = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Game loop management
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      const interval = setInterval(gameLoop, 16) // ~60 FPS
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

export default BreakoutGame