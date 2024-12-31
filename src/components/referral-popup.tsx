import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Share } from 'lucide-react'
import { useState } from 'react'
import packyIcon from '../assets/packy.png'
import { useTranslation } from 'react-i18next'
import { Toast } from './ui/toast'

interface ReferralPopupProps {
  isOpen: boolean
  onClose: () => void
  referralCode: string
  referralCount: number
  rewardsEarned: number
}

export function ReferralPopup({
  isOpen,
  onClose,
  referralCode,
  referralCount,
  rewardsEarned
}: ReferralPopupProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Because you used /setdomain with "packy", use that path:
  // So the official deep-link is "https://t.me/athpacky_bot/packy?startapp=..."
  const referralLink = `https://t.me/athpacky_bot/packy?startapp=${referralCode}`

  const handleCopy = async () => {
    console.log('Copy button clicked')
    try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp
      console.log('Telegram WebApp object:', tg)
      console.log('Attempting to copy link:', referralLink)

      // Try Telegram's clipboard API first
      try {
        await tg.clipboard.writeText(referralLink)
        console.log('Successfully copied using Telegram clipboard API')
      } catch (e) {
        console.log('Telegram clipboard failed, trying navigator clipboard:', e)
        // Fallback to regular clipboard API
        await navigator.clipboard.writeText(referralLink)
        console.log('Successfully copied using navigator clipboard')
      }

      setCopied(true)
      setShowToast(true)
      setTimeout(() => {
        setCopied(false)
        setShowToast(false)
      }, 2000)
    } catch (error) {
      console.error('Copy failed with error:', error)
    }
  }

  const handleShare = () => {
    try {
      // @ts-ignore
      const WebApp = window.Telegram?.WebApp
      if (WebApp) {
        const shareText = `Join me on Packy!`
        WebApp.shareUrl(referralLink, shareText)
      } else {
        // Fallback for testing
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me on Packy!')}`
        window.open(fullUrl, '_blank')
      }
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
                      {referralLink}
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
