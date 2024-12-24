"use client"

import { X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import intro4 from '../assets/packy.png'
import curveShape from '../assets/leaderboard.png'

interface Player {
  name: string
  score: string
  avatar: string
  rank?: number
}

interface LeaderboardSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function LeaderboardSheet({ isOpen, onClose }: LeaderboardSheetProps) {
  const players: Player[] = [
    { name: "Freddie Miner", score: "20.01M", avatar: intro4 },
    { name: "Nilson", score: "18.05M", avatar: intro4 },
    { name: "Alex mystry", score: "12.01M", avatar: intro4 },
    { name: "Sara Lee", score: "10.05M", avatar: intro4 },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "2%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[32px] z-50"
            style={{ touchAction: 'none' }}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Top curved section */}
            <div className="relative h-[270px]">
              {/* Background curve image */}
              <img 
                src={curveShape} 
                alt=""
                className="absolute top-32 left-0 right-0 w-[calc(100%-30px)] h-[200px] mx-4 object-contain"
                style={{
                  objectPosition: 'center top'
                }}
              />

              {/* Crown icon */}
              <div className="absolute left-8 top-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 7.5L5.5 16.5H18.5L21.5 7.5L16.5 10.5L12 4.5L7.5 10.5L2.5 7.5Z" 
                    stroke="#4B7BF7" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Close button */}
              <button 
                onClick={onClose} 
                className="absolute right-8 top-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center z-50"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Top 3 players layout */}
              <div className="absolute inset-x-0 top-6 pt-32">
                <div className="relative px-8 flex justify-between items-end">
                  {/* Second Place - Left */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                      <img src={players[1].avatar} alt={players[1].name} className="w-8 h-8" />
                    </div>
                    <p className="mt-0 text-sm font-medium">{players[1].name.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500">{players[1].score}</p>
                  </div>

                  {/* First Place - Center */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex flex-col items-center">
                    <div className="relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">👑</span>
                      <div className="w-16 h-16 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                        <img src={players[0].avatar} alt={players[0].name} className="w-10 h-10" />
                      </div>
                    </div>
                    <p className="mt-0 text-sm font-medium">{players[0].name}</p>
                    <p className="text-xs text-gray-500">{players[0].score}</p>
                  </div>

                  {/* Third Place - Right */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                      <img src={players[2].avatar} alt={players[2].name} className="w-8 h-8" />
                    </div>
                    <p className="mt-0 text-sm font-medium">{players[2].name.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500">{players[2].score}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable container */}
            <div 
              className="absolute inset-x-0 bottom-0 top-[270px] bg-white"
              style={{ touchAction: 'pan-y' }}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="h-full overflow-y-auto px-4 overscroll-contain">
                <div className="space-y-3 pt-4 pb-8">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white rounded-2xl p-4
                        border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                          <img src={player.avatar} alt={player.name} className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.score}</div>
                        </div>
                      </div>
                      <span className="text-gray-400 font-medium">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

