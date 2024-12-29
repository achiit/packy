import { MotivationalPhrase } from '../types/game'

export const motivationalPhrases: MotivationalPhrase[] = [
  { text: "+1", color: "from-[#9FE870] to-[#70E8C5]", scale: 2, probability: 0.4 },
  { text: "⚡️", color: "from-[#FFB938] to-[#FF8438]", scale: 2.5, probability: 0.2 },
  { text: "🎯", color: "from-[#FF6B6B] to-[#FF3838]", scale: 2.5, probability: 0.1 },
  { text: "Perfect!", color: "from-[#70E8C5] to-[#38C6FF]", scale: 1.8, probability: 0.1 },
  { text: "Wow!", color: "from-[#9FE870] to-[#70E8C5]", scale: 1.8, probability: 0.1 },
  { text: "🔥", color: "from-[#FF6B6B] to-[#FF3838]", scale: 2.5, probability: 0.1 }
]

export const getRandomPhrases = (count: number): MotivationalPhrase[] => {
  const phrases: MotivationalPhrase[] = []
  for (let i = 0; i < count; i++) {
    const rand = Math.random()
    let sum = 0
    for (const phrase of motivationalPhrases) {
      sum += phrase.probability
      if (rand < sum) {
        phrases.push(phrase)
        break
      }
    }
  }
  return phrases
}
