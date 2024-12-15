import { useLocation } from 'react-router-dom'
import { BottomNav } from '../navigation/BottomNav'
import { useTranslation } from 'react-i18next'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { t } = useTranslation()
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold">{t('header.title')}</h1>
        <div className="flex gap-2">
          <img src="/src/assets/wallet.png" alt="wallet" className="w-6 h-6" />
          <img src="/src/assets/intro4.png" alt="notifications" className="w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-2 pb-20">
        {children}
      </main>

      {/* Navigation Bar */}
      <BottomNav currentPath={location.pathname} />
    </div>
  )
}