// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { db } from '../config/firebase';
// import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// import { initializeReferralCode, handleReferral } from '../utils/referral';

// interface TelegramUser {
//   id: number;
//   username?: string;
//   first_name?: string;
//   last_name?: string;
// }

// interface UserDataFromDB extends TelegramUser {
//   createdAt: string;
//   lastLogin: string;
//   packies: number;
//   twitterCompleted?: boolean;
//   telegramCompleted?: boolean;
//   lastClaimTime?: string;
//   claimCooldown?: number;
//   claimCount?: number;
//   // Add referral fields
//   referralCode?: string;
//   referredBy?: string;
//   referralCount?: number;
//   referralRewardsEarned?: number;
// }

// // interface TelegramContextType {
// //   user: TelegramUser | null;
// //   isLoading: boolean;
// //   error: string | null;
// //   userDataFromDB: UserDataFromDB | null;
// //   updatePackies: (newCount: number) => Promise<void>;
// //   updateUserData: (updates: any) => Promise<void>;
// //   setUserDataFromDB: React.Dispatch<React.SetStateAction<UserDataFromDB | null>>;
// // }

// export const TelegramContext = createContext<any>(null);

// export function TelegramProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<TelegramUser | null>(null);
//   const [userDataFromDB, setUserDataFromDB] = useState<UserDataFromDB | null>(null);
//   const [isLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const updatePackies = async (newCount: number) => {
//     if (!user) return;
    
//     try {
//       const userRef = doc(db, 'users', user.id.toString());
//       await setDoc(userRef, {
//         packies: newCount,
//         lastUpdated: new Date().toISOString(),
//       }, { merge: true });

//       setUserDataFromDB(prev => prev ? { ...prev, packies: newCount } : null);
//     } catch (err) {
//       console.error('Error updating packies:', err);
//       setError('Failed to update packies');
//     }
//   };

//   const saveUserToFirestore = async (userData: TelegramUser) => {
//     try {
//       const userRef = doc(db, 'users', userData.id.toString())
//       const docSnap = await getDoc(userRef)
      
//       if (!docSnap.exists()) {
//         // New user
//         const newUserData: UserDataFromDB = {
//           ...userData,
//           createdAt: new Date().toISOString(),
//           lastLogin: new Date().toISOString(),
//           packies: 0,
//         }
//         await setDoc(userRef, newUserData)
        
//         // Initialize referral code for new user
//         const referralCode = await initializeReferralCode(userData.id.toString())
//         newUserData.referralCode = referralCode
        
//         setUserDataFromDB(newUserData)
//       } else {
//         // Existing user
//         const existingData = docSnap.data() as UserDataFromDB
//         const updatedData = {
//           ...existingData,
//           ...userData,
//           lastLogin: new Date().toISOString(),
//         }

//         // Check if user doesn't have a referral code yet
//         if (!existingData.referralCode) {
//           const referralCode = await initializeReferralCode(userData.id.toString())
//           updatedData.referralCode = referralCode
//         }

//         await setDoc(userRef, updatedData, { merge: true })
//         setUserDataFromDB(updatedData)
//       }
//     } catch (err) {
//       console.error('Error saving user to Firestore:', err)
//       setError('Failed to save user data')
//     }
//   }

//   const updateUserData = async (updates: any) => {
//     if (!user?.id) return
//     await updateDoc(doc(db, 'users', user.id.toString()), updates)
//   }

//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         // @ts-ignore
//         const tg = window.Telegram.WebApp
//         tg.ready()

//         // Get the start parameter from the URL
//         const urlParams = new URLSearchParams(window.location.search)
//         const startParam = urlParams.get('startapp')

//         if (tg.initDataUnsafe.user && startParam) {
//           console.log('Referral detected:', startParam)
//           // Extract referral code from format A_code_inviteEarn
//           const referralCode = startParam.split('_')[1]
//           if (referralCode) {
//             // Handle the referral
//             await handleReferral(tg.initDataUnsafe.user.id.toString(), referralCode)
//           }
//         }

//         if (tg.initDataUnsafe.user) {
//           const userData = {
//             id: tg.initDataUnsafe.user.id,
//             first_name: tg.initDataUnsafe.user.first_name,
//             last_name: tg.initDataUnsafe.user.last_name,
//             username: tg.initDataUnsafe.user.username,
//             language_code: tg.initDataUnsafe.user.language_code,
//           }
//           await saveUserToFirestore(userData)
//           setUser(userData)
//         }
//       } catch (err) {
//         console.error('Error initializing app:', err)
//         setError('Failed to initialize app')
//       }
//     }

