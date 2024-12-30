"use client"

import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { Check } from 'lucide-react'
import giftIcon from '../assets/gift1.png'
import treasureIcon from '../assets/gift2.png'
import xLogo from '../assets/x logo.webp'
import telegramLogo from '../assets/telegram1.png'
import { useTelegram } from '../context/TelegramContext'
import { useState, useEffect } from 'react'
import { ClaimPopup } from '../components/claim-popup'

export function EarnScreen() {
  const { t } = useTranslation()
  const { userDataFromDB, updateUserData, setUserDataFromDB } = useTelegram()
  const [isClaimPopupOpen, setIsClaimPopupOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)
  const [nextClaimTime, setNextClaimTime] = useState<Date | null>(null)

  const calculateNextClaimTime = () => {
    if (!userDataFromDB?.lastClaimTime) return null
    const lastClaim = new Date(userDataFromDB.lastClaimTime)
    const cooldown = userDataFromDB.claimCooldown || 180 // default 3hrs
    return new Date(lastClaim.getTime() + cooldown * 60 * 1000)
  }

  const updateTimeRemaining = () => {
    const next = calculateNextClaimTime()
    if (!next) return

    const now = new Date()
    if (now >= next) {
      setTimeRemaining(null)
      return
    }

    const diff = next.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
  }

  useEffect(() => {
    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 1000) // Update every second
    return () => clearInterval(interval)
  }, [userDataFromDB?.lastClaimTime])

  const handleClaim = async () => {
    if (!userDataFromDB) return

    const now = new Date()
    const next = calculateNextClaimTime()
    if (next && now < next) return // Still in cooldown

    const claimCount = (userDataFromDB.claimCount || 0) + 1
    const cooldown = 180 * Math.pow(2, claimCount - 1) // 3hrs * 2^(n-1)
    
    const updates = {
      packies: (userDataFromDB.packies || 0) + 500,
      lastClaimTime: now.toISOString(),
      claimCooldown: cooldown,
      claimCount: claimCount
    }

    await updateUserData(updates)
    
    if (userDataFromDB) {
      const updatedData = {
        ...userDataFromDB,
        ...updates
      }
      setUserDataFromDB(updatedData)
    }

    setNextClaimTime(new Date(now.getTime() + cooldown * 60 * 1000))
    setIsClaimPopupOpen(true)
  }

  const handleSocialClick = async (platform: 'twitter' | 'telegram') => {
    const urls = {
      twitter: 'https://x.com/packy_xyz?s=21',
      telegram: 'https://t.me/PackyPlay'
    }

    const updates: any = {
      packies: (userDataFromDB?.packies || 0) + (platform === 'twitter' ? 500 : 1000)
    }

    if (platform === 'twitter') {
      updates.twitterCompleted = true
    } else {
      updates.telegramCompleted = true
    }

    await updateUserData(updates)
    if (userDataFromDB) {
      setUserDataFromDB({ ...userDataFromDB, ...updates })
    }

    // Use Telegram WebApp to open URL
    try {
      // @ts-ignore
      window.Telegram.WebApp.openLink(urls[platform])
    } catch (error) {
      window.open(urls[platform], '_blank')
    }
  }

  const isTwitterCompleted = userDataFromDB?.twitterCompleted
  const isTelegramCompleted = userDataFromDB?.telegramCompleted

  return (
    <div className="min-h-screen bg-white py-4 px-0 space-y-6">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-2 gap-4 ">
        <div className="bg-[#D6F905] rounded-[20px]  flex flex-col items-center relative aspect-square border-2 border-[#b8cc0c]">
          <div className="flex-1 flex items-center justify-center mb-1">
            <img src={giftIcon} alt="Gift" className="w-24 h-24" />
          </div>
          <button 
            onClick={handleClaim}
            disabled={!!timeRemaining}
            className={`w-[90%] absolute bottom-2 bg-[#E67E22] text-black py-2 px-4 
              rounded-full font-medium border-2 border-[#c0560e]
              ${timeRemaining ? 'opacity-50' : ''}`}
          >
            {timeRemaining ? timeRemaining : t('earn.claimNow')}
          </button>
        </div>
        <div className="bg-[#D6F905] rounded-[20px] p-4 flex flex-col items-center relative aspect-square border-2 border-[#b8cc0c]">
          <div className="flex-1 flex items-center justify-center mb-1">
            <img src={treasureIcon} alt="Treasure" className="w-24 h-24" />
          </div>
          <button className="w-[90%] absolute bottom-2 bg-[#E67E22] text-black py-2 px-4 rounded-full font-medium border-2 border-[#c0560e]">
            {t('earn.inviteFriends')}
          </button>
        </div>
      </div>

      {/* Complete Now Section */}
      <div>
        <h2 className="text-xl text-gray-500 font-semibold mb-4 px-4">{t('earn.completeNow')}</h2>
        <div className="space-y-3 px-2">
          <button 
            onClick={() => !isTwitterCompleted && handleSocialClick('twitter')}
            disabled={isTwitterCompleted}
            className={`w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between
              ${isTwitterCompleted ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <img src={xLogo} alt="X" className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{t('earn.followPackyX')}</span>
                <span className="text-sm text-gray-500">{t('earn.points', { amount: 500 })}</span>
              </div>
            </div>
            {isTwitterCompleted ? (
              <div className="bg-[#D6F905] rounded-full p-2">
                <Check className="w-5 h-5" />
              </div>
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <button 
            onClick={() => !isTelegramCompleted && handleSocialClick('telegram')}
            disabled={isTelegramCompleted}
            className={`w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between
              ${isTelegramCompleted ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#229ED9] flex items-center justify-center">
                <img src={telegramLogo} alt="Telegram" className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{t('earn.packyCommunity')}</span>
                <span className="text-sm text-gray-500">{t('earn.points', { amount: 1000 })}</span>
              </div>
            </div>
            {isTelegramCompleted ? (
              <div className="bg-[#D6F905] rounded-full p-2">
                <Check className="w-5 h-5" />
              </div>
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <ClaimPopup 
        isOpen={isClaimPopupOpen}
        onClose={() => setIsClaimPopupOpen(false)}
        packies={500}
        nextClaimTime={nextClaimTime!}
      />
    </div>
  )
}

