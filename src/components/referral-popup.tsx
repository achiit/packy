import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Share } from 'lucide-react'
import { useState } from 'react'
import packyIcon from '../assets/packy.png'
import { useTranslation } from 'react-i18next'
import { Toast } from './ui/toast'

interface ReferralPopupProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
  referralCount: number;
  rewardsEarned: number;
}

export function ReferralPopup({ isOpen, onClose, referralCode, referralCount, rewardsEarned }: ReferralPopupProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Use the correct URL format for the mini app
  const INVITE_URL = "https://t.me/athpacky_bot/app"
  const inviteLink = `${INVITE_URL}?startapp=${referralCode}`
  const shareText = "Join me on Packy and earn rewards together! 🎮"

  const handleCopy = async () => {
    console.log('Copy button clicked')
    try {
      // @ts-ignore
      const tg = window.Telegram.WebApp
      console.log('Attempting to copy link:', inviteLink)

      try {
        await tg.clipboard.writeText(inviteLink)
        console.log('Successfully copied using Telegram clipboard API')
      } catch (e) {
        console.log('Fallback to navigator clipboard')
        await navigator.clipboard.writeText(inviteLink)
      }

      setCopied(true)
      setShowToast(true)
      setTimeout(() => {
        setCopied(false)
        setShowToast(false)
      }, 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const handleShare = () => {
    console.log('Share button clicked')
    try {
      // @ts-ignore
      const tg = window.Telegram.WebApp
      
      // Create the full sharing URL with text
      const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
      
      console.log('Opening share URL:', fullUrl)
      tg.openLink(fullUrl)
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 z-50"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center gap-4">
                <img src={packyIcon} alt="Packy" className="w-20 h-20" />
                <h2 className="text-2xl font-bold text-center">
                  {t('referral.invite')}
                </h2>
                
                <div className="w-full p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm bg-white px-3 py-2 rounded flex-1 overflow-hidden">
                      {inviteLink}
                    </code>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-[#D6F905] relative"
                        disabled={copied}
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-lg bg-[#D6F905]"
                      >
                        <Share className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{t('referral.totalInvites')}</span>
                    <span className="font-medium">{referralCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{t('referral.packiesEarned')}</span>
                    <span className="font-medium">{rewardsEarned}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{t('referral.perReferral')}</span>
                    <span className="font-medium">500 {t('game.packies')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Toast message={t('referral.copied')} isVisible={showToast} />
    </>
  )
} 