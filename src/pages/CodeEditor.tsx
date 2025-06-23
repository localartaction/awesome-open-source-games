import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { 
  Play, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Settings,
  Eye,
  Code,
  Zap,
  Terminal
} from 'lucide-react'
import toast from 'react-hot-toast'

const CodeEditor = () => {
  const [selectedGame, setSelectedGame] = useState('snake')
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const editorRef = useRef(null)

  const games = [
    { id: 'snake', name: 'Snake', language: 'javascript' },
    { id: 'tetris', name: 'Tetris', language: 'javascript' },
    { id: 'pong', name: 'Pong', language: 'javascript' },
    { id: 'breakout', name: 'Breakout', language: 'javascript' }
  ]

  const defaultCode = {
    snake: `// Snake Game Logic
class SnakeGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gridSize = 20;
    this.snake = [{x: 10, y: 10}];
    this.food = this.generateFood();
    this.direction = {x: 0, y: 0};
    this.score = 0;
    
    this.setupControls();
    this.gameLoop();
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp': this.direction = {x: 0, y: -1}; break;
        case 'ArrowDown': this.direction = {x: 0, y: 1}; break;
        case 'ArrowLeft': this.direction = {x: -1, y: 0}; break;
        case 'ArrowRight': this.direction = {x: 1, y: 0}; break;
      }
    });
  }
  
  generateFood() {
    return {
      x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
      y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
    };
  }
  
  update() {
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };
    
    // Check collision with walls
    if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
        head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
      this.gameOver();
      return;
    }
    
    // Check collision with self
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }
    
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = '#00f5ff';
    this.snake.forEach(segment => {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });
    
    // Draw food
    this.ctx.fillStyle = '#ff00ff';
    this.ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2
    );
    
    // Draw score
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '20px monospace';
    this.ctx.fillText(\`Score: \${this.score}\`, 10, 30);
  }
  
  gameLoop() {
    this.update();
    this.draw();
    
    if (!this.gameOver) {
      setTimeout(() => this.gameLoop(), 150);
    }
  }
  
  gameOver() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ff00ff';
    this.ctx.font = '40px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillText(\`Score: \${this.score}\`, this.canvas.width / 2, this.canvas.height / 2 + 50);
  }
}

// Initialize game
const canvas = document.getElementById('gameCanvas');
const game = new SnakeGame(canvas);`,
    
    tetris: `// Tetris Game Logic
class TetrisGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.blockSize = 30;
    this.cols = 10;
    this.rows = 20;
    this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    
    this.pieces = [
      [[1,1,1,1]], // I
      [[1,1],[1,1]], // O
      [[0,1,0],[1,1,1]], // T
      [[0,1,1],[1,1,0]], // S
      [[1,1,0],[0,1,1]], // Z
      [[1,0,0],[1,1,1]], // J
      [[0,0,1],[1,1,1]]  // L
    ];
    
    this.currentPiece = this.getRandomPiece();
    this.setupControls();
    this.gameLoop();
  }
  
  // Add your Tetris logic here...
  // This is a simplified version for demonstration
}`,
    
    pong: `// Pong Game Logic
class PongGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Game objects
    this.paddle1 = { x: 10, y: canvas.height/2 - 50, width: 10, height: 100, speed: 5 };
    this.paddle2 = { x: canvas.width - 20, y: canvas.height/2 - 50, width: 10, height: 100, speed: 5 };
    this.ball = { 
      x: canvas.width/2, 
      y: canvas.height/2, 
      radius: 10, 
      speedX: 5, 
      speedY: 3 
    };
    
    this.score1 = 0;
    this.score2 = 0;
    
    this.setupControls();
    this.gameLoop();
  }
  
  // Add your Pong logic here...
}`,
    
    breakout: `// Breakout Game Logic
class BreakoutGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Game objects
    this.paddle = { 
      x: canvas.width/2 - 50, 
      y: canvas.height - 30, 
      width: 100, 
      height: 10, 
      speed: 8 
    };
    
    this.ball = {
      x: canvas.width/2,
      y: canvas.height - 50,
      radius: 8,
      speedX: 4,
      speedY: -4
    };
    
    this.bricks = [];
    this.initBricks();
    
    this.score = 0;
    this.lives = 3;
    
    this.setupControls();
    this.gameLoop();
  }
  
  // Add your Breakout logic here...
}`
  }

  React.useEffect(() => {
    setCode(defaultCode[selectedGame] || '')
  }, [selectedGame])

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    
    // Configure Monaco Editor
    monaco.editor.defineTheme('arcade-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '00f5ff' },
        { token: 'string', foreground: 'ff00ff' },
        { token: 'number', foreground: '00ff00' },
      ],
      colors: {
        'editor.background': '#1a1a1a',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#00f5ff',
        'editor.selectionBackground': '#00f5ff33',
        'editor.lineHighlightBackground': '#2a2a2a',
      }
    })
    
    monaco.editor.setTheme('arcade-theme')
  }

  const runCode = () => {
    setIsRunning(true)
    toast.success('Code executed successfully!')
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false)
    }, 2000)
  }

  const saveCode = () => {
    localStorage.setItem(`arcade-code-${selectedGame}`, code)
    toast.success('Code saved locally!')
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedGame}-game.js`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Code downloaded!')
  }

  const resetCode = () => {
    setCode(defaultCode[selectedGame] || '')
    toast.success('Code reset to default!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-game font-bold text-neon-green neon-text">
          CODE EDITOR
        </h1>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          Modify game logic in real-time and see your changes come to life
        </p>
      </motion.div>

      {/* Game Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="arcade-panel"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Code className="w-5 h-5 text-neon-green" />
            <span className="font-mono text-white">Select Game:</span>
            <div className="flex space-x-2">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    selectedGame === game.id
                      ? 'bg-neon-green text-black'
                      : 'bg-dark-700 text-gray-400 hover:text-neon-green hover:bg-neon-green/10'
                  }`}
                >
                  {game.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                showPreview
                  ? 'bg-neon-blue/20 text-neon-blue'
                  : 'bg-dark-700 text-gray-400 hover:text-neon-blue'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Editor and Preview Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Editor Toolbar */}
          <div className="arcade-panel">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-neon-green" />
                <span className="font-mono text-sm text-white">
                  {games.find(g => g.id === selectedGame)?.name} Editor
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="game-button text-xs py-2 px-3 border-neon-green text-neon-green hover:bg-neon-green"
                >
                  <div className="flex items-center space-x-1">
                    {isRunning ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>RUN</span>
                  </div>
                </button>
                
                <button
                  onClick={saveCode}
                  className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                </button>
                
                <button
                  onClick={downloadCode}
                  className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                </button>
                
                <button
                  onClick={resetCode}
                  className="p-2 bg-dark-700 text-gray-400 hover:text-neon-pink hover:bg-neon-pink/10 rounded-lg transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="arcade-panel p-0 overflow-hidden">
            <Editor
              height="600px"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
              }}
            />
          </div>
        </motion.div>

        {/* Game Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="arcade-panel">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-neon-blue" />
                  <span className="font-mono text-sm text-white">Live Preview</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-neon-green">LIVE</span>
                </div>
              </div>
              
              {/* Game Canvas */}
              <div className="bg-black rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                <canvas
                  id="gameCanvas"
                  width="400"
                  height="400"
                  className="border border-neon-blue/30 rounded"
                />
              </div>
              
              {/* Game Controls Info */}
              <div className="mt-4 p-3 bg-dark-700 rounded-lg">
                <h4 className="font-mono text-sm text-neon-blue mb-2">Controls:</h4>
                <div className="text-xs font-mono text-gray-400 space-y-1">
                  <div>Arrow Keys: Move</div>
                  <div>Space: Pause/Resume</div>
                  <div>R: Restart Game</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="arcade-panel"
      >
        <h3 className="text-lg font-game font-bold text-white mb-4">Quick Examples</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-dark-700 p-4 rounded-lg">
            <h4 className="font-mono text-sm text-neon-blue mb-2">Speed Modification</h4>
            <code className="text-xs text-gray-300">
              // Change game speed<br/>
              setTimeout(() => this.gameLoop(), 100);
            </code>
          </div>
          <div className="bg-dark-700 p-4 rounded-lg">
            <h4 className="font-mono text-sm text-neon-green mb-2">Color Customization</h4>
            <code className="text-xs text-gray-300">
              // Custom colors<br/>
              this.ctx.fillStyle = '#ff00ff';
            </code>
          </div>
          <div className="bg-dark-700 p-4 rounded-lg">
            <h4 className="font-mono text-sm text-neon-pink mb-2">Physics Tweaks</h4>
            <code className="text-xs text-gray-300">
              // Modify physics<br/>
              this.ball.speedX *= 1.1;
            </code>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CodeEditor