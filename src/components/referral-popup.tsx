import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import packyIcon from '../assets/packy.png'
import { useTranslation } from 'react-i18next'

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

  const handleCopy = async () => {
    try {
      // @ts-ignore
      await window.Telegram.WebApp.clipboard.writeText(`https://t.me/PackyBot?start=${referralCode}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
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
                    https://t.me/PackyBot?start={referralCode}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-[#D6F905]"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
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
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 