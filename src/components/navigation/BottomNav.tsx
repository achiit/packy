import { Link } from 'react-router-dom'
// Import images
import homeIcon from '/src/assets/home.png'
import bookingIcon from '/src/assets/booking.png'
import gameIcon from '/src/assets/game.png'
import earnIcon from '/src/assets/earn.png'
import profileIcon from '/src/assets/profile.png'

interface NavItem {
  icon: string
  label: string
  path: string
  isGame?: boolean
  comingSoon?: boolean
}

export function BottomNav({ currentPath }: { currentPath: string }) {
  const navItems: NavItem[] = [
    { icon: homeIcon, label: 'Home', path: '/' },
    { icon: bookingIcon, label: 'Booking', path: '/booking', comingSoon: true },
    { icon: gameIcon, label: 'Game', path: '/game', isGame: true },
    { icon: earnIcon, label: 'earn', path: '/earn' },
    { icon: profileIcon, label: 'Profile', path: '/profile' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0">
      {/* Removed mb-4 and adjusted the padding */}
      <div className="mx-4 mb-0 bg-white rounded-full flex items-center justify-between px-6 py-2 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center relative ${
              item.isGame ? 'transform -translate-y-6' : ''
            }`}
          >
            {item.isGame ? (
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-gray-100 absolute -top-8">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-8 h-8"
                  style={{ filter: currentPath === item.path ? 'none' : 'grayscale(100%) opacity(50%)' }}
                />
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className={`w-6 h-6 ${currentPath === item.path ? '' : 'opacity-50'}`}
                />
                {item.comingSoon && (
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-red-400 text-white text-[7px] px-2 py-0.5 rounded-full whitespace-nowrap">
                    coming soon
                  </div>
                )}
              </div>
            )}
            <span 
              className={`text-xs mt-${item.isGame ? '8' : '1'} ${
                currentPath === item.path ? 'text-black' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}