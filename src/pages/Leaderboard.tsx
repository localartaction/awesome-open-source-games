import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  Filter,
  Calendar,
  Users,
  Gamepad2
} from 'lucide-react'

const Leaderboard = () => {
  const [selectedGame, setSelectedGame] = useState('all')
  const [timeFrame, setTimeFrame] = useState('all-time')

  const games = [
    { id: 'all', name: 'All Games' },
    { id: 'snake', name: 'Snake' },
    { id: 'tetris', name: 'Tetris' },
    { id: 'pong', name: 'Pong' },
    { id: 'breakout', name: 'Breakout' }
  ]

  const timeFrames = [
    { id: 'all-time', name: 'All Time' },
    { id: 'monthly', name: 'This Month' },
    { id: 'weekly', name: 'This Week' },
    { id: 'daily', name: 'Today' }
  ]

  const leaderboardData = [
    {
      rank: 1,
      username: 'CodeMaster_X',
      score: 125420,
      game: 'Snake',
      modifications: 23,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'US',
      streak: 15,
      level: 'Legendary'
    },
    {
      rank: 2,
      username: 'PixelWizard',
      score: 118750,
      game: 'Tetris',
      modifications: 31,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'JP',
      streak: 12,
      level: 'Master'
    },
    {
      rank: 3,
      username: 'RetroGamer',
      score: 112340,
      game: 'Pong',
      modifications: 18,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'DE',
      streak: 8,
      level: 'Expert'
    },
    {
      rank: 4,
      username: 'NeonCoder',
      score: 98765,
      game: 'Breakout',
      modifications: 27,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'CA',
      streak: 6,
      level: 'Expert'
    },
    {
      rank: 5,
      username: 'ArcadeKing',
      score: 87654,
      game: 'Snake',
      modifications: 15,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'UK',
      streak: 10,
      level: 'Advanced'
    },
    {
      rank: 6,
      username: 'ByteBender',
      score: 76543,
      game: 'Tetris',
      modifications: 22,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'FR',
      streak: 4,
      level: 'Advanced'
    },
    {
      rank: 7,
      username: 'GameHacker',
      score: 65432,
      game: 'Pong',
      modifications: 19,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'AU',
      streak: 7,
      level: 'Intermediate'
    },
    {
      rank: 8,
      username: 'DigitalNinja',
      score: 54321,
      game: 'Breakout',
      modifications: 12,
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'BR',
      streak: 3,
      level: 'Intermediate'
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-neon-yellow" />
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Medal className="w-6 h-6 text-orange-400" />
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Legendary': return 'text-neon-yellow'
      case 'Master': return 'text-neon-pink'
      case 'Expert': return 'text-neon-blue'
      case 'Advanced': return 'text-neon-green'
      case 'Intermediate': return 'text-orange-400'
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
        <h1 className="text-5xl font-game font-bold text-neon-yellow neon-text">
          LEADERBOARD
        </h1>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          Compete with the best coders and gamers from around the world
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="arcade-panel"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-4 h-4" />
            <span className="font-mono text-white text-sm">Game:</span>
            <div className="flex space-x-1">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`px-3 py-1 rounded-lg font-mono text-sm transition-all duration-300 ${
                    selectedGame === game.id
                      ? 'bg-neon-blue text-black'
                      : 'bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10'
                  }`}
                >
                  {game.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400 w-4 h-4" />
            <span className="font-mono text-white text-sm">Period:</span>
            <div className="flex space-x-1">
              {timeFrames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setTimeFrame(frame.id)}
                  className={`px-3 py-1 rounded-lg font-mono text-sm transition-all duration-300 ${
                    timeFrame === frame.id
                      ? 'bg-neon-green text-black'
                      : 'bg-dark-700 text-gray-400 hover:text-neon-green hover:bg-neon-green/10'
                  }`}
                >
                  {frame.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {leaderboardData.slice(0, 3).map((player, index) => (
          <motion.div
            key={player.username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`arcade-panel text-center relative overflow-hidden ${
              player.rank === 1 ? 'border-neon-yellow' : 
              player.rank === 2 ? 'border-gray-300' : 'border-orange-400'
            }`}
          >
            {/* Rank Badge */}
            <div className="absolute top-4 right-4">
              {getRankIcon(player.rank)}
            </div>

            {/* Avatar */}
            <div className="relative mx-auto w-20 h-20 mb-4">
              <img
                src={player.avatar}
                alt={player.username}
                className="w-full h-full rounded-full object-cover border-2 border-current"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Player Info */}
            <div className="space-y-2">
              <h3 className="font-game font-bold text-white text-lg">{player.username}</h3>
              <div className={`font-mono text-sm ${getLevelColor(player.level)}`}>
                {player.level}
              </div>
              <div className="text-2xl font-game font-bold text-neon-blue">
                {player.score.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {player.game} • {player.modifications} mods
              </div>
            </div>

            {/* Streak */}
            <div className="mt-4 flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-neon-pink" />
              <span className="text-neon-pink font-mono text-sm">{player.streak} day streak</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="arcade-panel"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-game font-bold text-white">Full Rankings</h2>
            <div className="flex items-center space-x-2 text-sm font-mono text-gray-400">
              <Users className="w-4 h-4" />
              <span>{leaderboardData.length} players</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-dark-700 rounded-lg font-mono text-sm text-gray-400 font-bold">
            <div className="col-span-1">RANK</div>
            <div className="col-span-3">PLAYER</div>
            <div className="col-span-2">SCORE</div>
            <div className="col-span-2">GAME</div>
            <div className="col-span-2">MODS</div>
            <div className="col-span-2">STREAK</div>
          </div>

          {/* Player Rows */}
          <div className="space-y-2">
            {leaderboardData.map((player, index) => (
              <motion.div
                key={player.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(42, 42, 42, 0.5)' }}
                className="grid grid-cols-12 gap-4 py-4 px-4 bg-dark-800/50 rounded-lg hover:bg-dark-700/50 transition-all duration-300 cursor-pointer"
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  {getRankIcon(player.rank)}
                </div>

                {/* Player */}
                <div className="col-span-3 flex items-center space-x-3">
                  <img
                    src={player.avatar}
                    alt={player.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-mono font-bold text-white">{player.username}</div>
                    <div className={`text-xs ${getLevelColor(player.level)}`}>
                      {player.level}
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-2 flex items-center">
                  <div className="font-mono font-bold text-neon-blue">
                    {player.score.toLocaleString()}
                  </div>
                </div>

                {/* Game */}
                <div className="col-span-2 flex items-center space-x-2">
                  <Gamepad2 className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-white">{player.game}</span>
                </div>

                {/* Modifications */}
                <div className="col-span-2 flex items-center space-x-2">
                  <Star className="w-4 h-4 text-neon-green" />
                  <span className="font-mono text-neon-green">{player.modifications}</span>
                </div>

                {/* Streak */}
                <div className="col-span-2 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-neon-pink" />
                  <span className="font-mono text-neon-pink">{player.streak} days</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="arcade-panel text-center">
          <Trophy className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-yellow">1,247</div>
          <div className="text-sm font-mono text-gray-400">Total Players</div>
        </div>
        <div className="arcade-panel text-center">
          <Gamepad2 className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-blue">45,892</div>
          <div className="text-sm font-mono text-gray-400">Games Played</div>
        </div>
        <div className="arcade-panel text-center">
          <Star className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-green">12,456</div>
          <div className="text-sm font-mono text-gray-400">Code Mods</div>
        </div>
        <div className="arcade-panel text-center">
          <TrendingUp className="w-8 h-8 text-neon-pink mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-pink">89.2%</div>
          <div className="text-sm font-mono text-gray-400">Completion Rate</div>
        </div>
      </motion.div>
    </div>
  )
}

export default Leaderboard