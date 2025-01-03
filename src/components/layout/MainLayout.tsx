import { useLocation } from 'react-router-dom'
import { BottomNav } from '../navigation/BottomNav'
import { useTranslation } from 'react-i18next'
// import intro4 from '../../assets/intro4.png'
// import wallet from '../../assets/wallet.png'

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
          {/* Wallet Button */}
          {/* <button className="p-2">
            <img  src={wallet}  alt="wallet" className="w-8 h-8" />
          </button> */}

          {/* Notifications Button with Circular Box */}
          {/* <button className="p-2 rounded-full bg-[#EFEEE9] flex justify-center items-center">
            <img src={intro4} alt="notifications" className="w-6 h-6" />
          </button> */}
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
