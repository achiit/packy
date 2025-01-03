import { useState, useEffect } from 'react'

interface ReferralSystemProps {
  initData: string
  userId: string
  startParam: string
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([])
  const [referrer, setReferrer] = useState<string | null>(null)

  // Use your actual domain path here:
  // Since you said BotFather gave you "t.me/athpacky_bot/packy"
  // we'll build "?startapp" from that:
  const INVITE_URL = 'https://t.me/athpacky_bot/packy'

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrerId: startParam }),
          })
          if (!response.ok) throw new Error('Failed to save referral')
        } catch (error) {
          console.error('Error saving referral:', error)
        }
      }
    }

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

  const handleInviteFriend = () => {
    // Build the deep-link that opens your Web App with the userId as param
    const inviteLink = `${INVITE_URL}?startapp=${userId}`

    const shareText = 'Join me on this awesome Telegram mini app!'
    // "t.me/share/url" opens Telegram's forward/share window
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`

    window.open(fullUrl, '_blank')
  }

  const handleCopyLink = () => {
    // Build the deep-link
    const inviteLink = `${INVITE_URL}?startapp=${userId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  return (
    <div className="w-full max-w-md">
      {referrer && (
        <p className="text-green-500 mb-4">You were referred by user {referrer}</p>
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
 