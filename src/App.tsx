import { useState } from 'react'
import { LanguageSelect } from './screens/LanguageSelect'
import { IntroScreen1 } from './screens/IntroScreen1'
import { IntroScreen2 } from './screens/IntroScreen2'
import { IntroScreen3 } from './screens/IntroScreen3'
import { IntroScreen4 } from './screens/IntroScreen4'
import { SwipeableViews } from './components/SwipeableView'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const handleContinue = () => {
    setCurrentScreen((prev) => prev + 1)
  }

  const screens = [
    <LanguageSelect key="language" onContinue={handleContinue} />,
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

