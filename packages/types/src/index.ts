export type HabitType = 'daily' | 'weekly' | 'times_per_week' | 'one_time';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  coins: number;
  groups: string[];
  createdAt: string;
}

export interface IGroup {
  _id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  members: string[];
  createdAt: string;
}

export interface IHabit {
  _id: string;
  name: string;
  type: HabitType;
  frequency: number;
  xpReward: number;
  coinReward: number;
  createdBy: string;
  groupId: string | null;
  createdAt: string;
}

export interface IHabitCompletion {
  _id: string;
  habitId: string;
  userId: string;
  groupId: string;
  completedAt: string;
}

export interface IReward {
  _id: string;
  name: string;
  cost: number;
  groupId: string;
  createdBy: string;
}

export interface IRewardRedemption {
  _id: string;
  rewardId: string;
  userId: string;
  redeemedAt: string;
}

export interface ILeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  completions: number;
  rank: number;
}

export interface ICompleteHabitResponse {
  xpEarned: number;
  totalXp: number;
}

export interface ISocketHabitCompleted {
  userId: string;
  userName: string;
  habitName: string;
  xpEarned: number;
  groupId: string;
  timestamp: string;
}
