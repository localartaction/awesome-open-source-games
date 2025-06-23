import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Code, 
  Users, 
  Trophy, 
  Zap, 
  Gamepad2,
  Cpu,
  Terminal
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Gamepad2,
      title: 'Classic Arcade Games',
      description: 'Play Snake, Tetris, Pong, and more with modern twists',
      color: 'neon-blue'
    },
    {
      icon: Code,
      title: 'Live Code Editor',
      description: 'Modify game logic in real-time and see changes instantly',
      color: 'neon-green'
    },
    {
      icon: Users,
      title: 'Multiplayer Battles',
      description: 'Challenge friends or compete with players worldwide',
      color: 'neon-pink'
    },
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Climb the ranks and showcase your coding skills',
      color: 'neon-yellow'
    }
  ]

  const games = [
    { id: 'snake', name: 'Snake', players: 1247, difficulty: 'Easy' },
    { id: 'tetris', name: 'Tetris', players: 892, difficulty: 'Medium' },
    { id: 'pong', name: 'Pong', players: 634, difficulty: 'Easy' },
    { id: 'breakout', name: 'Breakout', players: 445, difficulty: 'Medium' },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-8xl font-game font-black"
          >
            <span className="text-neon-blue neon-text">ARCADE</span>
            <br />
            <span className="text-neon-pink neon-text">CODE</span>
            <br />
            <span className="text-neon-green neon-text">ARENA</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto font-mono"
          >
            Play classic arcade games, modify their code in real-time, and compete with players worldwide. 
            The ultimate fusion of gaming and programming.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/lobby" className="game-button group">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              <span>START PLAYING</span>
            </div>
          </Link>
          
          <Link to="/editor" className="game-button border-neon-green text-neon-green hover:bg-neon-green group">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 group-hover:animate-pulse" />
              <span>CODE EDITOR</span>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="arcade-panel group cursor-pointer"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 border border-${feature.color}/30 flex items-center justify-center group-hover:animate-pulse`}>
                  <Icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.section>

      {/* Popular Games */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-game font-bold text-neon-blue neon-text mb-4">
            POPULAR GAMES
          </h2>
          <p className="text-gray-400 font-mono">
            Join thousands of players in these classic arcade experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="arcade-panel group cursor-pointer"
            >
              <Link to={`/play/${game.id}`} className="block space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-game font-bold text-white group-hover:text-neon-blue transition-colors">
                    {game.name}
                  </h3>
                  <Cpu className="w-5 h-5 text-neon-blue group-hover:animate-spin" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players Online</span>
                    <span className="text-neon-green font-mono">{game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Difficulty</span>
                    <span className={`font-mono ${
                      game.difficulty === 'Easy' ? 'text-neon-green' : 'text-neon-yellow'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-2 text-neon-blue group-hover:text-white transition-colors">
                    <Play className="w-4 h-4" />
                    <span className="font-mono text-sm">PLAY NOW</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="arcade-panel"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-game font-bold text-neon-blue neon-text">12.5K</div>
            <div className="text-gray-400 font-mono text-sm">Active Players</div>
          </div>
          <div>
            <div className="text-3xl font-game font-bold text-neon-green neon-text">8</div>
            <div className="text-gray-400 font-mono text-sm">Games Available</div>
          </div>
          <div>
            <div className="text-3xl font-game font-bold text-neon-pink neon-text">2.1M</div>
            <div className="text-gray-400 font-mono text-sm">Games Played</div>
          </div>
          <div>
            <div className="text-3xl font-game font-bold text-neon-yellow neon-text">450K</div>
            <div className="text-gray-400 font-mono text-sm">Code Modifications</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home