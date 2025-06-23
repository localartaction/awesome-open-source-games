import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import GameLobby from './pages/GameLobby'
import CodeEditor from './pages/CodeEditor'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import GameArena from './components/games/GameArena'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300f5ff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lobby" element={<GameLobby />} />
              <Route path="/editor" element={<CodeEditor />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/play/:gameId" element={<GameArena />} />
            </Routes>
          </main>
        </motion.div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#00f5ff',
              border: '1px solid #00f5ff',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App