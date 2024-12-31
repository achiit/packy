import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useTelegramData from './hooks/useTelegramData'

import { IntroScreen1 } from './screens/IntroScreen1'
import { IntroScreen2 } from './screens/IntroScreen2'
import { IntroScreen3 } from './screens/IntroScreen3'
import { IntroScreen4 } from './screens/IntroScreen4'
import { SwipeableViews } from './components/SwipeableView'
import { MainLayout } from './components/layout/MainLayout'
import { HomePage } from './screens/Home'
import { ComingSoon } from './components/ComingSoon'
import './i18n/config'
import { GamePage } from './screens/GameScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { EarnScreen } from './screens/EarnScreen'
import { LanguageSelect } from './screens/LanguageSelect'


export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [showMainApp, setShowMainApp] = useState(false)
  const telegramData = useTelegramData()

  const handleContinue = () => {
    if (currentScreen === 4) {
      setShowMainApp(true)
    } else {
      setCurrentScreen((prev) => prev + 1)
    }
  }

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined') {
      const WebApp = window.Telegram?.WebApp
      if (WebApp) {
        WebApp.ready()
        console.log('Telegram WebApp initialized:', WebApp.initDataUnsafe)
      }
    }
  }, [])

  if (showMainApp) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/booking" element={
            <MainLayout>
              <ComingSoon />
            </MainLayout>
          } />
          <Route path="/game" element={
            <MainLayout>
              <GamePage />
            </MainLayout>
          } />
          <Route path="/earn" element={
            <MainLayout>
              <EarnScreen />
            </MainLayout>
          } />
          <Route path="/profile" element={
            <MainLayout>
              <ProfileScreen />
            </MainLayout>
          } />
          <Route path="/language" element={
            <LanguageSelect onContinue={handleContinue} startParam={telegramData?.referred_by?.toString() || ''} />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const screens = [
    <LanguageSelect key="language" onContinue={handleContinue} startParam={telegramData?.referred_by?.toString() || ''} />,
    <IntroScreen1 key="intro1" onContinue={handleContinue} />,
    <IntroScreen2 key="intro2" onContinue={handleContinue} />,
    <IntroScreen3 key="intro3" onContinue={handleContinue} />,
    <IntroScreen4 key="intro4" onContinue={handleContinue} />,
  ]

  return (
    <div className="h-screen">
      <SwipeableViews
        index={currentScreen}
        onChangeIndex={setCurrentScreen}
      >
        {screens}
      </SwipeableViews>
    </div>
  )
}