import { ReactNode, TouchEvent, useState } from 'react'

interface SwipeableViewsProps {
  children: ReactNode[]
  index: number
  onChangeIndex: (index: number) => void
}

export function SwipeableViews({ children, index, onChangeIndex }: SwipeableViewsProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && index < children.length - 1) {
      onChangeIndex(index + 1)
    }
    if (isRightSwipe && index > 0) {
      onChangeIndex(index - 1)
    }
  }

  return (
    <div 
      className="h-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="h-full flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children.map((child, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

