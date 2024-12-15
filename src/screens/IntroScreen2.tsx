import { useTranslation } from 'react-i18next'
import { ProgressDots } from '../components/ProgressDots'
import { ContinueButton } from '../components/ContinueButton'
import intro2 from '../assets/intro2.png'

interface IntroScreen2Props {
  onContinue: () => void
}

export function IntroScreen2({ onContinue }: IntroScreen2Props) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-end pb-16">
      <img 
          src={intro2} 
          alt="Welcome"
          className="w-48 h-48 object-contain mb-10"
        />
        <h2 className="text-2xl font-bold mb-2">
          {t('intro2.title')}
        </h2>
        <p className="text-gray-500 text-center">
          {t('intro2.subtitle')}
        </p>
      </div>
      <div className="p-6">
      <ProgressDots total={5} current={2} />
          <div className="mt-4">
            <ContinueButton onClick={onContinue}>
              {t('continue')} {/* Make sure this translation key exists in your i18n config */}
            </ContinueButton>
          </div>
      </div>
    </div>
  )
}

