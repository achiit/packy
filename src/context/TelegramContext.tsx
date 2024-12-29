import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';

interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface UserDataFromDB extends TelegramUser {
  createdAt: string;
  lastLogin: string;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  userDataFromDB: UserDataFromDB | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userDataFromDB, setUserDataFromDB] = useState<UserDataFromDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const saveUserToFirestore = async (userData: TelegramUser) => {
    try {
      const userRef = doc(db, 'users', userData.id.toString());
      
      // First check if the document exists
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        // If document doesn't exist, create it
        const newUserData: UserDataFromDB = {
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        await setDoc(userRef, newUserData);
      } else {
        // If document exists, just update the lastLogin
        const updatedData = {
          ...userData,
          lastLogin: new Date().toISOString(),
        };
        await setDoc(userRef, updatedData, { merge: true });
      }

      // Fetch the latest data
      const updatedDocSnap = await getDoc(userRef);
      const data = updatedDocSnap.data() as UserDataFromDB;
      setUserDataFromDB(data);
    } catch (err) {
      console.error('Error saving user to Firestore:', err);
      setError('Failed to save user data');
    }
  };

  useEffect(() => {
    try {
      // @ts-ignore - Since Telegram.WebApp might not be recognized by TypeScript
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      
      const userData = telegram.initDataUnsafe?.user || null;
      setUser(userData);

      if (userData) {
        saveUserToFirestore(userData);
      }

      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize Telegram Web App');
      setIsLoading(false);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading, error, userDataFromDB }}>
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