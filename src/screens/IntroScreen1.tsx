import { useTranslation } from 'react-i18next'
import { ProgressDots } from '../components/ProgressDots'
import { ContinueButton } from '../components/ContinueButton'
import { useTelegram } from '../context/TelegramContext'
import intro1 from '../assets/intro1.png'

interface IntroScreen1Props {
  onContinue: () => void
}

export function IntroScreen1({ onContinue }: IntroScreen1Props) {
  const { t } = useTranslation()
  const { user, isLoading, error } = useTelegram()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-end pb-16">
        <img 
          src={intro1} 
          alt="Welcome"
          className="w-48 h-48 object-contain mb-10"
        />
        <h2 className="text-3xl font-bold mb-3">
          {t('intro1.title')}
        </h2>
        <p className="text-gray-500 text-center text-lg">
          {t('intro1.subtitle')}
        </p>
        
        {/* Display user information */}
        {isLoading && <p>Loading user data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <div className="mt-4 text-center">
            <p>Welcome, {user.first_name}!</p>
            {user.username && <p>@{user.username}</p>}
          </div>
        )}
      </div>
      <div className="p-6">
        <ProgressDots total={5} current={1} />
        <div className="mt-4">
          <ContinueButton onClick={onContinue}>
            {t('continue')}
          </ContinueButton>
        </div>
      </div>
    </div>
  )
}

