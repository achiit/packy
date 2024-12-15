import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import intro4 from '../assets/packy.png'
import flash from '../assets/flash.png'

export function GamePage() {
  const { t } = useTranslation()
  const [packies, setPackies] = useState(0)
  const [lightning, setLightning] = useState(0)
  const [isPressed, setIsPressed] = useState(false)

  const handleTap = useCallback(() => {
    setLightning(prev => {
      if (prev + 1 >= 100) {
        setPackies(p => p + 1)
        return 0
      }
      return prev + 1
    })
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 100)
  }, [])

  return (
    <div className="h-[calc(98vh-150px)] flex flex-col bg-white px-4 overflow-hidden">
      {/* Header - Fixed height */}
      <div className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#F6F6F6] rounded-full px-4 py-2">
          <img src={intro4} alt="Packy" className="w-6 h-6" />
          <span className="font-medium text-black text-xs">{packies} {t('game.packies')}</span>
        </div>

        <button className="flex items-center gap-2 bg-[#F6F6F6] rounded-full px-4 py-2">
          <img src={intro4} alt="Packy" className="w-6 h-6" />
          <span className="text-gray-600 text-xs">{t('game.title')}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Main Game Area - Fixed height */}
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

      {/* Footer - Fixed height */}
      <div className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={flash} alt="Lightning" className="w-6 h-6" />
          <span className="text-[#9FE870] font-medium text-xs">{lightning}/100 {t('game.lightning')}</span>
        </div>

        <button className="flex items-center gap-2 bg-[#F6F6F6] rounded-full px-4 py-2">
          <img src={intro4} alt="Packy" className="w-6 h-6" />
          <span className="text-gray-600 text-xs">{t('game.leaderboard')}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}