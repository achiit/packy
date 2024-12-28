import { createContext, useContext, useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  // Add other properties as needed
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // @ts-ignore - Since Telegram.WebApp might not be recognized by TypeScript
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      
      const userData = telegram.initDataUnsafe?.user || null;
      setUser(userData);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize Telegram Web App');
      setIsLoading(false);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading, error }}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
} 