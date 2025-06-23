import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Users, 
  Code, 
  Trophy, 
  User, 
  Gamepad2,
  Zap
} from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/lobby', icon: Users, label: 'Lobby' },
    { path: '/editor', icon: Code, label: 'Code' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="bg-dark-800/80 backdrop-blur-md border-b border-neon-blue/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-neon-blue/10 rounded-lg border border-neon-blue/30"
            >
              <Gamepad2 className="w-6 h-6 text-neon-blue" />
            </motion.div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-game font-bold text-neon-blue neon-text">
                ARCADE
              </span>
              <Zap className="w-4 h-4 text-neon-pink animate-pulse" />
              <span className="text-xl font-game font-bold text-neon-pink neon-text">
                CODE
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-mono text-sm font-medium hidden sm:block">
                      {item.label}
                    </span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* User Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-neon-green/10 rounded-full border border-neon-green/30">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-neon-green text-xs font-mono">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar