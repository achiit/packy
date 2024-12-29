"use client"

import { X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import intro4 from '../assets/packy.png'
import curveShape from '../assets/leaderboard.png'
import crownIcon from '../assets/crown.png'
import { useLeaderboard } from '../hooks/useLeaderboard'

interface LeaderboardSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function LeaderboardSheet({ isOpen, onClose }: LeaderboardSheetProps) {
  const { leaderboardData, isLoading } = useLeaderboard();

  // Format user display name
  const formatDisplayName = (user: typeof leaderboardData[0]) => {
    if (user.username) return user.username;
    return user.first_name ? 
      `${user.first_name} ${user.last_name || ''}`.trim() : 
      'Anonymous User';
  };

  // Format score
  const formatScore = (packies: number) => {
    if (packies >= 1000000) return `${(packies / 1000000).toFixed(2)}M`;
    if (packies >= 1000) return `${(packies / 1000).toFixed(1)}K`;
    return packies.toString();
  };

  // Get top 3 players and rest of the list
  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

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
            animate={{ y: "1%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[32px] z-50"
            style={{ touchAction: 'none' }}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Rest of the layout structure remains the same */}
            <div className="relative h-[270px]">
              <img src={curveShape} alt="" className="absolute top-32 left-0 right-0 w-[calc(100%-30px)] h-[200px] mx-4 object-contain" />
              <div className="absolute left-8 top-6">
                <img src={crownIcon} alt="Crown" className="w-8 h-8" />
              </div>
              <button onClick={onClose} className="absolute right-8 top-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center z-50">
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Top 3 players layout */}
              {!isLoading && topThree.length > 0 && (
                <div className="absolute inset-x-0 top-6 pt-32">
                  <div className="relative px-8 flex justify-between items-end">
                    {/* Second Place - Left */}
                    {topThree[1] && (
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                          <img src={intro4} alt={formatDisplayName(topThree[1])} className="w-8 h-8" />
                        </div>
                        <p className="mt-0 text-sm font-medium">{formatDisplayName(topThree[1])}</p>
                        <p className="text-xs text-gray-500">{formatScore(topThree[1].packies)}</p>
                      </div>
                    )}

                    {/* First Place - Center */}
                    {topThree[0] && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex flex-col items-center">
                        <div className="relative">
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">👑</span>
                          <div className="w-16 h-16 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                            <img src={intro4} alt={formatDisplayName(topThree[0])} className="w-10 h-10" />
                          </div>
                        </div>
                        <p className="mt-0 text-sm font-medium">{formatDisplayName(topThree[0])}</p>
                        <p className="text-xs text-gray-500">{formatScore(topThree[0].packies)}</p>
                      </div>
                    )}

                    {/* Third Place - Right */}
                    {topThree[2] && (
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                          <img src={intro4} alt={formatDisplayName(topThree[2])} className="w-8 h-8" />
                        </div>
                        <p className="mt-0 text-sm font-medium">{formatDisplayName(topThree[2])}</p>
                        <p className="text-xs text-gray-500">{formatScore(topThree[2].packies)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable container */}
            <div 
              className="absolute inset-x-0 bottom-0 top-[270px] bg-white"
              style={{ touchAction: 'pan-y' }}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="h-full overflow-y-auto px-4 overscroll-contain">
                <div className="space-y-3 pt-4 pb-8">
                  {!isLoading && restOfList.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#f3ff9f] p-2 flex items-center justify-center">
                          <img src={intro4} alt={formatDisplayName(player)} className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{formatDisplayName(player)}</div>
                          <div className="text-xs text-gray-500">{formatScore(player.packies)}</div>
                        </div>
                      </div>
                      <span className="text-gray-400 font-medium">{index + 4}</span>
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

