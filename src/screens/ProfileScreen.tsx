import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import profilePic from '../assets/intro1.png'
import languageIcon from '../assets/language.png'
import rewardIcon from '../assets/cup.png'
import inviteIcon from '../assets/inviteearn.png'
import telegramIcon from '../assets/telegram.png'
import supportIcon from '../assets/support.png'
import tonIcon from '../assets/ton.png'

export function ProfileScreen() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white py-0 space-y-3">
      {/* Profile Section - Original padding preserved */}
      <div className="px-0">
        <div className="bg-[#D6F905] border-2 border-[#b8cc0c] rounded-[15px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
              <span className="absolute -top-1 -right-1 text-lg">👑</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium">{t('profile.title')}</span>
              <span className="text-sm text-gray-600">{t('profile.goToProfile')}</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Main Options - Reduced padding */}
      <div className="space-y-2 px-2">
        <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 active:bg-gray-100">
          <div className="flex items-center gap-3">
            <img src={languageIcon} alt="Language" className="w-8 h-8" />
            <span className="text-base">{t('profile.selectLanguage')}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 active:bg-gray-100">

          <div className="flex items-center gap-3">
            <img src={rewardIcon} alt="Reward" className="w-8 h-8 " />
            <span className="text-base">{t('profile.claimReward')}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Additional Items Section - Reduced padding */}
      <div className="px-2">
        <h2 className="text-gray-500 text-sm px-0 mb-2">{t('profile.additionalItems')}</h2>
        <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 active:bg-gray-100">

          <div className="flex items-center gap-3">
            <img src={inviteIcon} alt="Invite" className="w-7 h-7 opacity-40" />
            <span className="text-base">{t('profile.inviteEarn')}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Help & Support Section - Reduced padding */}
      <div className="px-2">
        <h2 className="text-gray-500 text-sm px-0 mb-2">{t('profile.helpSupport')}</h2>
        <div className="space-y-2">
        <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 active:bg-gray-100">

            <div className="flex items-center gap-3">
              <img src={telegramIcon} alt="Telegram" className="w-7 h-7 opacity-40" />
              <span className="text-base">{t('profile.telegramChannel')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 active:bg-gray-100">

            <div className="flex items-center gap-3">
              <img src={supportIcon} alt="Support" className="w-9 h-9 " />
              <span className="text-base">{t('profile.support')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Footer - Adjusted padding to match */}
      <div className="flex items-center justify-between px-0 pt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{t('profile.madeWith')}</span>
          <img src={tonIcon} alt="TON" className="w-6 h-6 " />
          <span className="text-sm text-gray-500">on TON</span>
        </div>
        <span className="text-sm text-gray-500">{t('profile.version')}</span>
      </div>
    </div>
  )
} 