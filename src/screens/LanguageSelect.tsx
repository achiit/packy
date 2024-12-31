import { useTranslation } from 'react-i18next'
import { ProgressDots } from '../components/ProgressDots'
import { ContinueButton } from '../components/ContinueButton'
import { Check } from 'lucide-react'

interface LanguageSelectProps {
  onContinue: () => void
  startParam?: string
}

export function LanguageSelect({ onContinue, startParam }: LanguageSelectProps) {
    const { t, i18n } = useTranslation()
    
    const languages = [
      { code: 'en', label: 'English' },
      { code: 'tl-PH', label: 'Tagalog' },
      { code: 'es', label: 'Spanish' },
      { code: 'fr', label: 'French' },
      { code: 'de', label: 'German' },
      { code: 'ja', label: 'Japanese' },
      { code: 'it', label: 'Italian' },
      { code: 'ko', label: 'Korean' },
      { code: 'zh-CN', label: 'Chinese' }
    ]
  
    return (
      <div className="min-h-screen flex flex-col justify-end bg-white px-6">
        <div className="flex-1 flex flex-col justify-end pb-8">
          <h2 className="text-[28px] font-semibold mb-8">{t('selectLanguage')}</h2>
          
          <p className="text-lg text-gray-600 mb-4">
            You were referred by: <strong>{startParam || 'No referral code'}</strong>
          </p>

          <div className="space-y-6 mb-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code)
                }}
                className="w-full flex items-center justify-between"
              >
                <span className="text-[17px]">
                  ({lang.code}) {t(`languages.${lang.code}`)}
                </span>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                               ${i18n.language === lang.code 
                                 ? 'border-[#0066FF] bg-[#0066FF]' 
                                 : 'border-[#0066FF]'}`}
                >
                  {i18n.language === lang.code && (
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <ProgressDots total={5} current={0} />
          <div className="mt-4">
            <ContinueButton onClick={onContinue}>
              {t('continue')}
            </ContinueButton>
          </div>
        </div>
      </div>
    )
  }