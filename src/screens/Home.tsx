'use client'

import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()
  
  const cards = [
    {
      title: t('cards.packySpin.title'),
      title1:t('cards.packySpin.title1'),
      subtitle: t('cards.packySpin.subtitle'),
      action: t('cards.packySpin.action'),
      background: '/src/assets/home1.png',
      alignment: 'items-end'
    },
    {
      title: t('cards.packyBookings.title'),
      title1:t('cards.packyBookings.title1'),
      action: t('cards.packyBookings.action'),
      background: '/src/assets/home2.png',
      alignment: 'items-start'
    },
    {
      title: t('cards.packyReferEarn.title'),
      title1:t('cards.packyReferEarn.title1'),
      action: t('cards.packyReferEarn.action'),
      background: '/src/assets/home3.png',
      alignment: 'items-end'
    }
  ]

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'HomeFont';
          src: url('/src/assets/Glacier-Regular.ttf') format('opentype');
        }
      `}</style>
      
      <div className="p-1 space-y-4 max-w-md mx-auto font-inter">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="relative w-full h-[180px] rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${card.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className={`absolute inset-0 p-4 flex flex-col justify-between ${card.alignment}`}>
              <div className="w-1/8">
                <h3 style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-xl ">{card.title}</h3>
                <h3 style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-xl ">{card.title1}</h3>

                {card.subtitle && (
                  <p style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-sm mt-1">{card.subtitle}</p>
                )}
              </div>
              <div>
                <button 
                  className="px-6 py-2 rounded-full text-white text-sm font-medium bg-[#FF9800] hover:bg-[#F57C00] transition-colors"
                  onClick={() => console.log(`Clicked ${card.action}`)}
                >
                  {card.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}