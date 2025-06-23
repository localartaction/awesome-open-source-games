import React, { useEffect, useRef, useCallback } from 'react'

interface PongGameProps {
  isPlaying: boolean
  gameState: string
  onScoreUpdate: (score: number) => void
  onGameOver: (score: number) => void
  soundEnabled: boolean
}

const PongGame: React.FC<PongGameProps> = ({
  isPlaying,
  gameState,
  onScoreUpdate,
  onGameOver,
  soundEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    paddle1: { x: number; y: number; width: number; height: number; speed: number }
    paddle2: { x: number; y: number; width: number; height: number; speed: number }
    ball: { x: number; y: number; radius: number; speedX: number; speedY: number }
    score1: number
    score2: number
    keys: { [key: string]: boolean }
    gameLoop?: NodeJS.Timeout
  }>({
    paddle1: { x: 10, y: 150, width: 10, height: 100, speed: 5 },
    paddle2: { x: 580, y: 150, width: 10, height: 100, speed: 5 },
    ball: { x: 300, y: 200, radius: 10, speedX: 5, speedY: 3 },
    score1: 0,
    score2: 0,
    keys: {}
  })

  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 400

  const resetGame = useCallback(() => {
    gameRef.current = {
      paddle1: { x: 10, y: 150, width: 10, height: 100, speed: 5 },
      paddle2: { x: 580, y: 150, width: 10, height: 100, speed: 5 },
      ball: { x: 300, y: 200, radius: 10, speedX: 5, speedY: 3 },
      score1: 0,
      score2: 0,
      keys: {}
    }
    onScoreUpdate(0)
  }, [onScoreUpdate])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { paddle1, paddle2, ball, score1, score2 } = gameRef.current

    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw center line
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(CANVAS_WIDTH / 2, 0)
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw paddles
    ctx.fillStyle = '#00f5ff'
    ctx.shadowColor = '#00f5ff'
    ctx.shadowBlur = 10
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    
    ctx.fillStyle = '#ff00ff'
    ctx.shadowColor = '#ff00ff'
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    ctx.shadowBlur = 0

    // Draw ball
    ctx.fillStyle = '#00ff00'
    ctx.shadowColor = '#00ff00'
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Draw scores
    ctx.fillStyle = '#ffffff'
    ctx.font = '48px JetBrains Mono'
    ctx.textAlign = 'center'
    ctx.fillText(score1.toString(), CANVAS_WIDTH / 4, 60)
    ctx.fillText(score2.toString(), (3 * CANVAS_WIDTH) / 4, 60)

    // Draw game info
    ctx.font = '16px JetBrains Mono'
    ctx.fillText('W/S: Left Paddle', CANVAS_WIDTH / 4, CANVAS_HEIGHT - 20)
    ctx.fillText('↑/↓: Right Paddle', (3 * CANVAS_WIDTH) / 4, CANVAS_HEIGHT - 20)
  }, [])

  const update = useCallback(() => {
    const { paddle1, paddle2, ball, keys } = gameRef.current

    // Move paddles
    if (keys['w'] || keys['W']) {
      paddle1.y = Math.max(0, paddle1.y - paddle1.speed)
    }
    if (keys['s'] || keys['S']) {
      paddle1.y = Math.min(CANVAS_HEIGHT - paddle1.height, paddle1.y + paddle1.speed)
    }
    if (keys['ArrowUp']) {
      paddle2.y = Math.max(0, paddle2.y - paddle2.speed)
    }
    if (keys['ArrowDown']) {
      paddle2.y = Math.min(CANVAS_HEIGHT - paddle2.height, paddle2.y + paddle2.speed)
    }

    // Move ball
    ball.x += ball.speedX
    ball.y += ball.speedY

    // Ball collision with top/bottom walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= CANVAS_HEIGHT) {
      ball.speedY = -ball.speedY
      
      if (soundEnabled) {
        // Play bounce sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 400
        oscillator.type = 'square'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    }

    // Ball collision with paddles
    if (
      ball.x - ball.radius <= paddle1.x + paddle1.width &&
      ball.y >= paddle1.y &&
      ball.y <= paddle1.y + paddle1.height &&
      ball.speedX < 0
    ) {
      ball.speedX = -ball.speedX
      ball.speedX *= 1.05 // Increase speed slightly
      
      // Add some angle based on where ball hits paddle
      const hitPos = (ball.y - paddle1.y) / paddle1.height
      ball.speedY = (hitPos - 0.5) * 10
    }

    if (
      ball.x + ball.radius >= paddle2.x &&
      ball.y >= paddle2.y &&
      ball.y <= paddle2.y + paddle2.height &&
      ball.speedX > 0
    ) {
      ball.speedX = -ball.speedX
      ball.speedX *= 1.05 // Increase speed slightly
      
      // Add some angle based on where ball hits paddle
      const hitPos = (ball.y - paddle2.y) / paddle2.height
      ball.speedY = (hitPos - 0.5) * 10
    }

    // Score points
    if (ball.x < 0) {
      gameRef.current.score2++
      ball.x = CANVAS_WIDTH / 2
      ball.y = CANVAS_HEIGHT / 2
      ball.speedX = 5
      ball.speedY = Math.random() * 6 - 3
      onScoreUpdate(gameRef.current.score1 + gameRef.current.score2)
    }

    if (ball.x > CANVAS_WIDTH) {
      gameRef.current.score1++
      ball.x = CANVAS_WIDTH / 2
      ball.y = CANVAS_HEIGHT / 2
      ball.speedX = -5
      ball.speedY = Math.random() * 6 - 3
      onScoreUpdate(gameRef.current.score1 + gameRef.current.score2)
    }

    // Check for game end (first to 5 points)
    if (gameRef.current.score1 >= 5 || gameRef.current.score2 >= 5) {
      onGameOver(gameRef.current.score1 + gameRef.current.score2)
    }
  }, [onGameOver, onScoreUpdate, soundEnabled])

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

export default PongGame