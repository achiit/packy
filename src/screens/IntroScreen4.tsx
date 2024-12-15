import { useTranslation } from 'react-i18next'
import { ProgressDots } from '../components/ProgressDots'
import { ContinueButton } from '../components/ContinueButton'
import intro4 from '../assets/intro4.png'

interface IntroScreen4Props {
  onContinue: () => void
}

export function IntroScreen4({ onContinue }: IntroScreen4Props) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-end pb-16">
        <img 
          src={intro4} 
          alt="Welcome"
          className="w-48 h-48 object-contain mb-10" // Adjusted image size
        />
        <h2 className="text-2xl font-bold mb-2">
          {t('intro4.title')}
        </h2>
        <p className="text-gray-500 text-center">
          {t('intro4.subtitle')}
        </p>
      </div>
      <div className="p-6">
        <ProgressDots total={5} current={4} />
        <div className="mt-4">
          <ContinueButton onClick={onContinue}>
            {t('continue')}
          </ContinueButton>
        </div>
      </div>
    </div>
  )
}
