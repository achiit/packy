import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import packyIcon from '../assets/packy.png'

interface ClaimPopupProps {
  isOpen: boolean;
  onClose: () => void;
  packies: number;
  nextClaimTime: Date;
}

export function ClaimPopup({ isOpen, onClose, packies, nextClaimTime }: ClaimPopupProps) {
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
                Claimed {packies} Packies!
              </h2>
              <p className="text-gray-500 text-center">
                Next claim available in:
              </p>
              <div className="bg-[#D6F905] rounded-full px-6 py-3 font-medium">
                {formatTimeRemaining(nextClaimTime)}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function formatTimeRemaining(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
} 