"use client"

import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import crownIcon from '../assets/animatedcrown.png'
import backpackIcon from '../assets/packy.png'
import lock from '../assets/lock.png'

import { useState, useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface LevelSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function LevelSheet({ isOpen, onClose }: LevelSheetProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all')
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

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
    const scrollTop = e.currentTarget.scrollTop
    const headerOffset = headerRef.current.offsetTop
    setIsHeaderSticky(scrollTop > headerOffset)
  }

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
                {/* Current Level Card */}
                <h2 className="text-2xl px-6 py-4 font-bold">Packy levels & Perks</h2>

                <div className="px-4 mb-3">
                  <div className="bg-[#D6F905] rounded-[20px] p-3 border-2 border-[#b8cc0c]">
                    <div className="flex items-center justify-between">
                      <p className="text-l text-[#6c7e04]">You're at this level</p>
                      <span className="bg-white px-2 py-0.5 rounded-full text-xs border border-grey">
                        Level 1 - Bronze
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="bg-white rounded-full p-3">
                        <img src={backpackIcon} alt="Backpack" className="w-12 h-12" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">Nub Packy</p>
                          
                        </div>
                      </div>
                    </div>
                   
                  </div>
                  <div className="mt-6 bg-white rounded-full border border-gray-400 py-3 px-8 text-center">
                    <p className="text-gray-600 text-sm">
                      Need 1224 Packy more to upgrade
                    </p>
                  </div>
                </div>
              

                {/* Tabs */}
                <div 
                  ref={headerRef}
                  className={cn(
                    "flex gap-6 px-6 py-3 bg-white transition-all duration-200",
                    isHeaderSticky && "sticky top-0 shadow-sm border-b"
                  )}
                >
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

                {/* Upcoming Levels */}
                <div className="px-4 pb-8">
                  <h3 className="text-xl text-gray-500 mb-4">Upcoming Levels</h3>
                  <h4 className="text-lg text-gray-500 mb-3">Bronze</h4>
                  
                  {/* Level Items */}
                  <div className="space-y-3">
                    {[
                      { level: 1, title: 'GM Packy', amount: 1000 },
                      { level: 2, title: 'Captain Packy', amount: 1500 },
                      { level: 3, title: 'GN Packy', amount: 2000 },
                      { level: 4, title: 'QT Packy', amount: 2200 },
                    ].map((item) => (
                      <div 
                        key={item.level} 
                        className="bg-white rounded-2xl border border-gray-300 p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-[#D6F905] rounded-full p-2.5">
                            <img src={backpackIcon} alt="Backpack" className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">
                              Level {item.level} | {item.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <img src={backpackIcon} alt="" className="w-4 h-4" />
                              <p className="text-gray-500">
                                Unlock with {item.amount} Packy
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
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

