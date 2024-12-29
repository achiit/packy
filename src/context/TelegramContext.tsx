import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface UserDataFromDB extends TelegramUser {
  createdAt: string;
  lastLogin: string;
  packies: number;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  userDataFromDB: UserDataFromDB | null;
  updatePackies: (newCount: number) => Promise<void>;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userDataFromDB, setUserDataFromDB] = useState<UserDataFromDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updatePackies = async (newCount: number) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.id.toString());
      await setDoc(userRef, {
        packies: newCount,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });

      setUserDataFromDB(prev => prev ? { ...prev, packies: newCount } : null);
    } catch (err) {
      console.error('Error updating packies:', err);
      setError('Failed to update packies');
    }
  };

  const saveUserToFirestore = async (userData: TelegramUser) => {
    try {
      const userRef = doc(db, 'users', userData.id.toString());
      
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        const newUserData: UserDataFromDB = {
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          packies: 0, // Initialize packies count
        };
        await setDoc(userRef, newUserData);
        setUserDataFromDB(newUserData);
      } else {
        const existingData = docSnap.data() as UserDataFromDB;
        const updatedData = {
          ...existingData,
          ...userData,
          lastLogin: new Date().toISOString(),
        };
        await setDoc(userRef, updatedData, { merge: true });
        setUserDataFromDB(updatedData);
      }
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
    <TelegramContext.Provider value={{ user, isLoading, error, userDataFromDB, updatePackies }}>
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