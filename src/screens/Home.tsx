'use client'
import { useTranslation } from 'react-i18next'
import home1 from '/src/assets/home1.png'
import home2 from '/src/assets/home2.png'
import home3 from '/src/assets/home3.png'
import glacierFont from '/src/assets/Glacier-Regular.ttf'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
// At the top of your file, import the images

// Then modify your cards array to use these imports
const cards = [
  {
    title: t('cards.packySpin.title'),
    title1: t('cards.packySpin.title1'),
    subtitle: t('cards.packySpin.subtitle'),
    action: t('cards.packySpin.action'),
    background: home1,  // Use the imported image
    alignment: 'items-end'
  },
  {
    title: t('cards.packyBookings.title'),
    title1: t('cards.packyBookings.title1'),
    action: t('cards.packyBookings.action'),
    background: home2,  // Use the imported image
    alignment: 'items-start'
  },
  {
    title: t('cards.packyReferEarn.title'),
    title1: t('cards.packyReferEarn.title1'),
    action: t('cards.packyReferEarn.action'),
    background: home3,  // Use the imported image
    alignment: 'items-end'
  }
]

  const handleCardClick = (index: number) => {
    if (index === 0) {
      navigate('/game')
    } else if (index === 2) {
      navigate('/earn')
    } 
  }

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'HomeFont';
            src: url('${glacierFont}') format('truetype');
          }
        `}
      </style>
      
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
              <div className={`w-full ${index === 1 ? 'text-left' : 'text-right'}`}>
                <h3 style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-2xl">{card.title}</h3>
                <h3 style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-2xl">{card.title1}</h3>

                {card.subtitle && (
                  <p style={{ fontFamily: 'HomeFont' }} className="text-[#38644c] text-sm mt-1">{card.subtitle}</p>
                )}
              </div>
              <div className={`w-full ${index === 1 ? 'text-left' : 'text-right'}`}>
                <button 
                  className="px-6 py-2 rounded-full text-white text-sm font-medium bg-[#FF9800] hover:bg-[#F57C00] transition-colors"
                  onClick={() => handleCardClick(index)}
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