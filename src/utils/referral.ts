import { db } from '../config/firebase'
import { doc, updateDoc, getDoc, increment, collection, query, where, getDocs } from 'firebase/firestore'

const REFERRAL_REWARD = 500 // Changed from 1000 to 500 Packies per referral
// const BOT_USERNAME = 'athpacky_bot' // Replace with your bot's username

export const generateReferralCode = (userId: string): string => {
  // Create a short unique code from userId
  return `${userId.slice(0, 6)}`
}

export const generateReferralLink = (referralCode: string): string => {
  return `https://t.me/athpacky_bot/app?startapp=${referralCode}`
}

export const handleReferral = async (newUserId: string, referralCode: string) => {
  try {
    console.log('Processing referral:', { newUserId, referralCode })
    
    // Check if user already has a referrer
    const userDoc = await getDoc(doc(db, 'users', newUserId.toString()))
    if (userDoc.exists() && userDoc.data().referredBy) {
      console.log('User already has a referrer')
      return false
    }

    // Find referrer by referral code
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('referralCode', '==', referralCode))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      console.log('No referrer found with code:', referralCode)
      return false
    }

    const referrerId = querySnapshot.docs[0].id

    // Don't allow self-referral
    if (referrerId === newUserId) {
      console.log('Self-referral not allowed')
      return false
    }

    console.log('Found referrer:', referrerId)

    // Update referrer's stats
    await updateDoc(doc(db, 'users', referrerId), {
      referralCount: increment(1),
      packies: increment(REFERRAL_REWARD),
      referralRewardsEarned: increment(REFERRAL_REWARD)
    })

    // Update new user's data
    await updateDoc(doc(db, 'users', newUserId.toString()), {
      referredBy: referrerId,
      packies: increment(REFERRAL_REWARD)
    })

    console.log('Referral processed successfully')
    return true
  } catch (error) {
    console.error('Error handling referral:', error)
    return false
  }
}

export const getReferralStats = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId.toString()))
    if (!userDoc.exists()) return null

    const userData = userDoc.data()
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
  const referralCode = generateReferralCode(userId)
  const userRef = doc(db, 'users', userId.toString())
  
  // Get current user data
  const userDoc = await getDoc(userRef)
  const userData = userDoc.data()

  // Only initialize stats if they don't exist
  await updateDoc(userRef, {
    referralCode,
    referralCount: userData?.referralCount ?? 0,
    referralRewardsEarned: userData?.referralRewardsEarned ?? 0
  })
  
  return referralCode
} 