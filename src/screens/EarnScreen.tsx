import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import giftIcon from '../assets/gift1.png'
import treasureIcon from '../assets/gift2.png'
import packyAvatar from '../assets/packy.png'

export function EarnScreen() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white py-4 px-0 space-y-6">


      {/* Top Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#D6F905] rounded-[20px] p-4 flex flex-col items-center relative aspect-square border-2 border-[#b8cc0c]">
          <div className="flex-1 flex items-center">
            <img src={giftIcon} alt="Gift" className="w-24 h-24" />
          </div>
          <button className="w-[90%] absolute bottom-3 bg-[#E67E22] text-black py-2 px-4 rounded-full font-medium border-2 border-[#c0560e] ">
            {t('earn.claimNow')} 🎁
          </button>
        </div>
        <div className="bg-[#D6F905] rounded-[20px] p-4 flex flex-col items-center relative aspect-square border-2 border-[#b8cc0c]">
          <div className="flex-1 flex items-center">
            <img src={treasureIcon} alt="Treasure" className="w-24 h-24" />
          </div>
          <button className="w-[90%] absolute bottom-3 bg-[#E67E22] text-black py-2 px-4 rounded-full font-medium border-2 border-[#c0560e] ">
            {t('earn.inviteFriends')}
          </button>
        </div>
      </div>

      {/* Complete Now Section */}
      <div>
        <h2 className="text-xl text-gray-500 font-semibold mb-4 px-4">{t('earn.completeNow')}</h2>
        <div className="space-y-3 px-2">
          <button className="w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={packyAvatar} alt="Packy" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{t('earn.followPackyX')}</span>
                <span className="text-sm text-gray-500">{t('earn.points', { amount: 300 })}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={packyAvatar} alt="Packy" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{t('earn.packyCommunity')}</span>
                <span className="text-sm text-gray-500">{t('earn.points', { amount: 1000 })}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={packyAvatar} alt="Packy" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{t('earn.followAdrena')}</span>
                <span className="text-sm text-gray-500">{t('earn.points', { amount: 800 })}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
} 