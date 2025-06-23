import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Star, 
  Calendar, 
  Code, 
  Gamepad2,
  Settings,
  Edit3,
  Save,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    username: 'CodeMaster_X',
    email: 'codemaster@arcade.dev',
    bio: 'Passionate gamer and developer who loves creating and modifying arcade games. Always looking for the next coding challenge!',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  })

  const stats = {
    totalScore: 125420,
    gamesPlayed: 342,
    modifications: 23,
    rank: 1,
    level: 'Legendary',
    streak: 15,
    achievements: 18,
    hoursPlayed: 127
  }

  const recentGames = [
    { name: 'Snake Evolution', score: 12540, date: '2024-01-15', modifications: 3 },
    { name: 'Tetris Battle', score: 8920, date: '2024-01-14', modifications: 1 },
    { name: 'Pong Remix', score: 6780, date: '2024-01-13', modifications: 2 },
    { name: 'Breakout Pro', score: 5430, date: '2024-01-12', modifications: 0 }
  ]

  const achievements = [
    { name: 'First Victory', description: 'Win your first game', icon: Trophy, color: 'neon-yellow', unlocked: true },
    { name: 'Code Warrior', description: 'Make 10 code modifications', icon: Code, color: 'neon-green', unlocked: true },
    { name: 'Speed Demon', description: 'Complete a game in under 2 minutes', icon: Zap, color: 'neon-blue', unlocked: true },
    { name: 'Perfectionist', description: 'Get a perfect score', icon: Target, color: 'neon-pink', unlocked: true },
    { name: 'Streak Master', description: 'Maintain a 10-day streak', icon: TrendingUp, color: 'neon-yellow', unlocked: true },
    { name: 'Legendary', description: 'Reach legendary rank', icon: Award, color: 'neon-pink', unlocked: false }
  ]

  const favoriteGames = [
    { name: 'Snake Evolution', playTime: '45h', bestScore: 12540 },
    { name: 'Tetris Battle', playTime: '32h', bestScore: 8920 },
    { name: 'Pong Remix', playTime: '28h', bestScore: 6780 },
    { name: 'Breakout Pro', playTime: '22h', bestScore: 5430 }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
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
          PROFILE
        </h1>
        <p className="text-gray-400 font-mono">
          Your gaming journey and achievements
        </p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="arcade-panel"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-neon-blue"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-green rounded-full flex items-center justify-center border-2 border-dark-800">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <h2 className="text-3xl font-game font-bold text-white">{profile.username}</h2>
              <div className="px-3 py-1 bg-neon-yellow/20 border border-neon-yellow/50 rounded-full">
                <span className="text-neon-yellow font-mono text-sm font-bold">{stats.level}</span>
              </div>
            </div>
            
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-neon-blue/30 rounded-lg text-white font-mono text-sm resize-none"
                  rows={3}
                />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="w-full p-2 bg-dark-700 border border-neon-blue/30 rounded-lg text-white font-mono text-sm"
                  placeholder="Location"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-400 font-mono max-w-md">{profile.bio}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm font-mono text-gray-400">
                  <span>📍 {profile.location}</span>
                  <span>📅 Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Edit Button */}
          <div className="flex space-x-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="game-button border-neon-green text-neon-green hover:bg-neon-green"
              >
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>SAVE</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="game-button"
              >
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-4 h-4" />
                  <span>EDIT</span>
                </div>
              </button>
            )}
            <button className="p-3 bg-dark-700 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="arcade-panel text-center">
          <Trophy className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-yellow">#{stats.rank}</div>
          <div className="text-sm font-mono text-gray-400">Global Rank</div>
        </div>
        <div className="arcade-panel text-center">
          <Star className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-blue">{stats.totalScore.toLocaleString()}</div>
          <div className="text-sm font-mono text-gray-400">Total Score</div>
        </div>
        <div className="arcade-panel text-center">
          <Gamepad2 className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-green">{stats.gamesPlayed}</div>
          <div className="text-sm font-mono text-gray-400">Games Played</div>
        </div>
        <div className="arcade-panel text-center">
          <Code className="w-8 h-8 text-neon-pink mx-auto mb-2" />
          <div className="text-2xl font-game font-bold text-neon-pink">{stats.modifications}</div>
          <div className="text-sm font-mono text-gray-400">Code Mods</div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="arcade-panel"
        >
          <h3 className="text-xl font-game font-bold text-white mb-4 flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-neon-blue" />
            <span>Recent Games</span>
          </h3>
          <div className="space-y-3">
            {recentGames.map((game, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                <div>
                  <div className="font-mono font-bold text-white">{game.name}</div>
                  <div className="text-sm text-gray-400 font-mono">{game.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-neon-blue">{game.score.toLocaleString()}</div>
                  <div className="text-sm text-neon-green font-mono">{game.modifications} mods</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="arcade-panel"
        >
          <h3 className="text-xl font-game font-bold text-white mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-neon-yellow" />
            <span>Achievements</span>
            <span className="text-sm text-gray-400">({achievements.filter(a => a.unlocked).length}/{achievements.length})</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked
                      ? `bg-${achievement.color}/10 border-${achievement.color}/30`
                      : 'bg-gray-800 border-gray-600 opacity-50'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${
                    achievement.unlocked ? `text-${achievement.color}` : 'text-gray-500'
                  }`} />
                  <div className={`font-mono font-bold text-sm ${
                    achievement.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    {achievement.description}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Favorite Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="arcade-panel"
      >
        <h3 className="text-xl font-game font-bold text-white mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-neon-pink" />
          <span>Favorite Games</span>
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteGames.map((game, index) => (
            <div key={index} className="bg-dark-700 p-4 rounded-lg text-center">
              <div className="font-mono font-bold text-white mb-2">{game.name}</div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400 font-mono">Play Time: {game.playTime}</div>
                <div className="text-sm text-neon-blue font-mono">Best: {game.bestScore.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Profile