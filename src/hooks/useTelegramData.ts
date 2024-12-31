import { useState, useEffect } from "react"

interface TelegramUser {
  referred_by: number | null
  username: string
  first_name: string
  telegram_id: number
}

const useTelegramData = () => {
  const [telegramData, setTelegramData] = useState<TelegramUser | null>(null)
  
  const fetchTelegramData = () => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const WebApp = window.Telegram?.WebApp
      if (WebApp?.initDataUnsafe?.user) {
        const user = {
          referred_by: WebApp.initDataUnsafe.start_param ? Number(WebApp.initDataUnsafe.start_param) : null,
          username: WebApp.initDataUnsafe.user.username || "",
          first_name: WebApp.initDataUnsafe.user.first_name || "",
          telegram_id: WebApp.initDataUnsafe.user.id,
        }
        console.log('Telegram user data:', user)
        setTelegramData(user)
      }
    }
  }

  useEffect(() => {
    fetchTelegramData()
  }, [])

  return telegramData
}

export default useTelegramData 