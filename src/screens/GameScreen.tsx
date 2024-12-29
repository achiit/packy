"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import intro4 from '../assets/packy.png'
import flash from '../assets/flash.png'
import { LeaderboardSheet } from '../components/leaderboard-sheet'
import { LevelSheet } from '../components/level-sheet'
import { useTelegram } from '../context/TelegramContext'

interface FloatingElement {
  id: number
  x: number
  y: number
  angle: number
  delay: number
}

export function GamePage() {
  const { t } = useTranslation()
  const { userDataFromDB, updatePackies } = useTelegram()
  const [packies, setPackies] = useState(0)
  const [lightning, setLightning] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [showBounce, setShowBounce] = useState(false)
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const idCounterRef = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isLevelSheetOpen, setIsLevelSheetOpen] = useState(false)

  // Initialize packies from Firestore data
  useEffect(() => {
    if (userDataFromDB) {
      setPackies(userDataFromDB.packies || 0)
    }
  }, [userDataFromDB])

  // Handle the tap interaction
  const handleTap = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + (rect.width / 2)
    const centerY = rect.top + (rect.height / 2)

    // Create 8 elements in a circle around the center
    const newElements = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 8 // Evenly space around circle
      return {
        id: idCounterRef.current++,
        x: centerX,
        y: centerY,
        angle: angle,
        delay: i * 0.05 // Stagger the animations
      }
    })

    setFloatingElements(prev => [...prev, ...newElements])

    // Remove elements after animation
    setTimeout(() => {
      setFloatingElements(prev => 
        prev.filter(el => !newElements.find(newEl => newEl.id === el.id))
      )
    }, 1000)

    setLightning(prev => {
      if (prev + 1 >= 100) {
        const newPackiesCount = packies + 1
        setPackies(newPackiesCount)
        updatePackies(newPackiesCount)
        setShowBounce(true)
        setTimeout(() => setShowBounce(false), 2000)
        return 0
      }
      return prev + 1
    })

    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 100)
  }, [packies, updatePackies])

  return (
    <div className="h-[calc(98vh-150px)] flex flex-col bg-white px-0 overflow-hidden relative">
      {/* Floating Elements Animations */}
      <AnimatePresence>
        {floatingElements.map(element => (
          <motion.div
            key={element.id}
            initial={{ 
              opacity: 0,
              scale: 0.2,
              x: element.x,
              y: element.y
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.2, 1.5, 0.8],
              x: element.x + Math.cos(element.angle) * 100, // Increased radius
              y: element.y + Math.sin(element.angle) * 100 - 50, // Added upward drift
              transition: {
                duration: 0.8,
                delay: element.delay,
                ease: "easeOut"
              }
            }}
            className="fixed pointer-events-none z-50 font-bold text-2xl"
            style={{
              background: 'linear-gradient(to right, #9FE870, #70E8C5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: 'translate(-50%, -50%)'
            }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>

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
      <div className="h-[calc(100%-120px)] flex items-center justify-center relative">
        <button
          ref={buttonRef}
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

