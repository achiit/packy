import { Link } from 'react-router-dom'

interface NavItem {
  icon: string
  label: string
  path: string
  isGame?: boolean
  comingSoon?: boolean
}

export function BottomNav({ currentPath }: { currentPath: string }) {
  const navItems: NavItem[] = [
    { icon: '/src/assets/home.png', label: 'Home', path: '/' },
    { icon: '/src/assets/booking.png', label: 'Booking', path: '/booking', comingSoon: true },
    { icon: '/src/assets/game.png', label: 'Game', path: '/game', isGame: true },
    { icon: '/src/assets/earn.png', label: 'earn', path: '/earn' },
    { icon: '/src/assets/profile.png', label: 'Profile', path: '/profile' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around h-16 px-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`flex flex-col items-center ${
            item.isGame ? '-mt-8' : ''
          }`}
        >
          {item.isGame ? (
            <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-lg -mt-8">
              <img src={item.icon} alt={item.label} className="w-8 h-8" />
            </div>
          ) : (
            <div className="relative">
              <img 
                src={item.icon} 
                alt={item.label} 
                className={`w-6 h-6 ${currentPath === item.path ? 'opacity-100' : 'opacity-50'}`} 
              />
              {item.comingSoon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-1 rounded whitespace-nowrap">
                  coming soon
                </div>
              )}
            </div>
          )}
          <span className={`text-xs mt-1 ${
            currentPath === item.path ? 'text-black' : 'text-gray-500'
          }`}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  )
}