import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  Gamepad2,
  Code,
  Zap
} from 'lucide-react'

const GameLobby = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const games = [
    {
      id: 'snake',
      name: 'Snake Evolution',
      description: 'Classic snake with power-ups and multiplayer battles',
      players: 1247,
      maxPlayers: 4,
      difficulty: 'Easy',
      rating: 4.8,
      category: 'classic',
      features: ['Multiplayer', 'Code Editor', 'Power-ups'],
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'tetris',
      name: 'Tetris Battle',
      description: 'Competitive Tetris with custom block mechanics',
      players: 892,
      maxPlayers: 2,
      difficulty: 'Medium',
      rating: 4.9,
      category: 'puzzle',
      features: ['1v1 Battle', 'Custom Blocks', 'Live Coding'],
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'pong',
      name: 'Pong Remix',
      description: 'Enhanced Pong with physics modifications',
      players: 634,
      maxPlayers: 2,
      difficulty: 'Easy',
      rating: 4.6,
      category: 'classic',
      features: ['Physics Engine', 'AI Opponents', 'Modifiable'],
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'breakout',
      name: 'Breakout Pro',
      description: 'Breakout with programmable paddle and ball physics',
      players: 445,
      maxPlayers: 1,
      difficulty: 'Medium',
      rating: 4.7,
      category: 'arcade',
      features: ['Physics Coding', 'Level Editor', 'Achievements'],
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'space-invaders',
      name: 'Space Invaders X',
      description: 'Modern take on the classic with weapon customization',
      players: 723,
      maxPlayers: 4,
      difficulty: 'Hard',
      rating: 4.8,
      category: 'shooter',
      features: ['Weapon Coding', 'Co-op Mode', 'Boss Battles'],
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'pacman',
      name: 'Pac-Man AI',
      description: 'Program your own ghost AI and maze layouts',
      players: 567,
      maxPlayers: 1,
      difficulty: 'Hard',
      rating: 4.9,
      category: 'classic',
      features: ['AI Programming', 'Maze Editor', 'Ghost Behavior'],
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Games' },
    { id: 'classic', label: 'Classic' },
    { id: 'puzzle', label: 'Puzzle' },
    { id: 'arcade', label: 'Arcade' },
    { id: 'shooter', label: 'Shooter' }
  ]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || game.category === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-neon-green'
      case 'Medium': return 'text-neon-yellow'
      case 'Hard': return 'text-neon-pink'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-game font-bold text-neon-blue neon-text">
          GAME LOBBY
        </h1>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          Choose your game, modify the code, and compete with players worldwide
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="arcade-panel"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-neon-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue font-mono"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-4 h-4" />
            <div className="flex space-x-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-lg font-mono text-sm transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-neon-blue text-black'
                      : 'bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="arcade-panel group cursor-pointer overflow-hidden"
          >
            <Link to={`/play/${game.id}`} className="block">
              {/* Game Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Users className="w-3 h-3 text-neon-green" />
                    <span className="text-xs font-mono text-white">{game.players}</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Star className="w-3 h-3 text-neon-yellow" />
                    <span className="text-xs font-mono text-white">{game.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={`text-xs font-mono font-bold ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-game font-bold text-white group-hover:text-neon-blue transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{game.description}</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {game.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded text-xs font-mono text-neon-blue"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 font-mono">
                        {game.players}/{game.maxPlayers === 1 ? '∞' : game.maxPlayers}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 font-mono">~15min</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-neon-green" />
                    <Gamepad2 className="w-4 h-4 text-neon-blue" />
                    <div className="flex items-center space-x-1 text-neon-blue group-hover:text-white transition-colors">
                      <Play className="w-4 h-4" />
                      <span className="font-mono text-sm">PLAY</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-game text-gray-400 mb-2">No Games Found</h3>
          <p className="text-gray-500 font-mono">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="arcade-panel"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-game font-bold text-white mb-1">Ready to Code?</h3>
            <p className="text-gray-400 font-mono text-sm">
              Create your own game modifications or start from scratch
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/editor" className="game-button border-neon-green text-neon-green hover:bg-neon-green">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>CODE EDITOR</span>
              </div>
            </Link>
            <button className="game-button border-neon-pink text-neon-pink hover:bg-neon-pink">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>RANDOM GAME</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GameLobby