//     initApp()
//   }, [])

//   return (
//     <TelegramContext.Provider value={{ 
//       user, 
//       isLoading, 
//       error, 
//       userDataFromDB, 
//       updatePackies, 
//       updateUserData,
//       setUserDataFromDB 
//     }}>
//       {children}
//     </TelegramContext.Provider>
//   );
// }

// export function useTelegram() {
//   const context = useContext(TelegramContext);
//   if (context === undefined) {
//     throw new Error('useTelegram must be used within a TelegramProvider');
//   }
//   return context;
// } 

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import {
  initializeReferralCode,
  handleReferral,
} from '../utils/referral';

interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
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
  // Referral fields
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

export const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userDataFromDB, setUserDataFromDB] = useState<UserDataFromDB | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update the user's packies count in Firestore.
   */
  const updatePackies = async (newCount: number) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id.toString());
      await setDoc(
        userRef,
        {
          packies: newCount,
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
      setUserDataFromDB((prev) =>
        prev ? { ...prev, packies: newCount } : null
      );
    } catch (err) {
      console.error('Error updating packies:', err);
      setError('Failed to update packies');
    }
  };

  /**
   * Initialize or update user document in Firestore.
   */
  const saveUserToFirestore = async (userData: TelegramUser) => {
    try {
      const userRef = doc(db, 'users', userData.id.toString());
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // New user => create doc
        const newUserData: UserDataFromDB = {
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          packies: 0,
        };
        // Create doc
        await setDoc(userRef, newUserData);

        // Initialize referral code
        const referralCode = await initializeReferralCode(
          userData.id.toString()
        );
        newUserData.referralCode = referralCode;

        setUserDataFromDB(newUserData);
      } else {
        // Existing user => merge updates
        const existingData = docSnap.data() as UserDataFromDB;
        const updatedData: Partial<UserDataFromDB> = {
          ...existingData,
          ...userData, // override with fresh data from TG
          lastLogin: new Date().toISOString(),
        };

        // If user doc doesn't have a referral code, create one
        if (!existingData.referralCode) {
          const referralCode = await initializeReferralCode(
            userData.id.toString()
          );
          updatedData.referralCode = referralCode;
        }

        await setDoc(userRef, updatedData, { merge: true });
        setUserDataFromDB({ ...existingData, ...updatedData });
      }
    } catch (err) {
      console.error('Error saving user to Firestore:', err);
      setError('Failed to save user data');
    }
  };

  /**
   * Update user doc with arbitrary fields. 
   * For example, to set twitterCompleted = true, etc.
   */
  const updateUserData = async (updates: any) => {
    if (!user?.id) return;
    try {
      await updateDoc(doc(db, 'users', user.id.toString()), updates);
      // Also update local state
      setUserDataFromDB((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err) {
      console.error('Error updating user data:', err);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        // @ts-ignore
        const tg = window.Telegram.WebApp;
        tg.ready();

        // Grab the startapp param from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const startParam = urlParams.get('startapp'); 
        // Example: "A_123456_inviteEarn"

        // If Telegram provided user info, proceed
        if (tg?.initDataUnsafe?.user) {
          const userData: TelegramUser = {
            id: tg.initDataUnsafe.user.id,
            first_name: tg.initDataUnsafe.user.first_name,
            last_name: tg.initDataUnsafe.user.last_name,
            username: tg.initDataUnsafe.user.username,
            language_code: tg.initDataUnsafe.user.language_code,
          };

          // 1. Save user doc FIRST so it definitely exists in Firestore.
          await saveUserToFirestore(userData);
          setUser(userData);

          // 2. If there's a referral code in startParam, handle it AFTER user doc creation.
          if (startParam) {
            console.log('Referral detected:', startParam);
            // Example format: "A_123456_inviteEarn"
            // Split by underscore
            const parts = startParam.split('_');
            // parts[1] should be the referral code ("123456")
            if (parts.length >= 2) {
              const referralCode = parts[1];
              await handleReferral(userData.id.toString(), referralCode);
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing app:', err);
        setError('Failed to initialize app');
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  return (
    <TelegramContext.Provider
      value={{
        user,
        isLoading,
        error,
        userDataFromDB,
        updatePackies,
        updateUserData,
        setUserDataFromDB,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram(): TelegramContextType {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
}
