import { useTranslation } from 'react-i18next'

import { ProgressDots } from '../components/ProgressDots'
import { ContinueButton } from '../components/ContinueButton'

interface WelcomeProps {
  onContinue: () => void
  onClose: () => void
}

export function Welcome({ onContinue}: WelcomeProps) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-32 h-32 bg-[#c5f467] rounded-full flex items-center justify-center mb-8">
          <span className="text-4xl">HI</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {t('welcome.title', { name: 'Name' })}
        </h2>
        <p className="text-gray-500">{t('welcome.subtitle')}</p>
      </div>
      <div className="p-6">
        <ProgressDots total={5} current={1} />
        <div className="mt-4">
          <ContinueButton onClick={onContinue} />
        </div>
      </div>
    </div>
  )
}

