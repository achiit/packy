"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import intro4 from '../assets/packy.png'
import flash from '../assets/flash.png'
import Confetti from 'react-confetti'
import { LeaderboardSheet } from '../components/leaderboard-sheet'
import { LevelSheet } from '../components/level-sheet'

export function GamePage() {
  const { t } = useTranslation()
  const [packies, setPackies] = useState(0)
  const [lightning, setLightning] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [showBounce, setShowBounce] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    key: number,
    x: number,
    y: number,
    opacity: number
  }>>([])
  const confettiKeyRef = useRef(0)
  const lastTapTimeRef = useRef(Date.now())
  const fadeTimeoutRef = useRef<number>()
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isLevelSheetOpen, setIsLevelSheetOpen] = useState(false)

  // Cleanup function for fade timeout
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [])

  // Check for inactivity and start fade
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const now = Date.now()
      if (now - lastTapTimeRef.current > 4000 && confettiPieces.length > 0) {
        const fadeInterval = setInterval(() => {
          setConfettiPieces(prev => {
            const newPieces = prev.map(piece => ({
              ...piece,
              opacity: piece.opacity - 0.1
            })).filter(piece => piece.opacity > 0)

            if (newPieces.length === 0) {
              clearInterval(fadeInterval)
            }

            return newPieces
          })
        }, 50)

        setTimeout(() => {
          clearInterval(fadeInterval)
          setConfettiPieces([])
        }, 1000)
      }
    }, 1000)

    return () => clearInterval(checkInactivity)
  }, [confettiPieces.length])

  // Handle the tap interaction
  const handleTap = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    lastTapTimeRef.current = Date.now()

    const buttonRect = event.currentTarget.getBoundingClientRect()
    const centerX = buttonRect.left + buttonRect.width / 2
    const centerY = buttonRect.top + buttonRect.height / 2

    setConfettiPieces(prev => [
      ...prev.filter(piece => piece.opacity > 0),
      {
        key: confettiKeyRef.current++,
        x: centerX,
        y: centerY,
        opacity: 1
      }
    ])

    setLightning(prev => {
      if (prev + 1 >= 100) {
        setPackies(p => p + 1)
        setShowBounce(true)
        setTimeout(() => setShowBounce(false), 2000)
        return 0
      }
      return prev + 1
    })

    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 100)
  }, [])

  return (
    <div className="h-[calc(98vh-150px)] flex flex-col bg-white px-0 overflow-hidden relative">
      {/* Bouncing Animation */}
      <AnimatePresence>
        {showBounce && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{
              scale: [0, 1.2, 1],
              y: [100, -20, 0],
              rotate: [0, -10, 10, 0]
            }}
            exit={{
              scale: [1, 1.2, 0],
              y: [0, -50, 100],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 1,
              times: [0, 0.6, 1],
              bounce: 0.5,
              type: "spring",
              stiffness: 200
            }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#9FE870] to-[#70E8C5] p-6 rounded-2xl shadow-lg">
              <img src={intro4} alt="Packy" className="w-12 h-12" />
              <span className="text-4xl font-bold text-white">+1</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {confettiPieces.map(piece => (
        <Confetti
          key={piece.key}
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={50}
          gravity={0.3}
          initialVelocityY={15}
          initialVelocityX={5}
          confettiSource={{
            x: piece.x - 50,
            y: piece.y - 50,
            w: 100,
            h: 100
          }}
          recycle={true}
          tweenDuration={3000}
          colors={['#9FE870', '#70E88F', '#70E8C5', '#70BDE8']}
          opacity={piece.opacity}
        />
      ))}

      {/* Header */}
      <div className="h-[60px] flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          animate={{ scale: packies > 0 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px]">
            <img src={intro4} alt="Packy" className="w-6 h-6" />
            <span className="font-medium text-black text-xs">
              {packies} {t('game.packies')}
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px]">
          <button 
            className="flex items-center gap-2"
            onClick={() => setIsLevelSheetOpen(true)}
          >
            <img src={intro4} alt="Backpack" className="w-4 h-4" />
            <span className="text-xs">{t('game.title')}</span>
          
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Main Game Area */}
      <div className="h-[calc(100%-120px)] flex items-center justify-center">
        <button
          onClick={handleTap}
          className={`relative w-60 h-60 rounded-full
            transition-all duration-100 ease-out
            ${isPressed ? 'scale-105' : 'scale-100'}
            bg-white
            shadow-[35px_35px_70px_#bebebe,-35px_-35px_70px_#ffffff]
            active:shadow-[inset_35px_35px_70px_#bebebe,inset_-35px_-35px_70px_#ffffff]`}
        >
          <div className="absolute inset-0 rounded-full border-[#9FE870] border-2">
            <img
              src={intro4}
              alt="Tap Area"
              className="w-full h-full p-12"
            />
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px]">
          <img src={flash} alt="Lightning" className="w-6 h-6" />
          <motion.span
            className="text-[#9FE870] font-medium text-xs"
            animate={{ scale: lightning === 99 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {lightning}/100 {t('game.lightning')}
          </motion.span>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px] cursor-pointer"
          onClick={() => setIsLeaderboardOpen(true)}
        >
          <img src={intro4} alt="Packy" className="w-6 h-6" />
          <span className="text-gray-600 text-xs">{t('game.leaderboard')}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <LeaderboardSheet isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
      <LevelSheet 
        isOpen={isLevelSheetOpen} 
        onClose={() => setIsLevelSheetOpen(false)} 
      />
    </div>
  )
}

