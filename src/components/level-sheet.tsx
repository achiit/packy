"use client"

import { X, ChevronRight } from 'lucide-react'
import crownIcon from '../assets/animatedcrown.png'
import backpackIcon from '../assets/packy.png'
import lock from '../assets/lock.png'
import { useState, useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { calculateLevel, getNextLevel, levelThresholds } from '../utils/levelCalculator'

// Import all level images
import level1 from '../assets/levels/1.png'
import level2 from '../assets/levels/2.png'
import level3 from '../assets/levels/3.png'
import level4 from '../assets/levels/4.png'
import level5 from '../assets/levels/5.png'
import level6 from '../assets/levels/6.png'
import level7 from '../assets/levels/7.png'
import level8 from '../assets/levels/8.png'
import level9 from '../assets/levels/9.png'
import level10 from '../assets/levels/10.png'
import level11 from '../assets/levels/11.png'
import level12 from '../assets/levels/12.png'
import level13 from '../assets/levels/13.png'
import level14 from '../assets/levels/14.png'
import level15 from '../assets/levels/15.png'
import level16 from '../assets/levels/16.png'
import level17 from '../assets/levels/17.png'
import level18 from '../assets/levels/18.png'
import level19 from '../assets/levels/19.png'
import level20 from '../assets/levels/20.png'

const levelImages = {
  1: level1, 2: level2, 3: level3, 4: level4, 5: level5,
  6: level6, 7: level7, 8: level8, 9: level9, 10: level10,
  11: level11, 12: level12, 13: level13, 14: level14, 15: level15,
  16: level16, 17: level17, 18: level18, 19: level19, 20: level20,
}

const getLevelTitle = (level: number) => {
  switch(level) {
    case 0: return "Nub Packy"
    case 1: return "Bronze Packy"
    case 2: return "Silver Packy"
    case 3: return "Gold Packy"
    case 4: return "Platinum Packy"
    case 5: return "Diamond Packy"
    default: return `Level ${level} Packy`
  }
}

interface LevelSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function LevelSheet({ isOpen, onClose }: LevelSheetProps) {
  const { userDataFromDB } = useTelegram()
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all')

  const headerRef = useRef<HTMLDivElement>(null)

  const currentPackies = userDataFromDB?.packies || 0
  const currentLevel = calculateLevel(currentPackies)
  const nextLevel = getNextLevel(currentLevel.level)
  const packiesNeeded = nextLevel ? nextLevel.packies - currentPackies : 0

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!headerRef.current) return

    // setIsHeaderSticky(scrollTop > headerOffset)
  }

  // Get remaining levels for the list
  const remainingLevels = levelThresholds.filter(level => level.level > currentLevel.level)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-x-0 bottom-0 z-50 h-[90vh] rounded-t-[32px] bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={crownIcon} alt="Crown" className="w-12 h-12" />
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
                {/* Current Level Card - only show in 'all' tab */}
                {activeTab === 'all' && (
                  <>
                    <h2 className="text-2xl px-6 py-4 font-bold">Packy levels & Perks</h2>

                    <div className="px-4 mb-3">
                      <div className="bg-[#D6F905] rounded-[20px] p-3 border-2 border-[#b8cc0c]">
                        <div className="flex items-center justify-between">
                          <p className="text-l text-[#6c7e04]">You're at this level</p>
                          <span className="bg-white px-2 py-0.5 rounded-full text-xs border border-grey">
                            Level {currentLevel.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="bg-white rounded-full p-3">
                            <img 
                              src={currentLevel.level === 0 ? backpackIcon : levelImages[currentLevel.level as keyof typeof levelImages]} 
                              alt="Level" 
                              className="w-12 h-12" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold">{getLevelTitle(currentLevel.level)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {nextLevel && (
                        <div className="mt-6 bg-white rounded-full border border-gray-400 py-3 px-8 text-center">
                          <p className="text-gray-600 text-sm">
                            Need {packiesNeeded} Packy more to upgrade
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Tabs */}
                <div ref={headerRef} className={cn(
                  "flex gap-6 px-6 py-3 z-50 bg-white transition-all duration-200",
                  "sticky top-0 shadow-sm border-b"
                )}>
                  <button
                    className={cn(
                      "text-lg pb-1 border-b-2 transition-colors",
                      activeTab === 'all' 
                        ? "font-bold border-black" 
                        : "text-gray-400 border-transparent"
                    )}
                    onClick={() => setActiveTab('all')}
                  >
                    All
                  </button>
                  <button
                    className={cn(
                      "text-lg pb-1 border-b-2 transition-colors",
                      activeTab === 'completed' 
                        ? "font-bold border-black" 
                        : "text-gray-400 border-transparent"
                    )}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                </div>

                {/* Content based on active tab */}
                <div className="px-4 pb-8">
                  {activeTab === 'all' ? (
                    <>
                      <h3 className="text-xl text-gray-500 mb-4">Upcoming Levels</h3>
                      <div className="space-y-3">
                        {remainingLevels.map((level) => (
                          <div 
                            key={level.level} 
                            className="bg-white rounded-2xl border border-gray-300 p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-[#D6F905] rounded-full p-2.5">
                                <img 
                                  src={levelImages[level.level as keyof typeof levelImages]} 
                                  alt="Level" 
                                  className="w-6 h-6" 
                                />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Level {level.level} | {getLevelTitle(level.level)}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <img src={backpackIcon} alt="" className="w-4 h-4" />
                                  <p className="text-gray-500">
                                    Unlock with {level.packies} Packy
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-100 rounded-full p-2.5">
                              <img src={lock} alt="Lock" className="w-7 h-7 opacity-40" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl text-gray-500 mb-4">Completed Levels</h3>
                      <div className="space-y-3">
                        {levelThresholds
                          .filter(level => level.level <= currentLevel.level)
                          .map((level) => (
                            <div 
                              key={level.level} 
                              className="bg-white rounded-2xl border border-gray-300 p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-[#D6F905] rounded-full p-2.5">
                                  <img 
                                    src={levelImages[level.level as keyof typeof levelImages]} 
                                    alt="Level" 
                                    className="w-6 h-6" 
                                  />
                                </div>
                                <div>
                                  <p className="text-lg font-medium">
                                    Level {level.level} | {getLevelTitle(level.level)}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <img src={backpackIcon} alt="" className="w-4 h-4" />
                                    <p className="text-gray-500">
                                      Unlocked at {level.packies} Packy
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-[#D6F905] rounded-full p-2.5">
                                <ChevronRight className="w-5 h-5 text-black/70" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

