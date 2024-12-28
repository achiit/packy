import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config'
import { TelegramProvider } from './context/TelegramContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </React.StrictMode>,
)

