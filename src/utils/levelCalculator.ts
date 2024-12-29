interface LevelThreshold {
  level: number;
  packies: number;
}

export const levelThresholds: LevelThreshold[] = [
  { level: 1, packies: 100 },
  { level: 2, packies: 500 },
  { level: 3, packies: 1000 },
  { level: 4, packies: 1500 },
  { level: 5, packies: 2000 },
  { level: 6, packies: 2500 },
  { level: 7, packies: 3000 },
  { level: 8, packies: 3500 },
  { level: 9, packies: 4000 },
  { level: 10, packies: 4500 },
  { level: 11, packies: 5000 },
  { level: 12, packies: 5500 },
  { level: 13, packies: 6000 },
  { level: 14, packies: 6500 },
  { level: 15, packies: 7000 },
  { level: 16, packies: 7500 },
  { level: 17, packies: 8000 },
  { level: 18, packies: 8500 },
  { level: 19, packies: 9000 },
  { level: 20, packies: 9500 },
];

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