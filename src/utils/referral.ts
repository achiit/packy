import { db } from '../config/firebase'
import {
  doc,
  updateDoc,
  getDoc,
  increment,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'

const REFERRAL_REWARD = 500

// You said you set domain to "packy",
// so let's be consistent with the link:
export const generateReferralCode = (userId: string): string => {
  // Create a short unique code from userId
  return userId.slice(0, 6)
}

export const generateReferralLink = (referralCode: string): string => {
  // Uses "packy?startapp=" for the mini app domain
  return `https://t.me/athpacky_bot/packy?startapp=${referralCode}`
}

// The main logic for awarding referrer & new user
export const handleReferral = async (newUserId: string, referralCode: string) => {
  try {
    // Check if user already has a referrer
    const newUserRef = doc(db, 'users', newUserId)
    const newUserSnap = await getDoc(newUserRef)
    if (newUserSnap.exists() && newUserSnap.data().referredBy) {
      // Already referred, skip
      return false
    }

    // Find referrer by referral code
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('referralCode', '==', referralCode))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      // No user with that referralCode
      return false
    }

    const referrerId = querySnapshot.docs[0].id

    // Don't let a user refer themselves
    if (referrerId === newUserId) {
      return false
    }

    // Update referrer's stats
    await updateDoc(doc(db, 'users', referrerId), {
      referralCount: increment(1),
      packies: increment(REFERRAL_REWARD),
      referralRewardsEarned: increment(REFERRAL_REWARD)
    })

    // Update new user's data
    await updateDoc(newUserRef, {
      referredBy: referrerId,
      packies: increment(REFERRAL_REWARD)
    })

    return true
  } catch (error) {
    console.error('Error handling referral:', error)
    return false
  }
}

// Retrieve a user's referral stats
export const getReferralStats = async (userId: string) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', userId))
    if (!userSnap.exists()) return null

    const userData = userSnap.data()
    return {
      referralCode: userData.referralCode || null,
      referralCount: userData.referralCount || 0,
      referralRewardsEarned: userData.referralRewardsEarned || 0,
      referredBy: userData.referredBy || null
    }
  } catch (error) {
    console.error('Error getting referral stats:', error)
    return null
  }
}

// Initialize referral code for new user
export const initializeReferralCode = async (userId: string) => {
  const userRef = doc(db, 'users', userId)
  const referralCode = generateReferralCode(userId)

  // Check existing user data
  const userSnap = await getDoc(userRef)
  const userData = userSnap.data()

  // If user doesn't have referral stats, set them
  await updateDoc(userRef, {
    referralCode,
    referralCount: userData?.referralCount ?? 0,
    referralRewardsEarned: userData?.referralRewardsEarned ?? 0
  })

  return referralCode
}
