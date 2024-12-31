import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeReferralCode, handleReferral } from '../utils/referral';

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
  twitterCompleted?: boolean;
  telegramCompleted?: boolean;
  lastClaimTime?: string;
  claimCooldown?: number;
  claimCount?: number;
  // Add referral fields
  referralCode?: string;
  referredBy?: string;
  referralCount?: number;
  referralRewardsEarned?: number;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  userDataFromDB: UserDataFromDB | null;
  updatePackies: (newCount: number) => Promise<void>;
  updateUserData: (updates: any) => Promise<void>;
  setUserDataFromDB: React.Dispatch<React.SetStateAction<UserDataFromDB | null>>;
}

export const TelegramContext = createContext<any>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userDataFromDB, setUserDataFromDB] = useState<UserDataFromDB | null>(null);
  const [isLoading] = useState(true);
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
      const userRef = doc(db, 'users', userData.id.toString())
      const docSnap = await getDoc(userRef)
      
      if (!docSnap.exists()) {
        // New user
        const newUserData: UserDataFromDB = {
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          packies: 0,
        }
        await setDoc(userRef, newUserData)
        
        // Initialize referral code for new user
        const referralCode = await initializeReferralCode(userData.id.toString())
        newUserData.referralCode = referralCode
        
        setUserDataFromDB(newUserData)
      } else {
        // Existing user
        const existingData = docSnap.data() as UserDataFromDB
        const updatedData = {
          ...existingData,
          ...userData,
          lastLogin: new Date().toISOString(),
        }

        // Check if user doesn't have a referral code yet
        if (!existingData.referralCode) {
          const referralCode = await initializeReferralCode(userData.id.toString())
          updatedData.referralCode = referralCode
        }

        await setDoc(userRef, updatedData, { merge: true })
        setUserDataFromDB(updatedData)
      }
    } catch (err) {
      console.error('Error saving user to Firestore:', err)
      setError('Failed to save user data')
    }
  }

  const updateUserData = async (updates: any) => {
    if (!user?.id) return
    await updateDoc(doc(db, 'users', user.id.toString()), updates)
  }

  useEffect(() => {
    const initApp = async () => {
      try {
        // @ts-ignore
        const tg = window.Telegram.WebApp

        // Get the start parameter from the URL
        const urlParams = new URLSearchParams(window.location.search)
        const startParam = urlParams.get('startapp')

        if (tg.initDataUnsafe.user && startParam) {
          console.log('Referral detected:', startParam)
          // Handle the referral
          await handleReferral(tg.initDataUnsafe.user.id.toString(), startParam)
        }

        if (tg.initDataUnsafe.user) {
          const userData = {
            id: tg.initDataUnsafe.user.id,
            first_name: tg.initDataUnsafe.user.first_name,
            last_name: tg.initDataUnsafe.user.last_name,
            username: tg.initDataUnsafe.user.username,
            language_code: tg.initDataUnsafe.user.language_code,
          }
          await saveUserToFirestore(userData)
          setUser(userData)
        }
      } catch (err) {
        console.error('Error initializing app:', err)
        setError('Failed to initialize app')
      }
    }

    initApp()
  }, [])

  return (
    <TelegramContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      userDataFromDB, 
      updatePackies, 
      updateUserData,
      setUserDataFromDB 
    }}>
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