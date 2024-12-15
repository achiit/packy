interface ProgressDotsProps {
    total: number
    current: number
  }
  
  export function ProgressDots({ total, current }: ProgressDotsProps) {
    return (
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === current ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }
  
  