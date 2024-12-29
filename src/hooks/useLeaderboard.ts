import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface LeaderboardUser {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  packies: number;
}

export function useLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          orderBy('packies', 'desc'),
          limit(50) // Limit to top 50 users
        );

        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LeaderboardUser[];

        setLeaderboardData(users);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboardData, isLoading, error };
} 