import { useState, useEffect } from 'react'

interface ReferralSystemProps {
  initData: string
  userId: string
  startParam: string
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([])
  const [referrer, setReferrer] = useState<string | null>(null)

  // Single base link: no extra /app or extra ?startapp in the string
  const BOT_INVITE_URL = "https://t.me/athpacky_bot"

  useEffect(() => {
    /**
     * 1) If we have a startParam (the referral code from the link)
     *    and a valid userId, send to our /api/referrals to record.
     */
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,         // The newly joined user
              referrerId: startParam, // The code or ID from the link
            }),
          })
          if (!response.ok) throw new Error('Failed to save referral')
        } catch (error) {
          console.error('Error saving referral:', error)
        }
      }
    }

    /**
     * 2) Fetch the user's referrals from /api/referrals
     *    to show how many invites they have, or who referred them.
     */
    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`)
          if (!response.ok) throw new Error('Failed to fetch referrals')
          const data = await response.json()
          setReferrals(data.referrals)
          setReferrer(data.referrer)
        } catch (error) {
          console.error('Error fetching referrals:', error)
        }
      }
    }

    checkReferral()
    fetchReferrals()
  }, [userId, startParam])

  /**
   * Creates a link that the user can share with others.
   * Example: https://t.me/athpacky_bot?startapp=12345
   */
  const handleInviteFriend = () => {
    // Build the final invite link
    const inviteLink = `${BOT_INVITE_URL}?startapp=${userId}`
    // Put it into a Telegram share link
    const shareText = `Join me on this awesome Telegram mini app!`
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`

    // Open in a new tab
    window.open(fullUrl, '_blank')
  }

  /**
   * Copy the same link to the clipboard
   */
  const handleCopyLink = () => {
    const inviteLink = `${BOT_INVITE_URL}?startapp=${userId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  return (
    <div className="w-full max-w-md">
      {referrer && (
        <p className="text-green-500 mb-4">
          You were referred by user {referrer}
        </p>
      )}

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleInviteFriend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Invite Friend
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Invite Link
        </button>
      </div>

      {referrals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Referrals</h2>
          <ul>
            {referrals.map((referral, index) => (
              <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                User {referral}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ReferralSystem
