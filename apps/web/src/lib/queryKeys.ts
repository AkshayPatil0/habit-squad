export const queryKeys = {
  habits: {
    all: ['habits'] as const,
    byUser: (userId: string) => ['habits', 'user', userId] as const,
    byGroup: (groupId: string) => ['habits', 'group', groupId] as const,
  },
  occurrences: {
    byHabitPeriod: (habitId: string, periodKey: string) =>
      ['occurrences', habitId, periodKey] as const,
  },
  users: {
    all: ['users'] as const,
    profile: (uid: string) => ['users', 'profile', uid] as const,
    leaderboard: (count?: number) => ['users', 'leaderboard', count ?? 'default'] as const,
  },
  groups: {
    all: ['groups'] as const,
    detail: (groupId: string) => ['groups', groupId] as const,
    members: (groupId: string) => ['groups', groupId, 'members'] as const,
  },
} as const;

