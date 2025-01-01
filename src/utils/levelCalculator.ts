interface LevelThreshold {
  level: number;
  packies: number;
}

export const levelThresholds: LevelThreshold[] = [
  { level: 1,  packies: 1000 },
  { level: 2,  packies: 3000 },
  { level: 3,  packies: 7000 },
  { level: 4,  packies: 15000 },
  { level: 5,  packies: 30000 },
  { level: 6,  packies: 60000 },
  { level: 7,  packies: 120000 },
  { level: 8,  packies: 250000 },
  { level: 9,  packies: 500000 },
  { level: 10, packies: 750000 },
  { level: 11, packies: 1000000 },
  { level: 12, packies: 1300000 },
  { level: 13, packies: 1800000 },
  { level: 14, packies: 2500000 },
  { level: 15, packies: 3500000 },
  { level: 16, packies: 5000000 },
  { level: 17, packies: 6000000 },
  { level: 18, packies: 7500000 },
  { level: 19, packies: 8500000 },
  { level: 20, packies: 10000000 },
];

export function getLevelTitle(level: number): string {
  switch (level) {
    case 0: return "Rookie Explorer";
    case 1: return "Weekend Wanderer";
    case 2: return "Miles Master";
    case 3: return "Roaming Ranger";
    case 4: return "Globetrotter";
    case 5: return "Jetsetter";
    case 6: return "Trailblazer";
    case 7: return "Sunset Sailor";
    case 8: return "Nomadic Navigator";
    case 9: return "Boundless Backpacker";
    case 10: return "Wayfarer Warrior";
    case 11: return "Global Guru";
    case 12: return "Intrepid Itinerant";
    case 13: return "Frontier Fighter";
    case 14: return "Wanderlust Whisperer";
    case 15: return "Expedition Expert";
    case 16: return "Skyline Surfer";
    case 17: return "Odyssey Oracle";
    case 18: return "Nomad Noble";
    case 19: return "Legendary Voyager";
    default: return "Unknown Explorer";
  }
}

export function calculateLevel(packies: number): LevelThreshold {
  if (packies < 100) {
    return { level: 0, packies: 100 };
  }

  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (packies >= levelThresholds[i].packies) {
      return levelThresholds[i];
    }
  }

  return levelThresholds[0];
}

export function getNextLevel(currentLevel: number): LevelThreshold | null {
  if (currentLevel >= 20) return null;
  return levelThresholds[currentLevel];
}