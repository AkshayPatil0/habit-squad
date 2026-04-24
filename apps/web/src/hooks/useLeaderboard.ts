import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/firestoreService';
import { queryKeys } from '../lib/queryKeys';

export function useLeaderboard(count: number = 50) {
  return useQuery({
    queryKey: queryKeys.users.leaderboard(count),
    queryFn: () => userService.getTopUsers(count),
    staleTime: 1000 * 60 * 5, // 5 min — leaderboard doesn't need aggressive revalidation
  });
}
