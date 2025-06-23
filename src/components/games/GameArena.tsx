import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Users, 
  Code,
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize,
  Trophy
} from 'lucide-react'
import SnakeGame from './SnakeGame'
import TetrisGame from './TetrisGame'
import PongGame from './PongGame'
import BreakoutGame from './BreakoutGame'

const GameArena = () => {
  const { gameId } = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameState, setGameState] = useState('menu') // menu, playing, paused, gameOver
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const gameInfo = {
    snake: {
      name: 'Snake Evolution',
      description: 'Classic snake with modern twists and power-ups',
      controls: ['Arrow Keys: Move', 'Space: Pause', 'R: Restart'],
      component: SnakeGame
    },
    tetris: {
      name: 'Tetris Battle',
      description: 'Competitive Tetris with custom mechanics',
      controls: ['Arrow Keys: Move/Rotate', 'Space: Drop', 'C: Hold'],
      component: TetrisGame
    },
    pong: {
      name: 'Pong Remix',
      description: 'Enhanced Pong with physics modifications',
      controls: ['W/S: Left Paddle', 'Up/Down: Right Paddle', 'Space: Serve'],
      component: PongGame
    },
    breakout: {
      name: 'Breakout Pro',
      description: 'Breakout with programmable mechanics',
      controls: ['Left/Right: Move Paddle', 'Space: Launch Ball', 'P: Pause'],
      component: BreakoutGame
    }
  }

  const currentGame = gameInfo[gameId as keyof typeof gameInfo]

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem(`highscore-${gameId}`)
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
  }, [gameId])

  useEffect(() => {
    // Save high score when it changes
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem(`highscore-${gameId}`, score.toString())
    }
  }, [score, highScore, gameId])

  const handleGameStart = () => {
    setIsPlaying(true)
    setGameState('playing')
    setScore(0)
  }

  const handleGamePause = () => {
    setIsPlaying(false)
    setGameState('paused')
  }

  const handleGameResume = () => {
    setIsPlaying(true)
    setGameState('playing')
  }

  const handleGameRestart = () => {
    setIsPlaying(false)
    setGameState('menu')
    setScore(0)
  }

  const handleGameOver = (finalScore: number) => {
    setIsPlaying(false)
    setGameState('gameOver')
    setScore(finalScore)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (!currentGame) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-game text-gray-400 mb-4">Game Not Found</h2>
        <Link to="/lobby" className="game-button">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lobby
        </Link>
      </div>
    )
  }

  const GameComponent = currentGame.component

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link
            to="/lobby"
            className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-game font-bold text-neon-blue neon-text">
              {currentGame.name}
            </h1>
            <p className="text-gray-400 font-mono text-sm">{currentGame.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/editor"
            className="game-button border-neon-green text-neon-green hover:bg-neon-green text-sm py-2 px-3"
          >
            <Code className="w-4 h-4 mr-1" />
            MODIFY
          </Link>
        </div>
      </motion.div>

      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="arcade-panel text-center">
          <div className="text-2xl font-game font-bold text-neon-blue">{score.toLocaleString()}</div>
          <div className="text-sm font-mono text-gray-400">Current Score</div>
        </div>
        <div className="arcade-panel text-center">
          <div className="text-2xl font-game font-bold text-neon-yellow">{highScore.toLocaleString()}</div>
          <div className="text-sm font-mono text-gray-400">High Score</div>
        </div>
        <div className="arcade-panel text-center">
          <div className="text-2xl font-game font-bold text-neon-green">1,247</div>
          <div className="text-sm font-mono text-gray-400">Online Players</div>
        </div>
        <div className="arcade-panel text-center">
          <div className="text-2xl font-game font-bold text-neon-pink">#{1}</div>
          <div className="text-sm font-mono text-gray-400">Your Rank</div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 arcade-panel"
        >
          {/* Game Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {gameState === 'menu' && (
                <button
                  onClick={handleGameStart}
                  className="game-button border-neon-green text-neon-green hover:bg-neon-green"
                >
                  <Play className="w-4 h-4 mr-2" />
                  START
                </button>
              )}
              
              {gameState === 'playing' && (
                <button
                  onClick={handleGamePause}
                  className="game-button border-neon-yellow text-neon-yellow hover:bg-neon-yellow"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  PAUSE
                </button>
              )}
              
              {gameState === 'paused' && (
                <button
                  onClick={handleGameResume}
                  className="game-button border-neon-green text-neon-green hover:bg-neon-green"
                >
                  <Play className="w-4 h-4 mr-2" />
                  RESUME
                </button>
              )}
              
              <button
                onClick={handleGameRestart}
                className="game-button border-neon-pink text-neon-pink hover:bg-neon-pink"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                RESTART
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
              >
                <Maximize className="w-4 h-4" />
              </button>
              
              <button className="p-2 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <GameComponent
              isPlaying={isPlaying}
              gameState={gameState}
              onScoreUpdate={setScore}
              onGameOver={handleGameOver}
              soundEnabled={soundEnabled}
            />
            
            {/* Game Overlay */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-game font-bold text-neon-blue neon-text">
                    {currentGame.name}
                  </h2>
                  <p className="text-gray-400 font-mono">Press START to begin</p>
                  <button
                    onClick={handleGameStart}
                    className="game-button border-neon-green text-neon-green hover:bg-neon-green"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    START GAME
                  </button>
                </div>
              </div>
            )}
            
            {gameState === 'paused' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-game font-bold text-neon-yellow neon-text">
                    PAUSED
                  </h2>
                  <button
                    onClick={handleGameResume}
                    className="game-button border-neon-green text-neon-green hover:bg-neon-green"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    RESUME
                  </button>
                </div>
              </div>
            )}
            
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-game font-bold text-neon-pink neon-text">
                    GAME OVER
                  </h2>
                  <div className="space-y-2">
                    <div className="text-xl font-mono text-white">
                      Score: <span className="text-neon-blue">{score.toLocaleString()}</span>
                    </div>
                    {score === highScore && (
                      <div className="text-neon-yellow font-mono animate-pulse">
                        🎉 NEW HIGH SCORE! 🎉
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={handleGameRestart}
                      className="game-button border-neon-green text-neon-green hover:bg-neon-green"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      PLAY AGAIN
                    </button>
                    <Link
                      to="/lobby"
                      className="game-button border-neon-blue text-neon-blue hover:bg-neon-blue"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      LOBBY
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Controls */}
          <div className="arcade-panel">
            <h3 className="text-lg font-game font-bold text-white mb-3 flex items-center space-x-2">
              <Settings className="w-4 h-4 text-neon-blue" />
              <span>Controls</span>
            </h3>
            <div className="space-y-2">
              {currentGame.controls.map((control, index) => (
                <div key={index} className="text-sm font-mono text-gray-400">
                  {control}
                </div>
              ))}
            </div>
          </div>

          {/* Online Players */}
          <div className="arcade-panel">
            <h3 className="text-lg font-game font-bold text-white mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4 text-neon-green" />
              <span>Online Players</span>
            </h3>
            <div className="space-y-2">
              {['CodeMaster_X', 'PixelWizard', 'RetroGamer', 'NeonCoder'].map((player, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-white">{player}</span>
                  <span className="font-mono text-neon-blue">{Math.floor(Math.random() * 10000)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="arcade-panel">
            <h3 className="text-lg font-game font-bold text-white mb-3 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-neon-yellow" />
              <span>Top Scores</span>
            </h3>
            <div className="space-y-2">
              {[125420, 118750, 112340, 98765, 87654].map((topScore, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-gray-400">#{index + 1}</span>
                  <span className="font-mono text-neon-yellow">{topScore.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GameArena