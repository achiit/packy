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

const REFERRAL_REWARD = 500 // 500 Packies per referral

/**
 * Generate a short code from the user's Telegram ID.
 * Example: "12345678" => "123456"
 */
export const generateReferralCode = (userId: string): string => {
  return userId.slice(0, 6)
}

/**
 * Return a single consistent link: e.g.
 * https://t.me/athpacky_bot?startapp=abcdef
 */
export const generateReferralLink = (referralCode: string): string => {
  return `https://t.me/athpacky_bot?startapp=${referralCode}`
}

/**
 * Main referral logic: pass newUserId and referralCode
 */
export const handleReferral = async (newUserId: string, referralCode: string) => {
  try {
    // 1) Check if user doc exists and already has "referredBy"
    const userDocSnap = await getDoc(doc(db, 'users', newUserId))
    if (userDocSnap.exists() && userDocSnap.data().referredBy) {
      return false // user already referred
    }

    // 2) Find the user with matching referralCode
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('referralCode', '==', referralCode))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return false // no match

    const referrerId = querySnapshot.docs[0].id

    // 3) Update referrer's stats
    await updateDoc(doc(db, 'users', referrerId), {
      referralCount: increment(1),
      packies: increment(REFERRAL_REWARD),
      referralRewardsEarned: increment(REFERRAL_REWARD)
    })

    // 4) Update the new user
    await updateDoc(doc(db, 'users', newUserId), {
      referredBy: referrerId,
      packies: increment(REFERRAL_REWARD)
    })

    return true
  } catch (error) {
    console.error('Error handling referral:', error)
    return false
  }
}

/**
 * Get a user's referral stats:
 *  - referralCode
 *  - referralCount
 *  - referralRewardsEarned
 *  - referredBy
 */
export const getReferralStats = async (userId: string) => {
  try {
    const snap = await getDoc(doc(db, 'users', userId))
    if (!snap.exists()) return null

    const data = snap.data()
    return {
      referralCode: data?.referralCode || null,
      referralCount: data?.referralCount || 0,
      referralRewardsEarned: data?.referralRewardsEarned || 0,
      referredBy: data?.referredBy || null
    }
  } catch (error) {
    console.error('Error getting referral stats:', error)
    return null
  }
}

/**
 * Initialize a referral code for a new user if none exists
 */
export const initializeReferralCode = async (userId: string) => {
  const userRef = doc(db, 'users', userId)
  const snap = await getDoc(userRef)
  const userData = snap.data()

  // Generate a code from userId
  const referralCode = generateReferralCode(userId)

  // Update the doc with code if not present
  await updateDoc(userRef, {
    referralCode: referralCode,
    referralCount: userData?.referralCount ?? 0,
    referralRewardsEarned: userData?.referralRewardsEarned ?? 0
  })

  return referralCode
}
