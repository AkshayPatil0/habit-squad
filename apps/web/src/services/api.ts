import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data).then((r) => r.data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};

// ── Groups ────────────────────────────────────────
export const groupApi = {
  create: (name: string) => api.post('/groups', { name }).then((r) => r.data),
  join: (inviteCode: string) => api.post('/groups/join', { inviteCode }).then((r) => r.data),
  get: (groupId: string) => api.get(`/groups/${groupId}`).then((r) => r.data),
  members: (groupId: string) => api.get(`/groups/${groupId}/members`).then((r) => r.data),
};

// ── Habits ────────────────────────────────────────
export const habitApi = {
  create: (data: {
    name: string;
    type: string;
    frequency?: number;
    xpReward?: number;
    coinReward?: number;
    groupId?: string | null;
  }) => api.post('/habits', data).then((r) => r.data),
  getGroupHabits: (groupId: string) =>
    api.get(`/habits/groups/${groupId}/habits`).then((r) => r.data),
  getUserHabits: (userId: string) =>
    api.get(`/habits/users/${userId}/habits`).then((r) => r.data),
  complete: (habitId: string, groupId: string) =>
    api.post(`/habits/${habitId}/complete`, { groupId }).then((r) => r.data),
};

// ── Leaderboard ───────────────────────────────────
export const leaderboardApi = {
  get: (groupId: string) =>
    api.get(`/groups/${groupId}/leaderboard`).then((r) => r.data),
};

export default api;
