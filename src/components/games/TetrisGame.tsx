import React, { useEffect, useRef, useCallback } from 'react'

interface TetrisGameProps {
  isPlaying: boolean
  gameState: string
  onScoreUpdate: (score: number) => void
  onGameOver: (score: number) => void
  soundEnabled: boolean
}

const TetrisGame: React.FC<TetrisGameProps> = ({
  isPlaying,
  gameState,
  onScoreUpdate,
  onGameOver,
  soundEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    board: number[][]
    currentPiece: any
    score: number
    lines: number
    level: number
    gameLoop?: NodeJS.Timeout
  }>({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentPiece: null,
    score: 0,
    lines: 0,
    level: 1
  })

  const BLOCK_SIZE = 30
  const CANVAS_WIDTH = 300
  const CANVAS_HEIGHT = 600
  const BOARD_WIDTH = 10
  const BOARD_HEIGHT = 20

  const PIECES = [
    { shape: [[1,1,1,1]], color: '#00f5ff' }, // I
    { shape: [[1,1],[1,1]], color: '#ffff00' }, // O
    { shape: [[0,1,0],[1,1,1]], color: '#ff00ff' }, // T
    { shape: [[0,1,1],[1,1,0]], color: '#00ff00' }, // S
    { shape: [[1,1,0],[0,1,1]], color: '#ff0000' }, // Z
    { shape: [[1,0,0],[1,1,1]], color: '#0000ff' }, // J
    { shape: [[0,0,1],[1,1,1]], color: '#ffa500' }  // L
  ]

  const getRandomPiece = useCallback(() => {
    const piece = PIECES[Math.floor(Math.random() * PIECES.length)]
    return {
      shape: piece.shape,
      color: piece.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0
    }
  }, [])

  const resetGame = useCallback(() => {
    gameRef.current = {
      board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)),
      currentPiece: getRandomPiece(),
      score: 0,
      lines: 0,
      level: 1
    }
    onScoreUpdate(0)
  }, [getRandomPiece, onScoreUpdate])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { board, currentPiece, score, lines, level } = gameRef.current

    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw grid
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    for (let x = 0; x <= CANVAS_WIDTH; x += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(CANVAS_WIDTH, y)
      ctx.stroke()
    }

    // Draw board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = '#00f5ff'
          ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color
      ctx.shadowColor = currentPiece.color
      ctx.shadowBlur = 10
      
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            ctx.fillRect(
              (currentPiece.x + x) * BLOCK_SIZE + 1,
              (currentPiece.y + y) * BLOCK_SIZE + 1,
              BLOCK_SIZE - 2,
              BLOCK_SIZE - 2
            )
          }
        }
      }
      ctx.shadowBlur = 0
    }

    // Draw UI
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px JetBrains Mono'
    ctx.fillText(`Score: ${score}`, 10, CANVAS_HEIGHT + 25)
    ctx.fillText(`Lines: ${lines}`, 10, CANVAS_HEIGHT + 45)
    ctx.fillText(`Level: ${level}`, 10, CANVAS_HEIGHT + 65)
  }, [])

  const isValidMove = useCallback((piece: any, dx: number, dy: number) => {
    const { board } = gameRef.current
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x + dx
          const newY = piece.y + y + dy
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return false
          }
        }
      }
    }
    return true
  }, [])

  const placePiece = useCallback(() => {
    const { board, currentPiece } = gameRef.current
    
    if (!currentPiece) return
    
    // Place piece on board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y
          const boardX = currentPiece.x + x
          if (boardY >= 0) {
            board[boardY][boardX] = 1
          }
        }
      }
    }
    
    // Check for completed lines
    let linesCleared = 0
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (board[y].every(cell => cell === 1)) {
        board.splice(y, 1)
        board.unshift(Array(BOARD_WIDTH).fill(0))
        linesCleared++
        y++ // Check the same line again
      }
    }
    
    // Update score and level
    if (linesCleared > 0) {
      gameRef.current.lines += linesCleared
      gameRef.current.score += linesCleared * 100 * gameRef.current.level
      gameRef.current.level = Math.floor(gameRef.current.lines / 10) + 1
      onScoreUpdate(gameRef.current.score)
      
      if (soundEnabled) {
        // Play line clear sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 600
        oscillator.type = 'square'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      }
    }
    
    // Generate new piece
    gameRef.current.currentPiece = getRandomPiece()
    
    // Check game over
    if (!isValidMove(gameRef.current.currentPiece, 0, 0)) {
      onGameOver(gameRef.current.score)
    }
  }, [getRandomPiece, isValidMove, onGameOver, onScoreUpdate, soundEnabled])

  const update = useCallback(() => {
    const { currentPiece } = gameRef.current
    
    if (!currentPiece) return
    
    if (isValidMove(currentPiece, 0, 1)) {
      currentPiece.y++
    } else {
      placePiece()
    }
  }, [isValidMove, placePiece])

  const gameLoop = useCallback(() => {
    update()
    draw()
  }, [update, draw])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return

      const { currentPiece } = gameRef.current
      if (!currentPiece) return
      
      switch (e.key) {
        case 'ArrowLeft':
          if (isValidMove(currentPiece, -1, 0)) {
            currentPiece.x--
          }
          break
        case 'ArrowRight':
          if (isValidMove(currentPiece, 1, 0)) {
            currentPiece.x++
          }
          break
        case 'ArrowDown':
          if (isValidMove(currentPiece, 0, 1)) {
            currentPiece.y++
          }
          break
        case 'ArrowUp':
          // Rotate piece (simplified rotation)
          const rotated = currentPiece.shape[0].map((_: any, index: number) =>
            currentPiece.shape.map((row: any[]) => row[index]).reverse()
          )
          const rotatedPiece = { ...currentPiece, shape: rotated }
          if (isValidMove(rotatedPiece, 0, 0)) {
            currentPiece.shape = rotated
          }
          break
        case ' ':
          // Hard drop
          while (isValidMove(currentPiece, 0, 1)) {
            currentPiece.y++
          }
          break
      }
      draw()
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [gameState, isValidMove, draw])

  // Game loop management
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      const speed = Math.max(100, 1000 - (gameRef.current.level - 1) * 100)
      const interval = setInterval(gameLoop, speed)
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
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT + 80}
        className="border border-neon-blue/30 rounded"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}

export default TetrisGame