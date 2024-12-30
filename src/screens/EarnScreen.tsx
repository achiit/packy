"use client"

import { useTranslation } from 'react-i18next'
import { ChevronRight, Check, Twitter, MessageCircle } from 'lucide-react'

import giftIcon from '../assets/gift1.png'
import treasureIcon from '../assets/gift2.png'

import { useTelegram } from '../context/TelegramContext'

export function EarnScreen() {
  const { t } = useTranslation()
  const { userDataFromDB, updateUserData, setUserDataFromDB } = useTelegram()

  const handleSocialClick = async (platform: 'twitter' | 'telegram') => {
    // URLs for social platforms
    const urls = {
      twitter: 'https://x.com/packy_xyz?s=21',
      telegram: 'https://t.me/PackyPlay'
    }

    // First mark as completed and update packies
    const updates: any = {
      packies: (userDataFromDB?.packies || 0) + (platform === 'twitter' ? 500 : 1000)
    }

    if (platform === 'twitter') {
      updates.twitterCompleted = true
    } else {
      updates.telegramCompleted = true
    }

    // Update Firestore and local state
    await updateUserData(updates)
    
    // Update local state immediately
    if (userDataFromDB) {
      const updatedData = {
        ...userDataFromDB,
        ...updates
      }
      // @ts-ignore - Context will handle the type
      setUserDataFromDB(updatedData)
    }

    // Then open URL in new tab
    window.open(urls[platform], '_blank')
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
          <button className="w-[90%] absolute bottom-2 bg-[#E67E22] text-black py-2 px-4 rounded-full font-medium border-2 border-[#c0560e]">
            {t('earn.claimNow')}
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
                <Twitter className="w-6 h-6 text-white" />
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
                <MessageCircle className="w-6 h-6 text-white" />
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
    </div>
  )
}

