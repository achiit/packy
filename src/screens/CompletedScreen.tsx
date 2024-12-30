"use client"

import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import intro4 from '../assets/packy.png'
import { useTelegram } from '../context/TelegramContext'

export function CompletedScreen() {
  const { t } = useTranslation()
  const { userDataFromDB } = useTelegram()

  return (
    <div className="h-[calc(98vh-150px)] flex flex-col bg-white px-0 overflow-hidden relative">
      {/* Header */}
      <div className="h-[60px] flex items-center justify-between">
        <motion.div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px]">
            <img src={intro4} alt="Packy" className="w-6 h-6" />
            <span className="font-medium text-black text-xs">
              {userDataFromDB?.packies || 0} {t('game.packies')}
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border border-gray-200 rounded-[15px]">
          <span className="text-xs">{t('completed.title')}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Completed Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        {userDataFromDB?.completedItems?.map((item: any, index: number) => (
          <div 
            key={index}
            className="mb-4 p-4 bg-[#F6F6F6] rounded-[15px] border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={intro4} alt="Item" className="w-8 h-8" />
                <div>
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9FE870] text-xs font-medium">
                  {item.reward} {t('game.packies')}
                </span>
                <div className="bg-[#9FE870] p-1 rounded-full">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 