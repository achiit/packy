"use client"

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Heart } from 'lucide-react'

import intro4 from '../assets/packy.png'
import flash from '../assets/flash.png'
import { LeaderboardSheet } from '../components/leaderboard-sheet'
import { LevelSheet } from '../components/level-sheet'
import { useTelegram } from '../context/TelegramContext'
import { calculateLevel, getLevelTitle } from '../utils/levelCalculator'

type Click = {
  id: number
  x: number
  y: number
}

type PackyAnimation = {
  id: number
}

export function GamePage() {
  const { t } = useTranslation()
  const { userDataFromDB, updatePackies } = useTelegram()
  const [packies, setPackies] = useState(0)
  const [lightning, setLightning] = useState(0)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isLevelSheetOpen, setIsLevelSheetOpen] = useState(false)
  const [clicks, setClicks] = useState<Click[]>([])
  const [packyAnimations, setPackyAnimations] = useState<PackyAnimation[]>([])

  useEffect(() => {
    if (userDataFromDB) {
      setPackies(userDataFromDB.packies || 0)
    }
  }, [userDataFromDB])

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX
    const y = e.clientY

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const tiltX = (e.clientX - rect.left - rect.width / 2) / 10
    const tiltY = (e.clientY - rect.top - rect.height / 2) / 10
    
    button.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`
    
    setTimeout(() => {
      button.style.transform = ''
    }, 100)

    setClicks([...clicks, { id: Date.now(), x, y }])

    if (lightning + 1 >= 100) {
      const newPackiesCount = packies + 1
      setPackies(newPackiesCount)
      updatePackies(newPackiesCount)
      setLightning(0)
      setPackyAnimations(prev => [...prev, { id: Date.now() }])
    } else {
      setLightning(lightning + 1)
    }
  }

  const handleAnimationEnd = (id: number) => {
    setClicks(prevClicks => prevClicks.filter(click => click.id !== id))
  }

  const handlePackyAnimationEnd = (id: number) => {
    setPackyAnimations(prev => prev.filter(anim => anim.id !== id))
  }

  const { level: currentLevel } = calculateLevel(packies)
  const levelName = getLevelTitle(currentLevel)

  return (
    <div className="h-[calc(98vh-150px)] flex flex-col bg-white px-0 overflow-hidden relative">
      {/* Removed background gradient and pattern */}
      
      {/* Header */}
      <div className="h-[60px] flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-[15px]">
            <img src={intro4} alt="Packy" className="w-4 h-4" />
            <span className="font-medium text-black text-xs">
              {packies} {t('game.packies')}
            </span>
          </div>
       
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-[15px]">
          <button 
            className="flex items-center gap-2"
            onClick={() => setIsLevelSheetOpen(true)}
          >
            <img src={intro4} alt="Backpack" className="w-4 h-4" />
            <span className="text-xs">{levelName}</span>
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Main Game Area */}
      <div className="h-[calc(100%-120px)] flex items-center justify-center relative">
        <button
          onClick={handleTap}
          className="relative w-72 h-72 rounded-full bg-white/80 backdrop-blur-sm shadow-[0_0_40px_rgba(79,70,229,0.1)] transition-transform duration-100 ease-out"
        >
          <div className="absolute inset-0 rounded-full border-[#D6F905] border-2">
            <img
              src={intro4}
              alt="Tap Area"
              className="w-full h-full p-12"
            />
          </div>
        </button>

        {/* Animation Layer - Updated positioning and z-index */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {clicks.map((click) => (
            <div
              key={click.id}
              className="absolute pointer-events-none animate-heart-float"
              style={{
                top: `${click.y}px`,
                left: `${click.x}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onAnimationEnd={() => handleAnimationEnd(click.id)}
            >
              <Heart className="w-12 h-12 text-[#D6F905] fill-[#D6F905]" />
            </div>
          ))}
        </div>

        {/* Packy animations */}
        {packyAnimations.map((anim) => (
          <div
            key={anim.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-packy"
            onAnimationEnd={() => handlePackyAnimationEnd(anim.id)}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-full">
              <img src={intro4} alt="Packy" className="w-6 h-6" />
              <span className="font-bold text-[#D6F905]">+1 Packy!</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-4">
        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#D6F905] transition-all duration-300 ease-out"
            style={{ width: `${(lightning / 100) * 100}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="h-[60px] flex items-center justify-between z-40">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/70  rounded-[15px]">
          <img src={flash} alt="Lightning" className="w-6 h-6" />
          <span className="text-[#34C759] font-medium text-xs">
            {lightning}/100 {t('game.lightning')}
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-[15px] cursor-pointer"
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

      <style>
        {`
          @keyframes heart-float {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -300%) scale(1.2);
            }
          }
          .animate-heart-float {
            animation: heart-float 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          @keyframes packy {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.2);
            }
            40% {
              transform: translate(-50%, -50%) scale(1);
            }
            60% {
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -80%) scale(1);
            }
          }
          .animate-packy {
            animation: packy 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}
      </style>
    </div>
  )
}

