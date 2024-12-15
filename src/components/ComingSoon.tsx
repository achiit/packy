import { t } from 'i18next'
import { useEffect, useState } from 'react'

export function ComingSoon() {
  const [showElements, setShowElements] = useState(false)

  useEffect(() => {
    setShowElements(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-20 right-20 w-4 h-4 border-2 border-[#D8E63B] rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-[#D8E63B] rounded-full"></div>
        <div className="absolute top-40 right-40 w-8 h-8 border-2 border-black rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-1 bg-[#D8E63B] -rotate-45"></div>
      </div>

      {/* Main content */}
      <div className={`relative transform transition-all duration-1000 ${showElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 text-center capitalize">
          {t('cards.packySpin.title')}

          </h1>
          
          {/* Subtitle */}
          <p className="text-black/70 text-center mb-8">
            Something awesome is in the works
          </p>

          {/* Coming Soon Box */}
          <div className="relative bg-white rounded-3xl shadow-xl p-8 mb-8 transform hover:scale-105 transition-transform">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#D8E63B] rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#D8E63B] rounded-full animate-ping delay-300"></div>
            <h2 className="text-3xl font-bold text-center mb-2">COMING SOON</h2>
          </div>

          
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D8E63B] rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#D8E63B] rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-[#D8E63B] rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  )
}