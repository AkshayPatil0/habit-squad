import { useEffect } from 'react';
import { getSocket, connectSocket, joinGroupRoom, leaveGroupRoom } from '../services/socket';

interface HabitCompletedPayload {
  userId: string;
  userName: string;
  habitName: string;
  xpEarned: number;
  groupId: string;
  timestamp: string;
}

interface UseSocketOptions {
  groupId?: string;
  onHabitCompleted?: (data: HabitCompletedPayload) => void;
  onLeaderboardUpdated?: (data: { groupId: string }) => void;
  onGroupActivity?: (data: HabitCompletedPayload & { type: string }) => void;
}

export const useSocket = ({ groupId, onHabitCompleted, onLeaderboardUpdated, onGroupActivity }: UseSocketOptions = {}) => {
  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    if (groupId) {
      joinGroupRoom(groupId);
    }

    if (onHabitCompleted) socket.on('habit_completed', onHabitCompleted);
    if (onLeaderboardUpdated) socket.on('leaderboard_updated', onLeaderboardUpdated);
    if (onGroupActivity) socket.on('group_activity', onGroupActivity);

    return () => {
      if (groupId) leaveGroupRoom(groupId);
      if (onHabitCompleted) socket.off('habit_completed', onHabitCompleted);
      if (onLeaderboardUpdated) socket.off('leaderboard_updated', onLeaderboardUpdated);
      if (onGroupActivity) socket.off('group_activity', onGroupActivity);
    };
  }, [groupId]);
};
