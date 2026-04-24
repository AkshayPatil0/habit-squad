import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { userService, UserProfile } from '../services/firestoreService';
import { queryKeys } from '../lib/queryKeys';
import { useUserProfile } from '../hooks/useUserProfile';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

// ── Inner provider — has access to QueryClient ────────────────────────────
const AuthProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const queryClient = useQueryClient();
  const { setAuth, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Ensure profile exists in Firestore, create if first login
          let userProfile = await userService.getUserProfile(firebaseUser.uid);

          if (!userProfile) {
            await userService.createUserProfile(firebaseUser.uid, {
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              avatar:
                firebaseUser.photoURL ||
                `/avatars/avatar_${Math.floor(Math.random() * 16) + 1}.svg`,
            });
            userProfile = await userService.getUserProfile(firebaseUser.uid);
          }

          // ── Seed the TanStack Query cache so useUserProfile() returns
          //    data immediately without an extra network round-trip ─────────
          if (userProfile) {
            queryClient.setQueryData(
              queryKeys.users.profile(firebaseUser.uid),
              userProfile,
            );

            setAuth(
              {
                _id: userProfile.uid,
                name: userProfile.name,
                email: userProfile.email,
                avatar: userProfile.avatar,
                xp: userProfile.xp,
                coins: userProfile.coins,
                groups: userProfile.groups,
              },
              '',
            );
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        // Clear the user profile from the cache on logout
        queryClient.removeQueries({ queryKey: queryKeys.users.all });
        queryClient.removeQueries({ queryKey: queryKeys.habits.all });
        storeLogout();
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [queryClient, setAuth, storeLogout]);

  // Derive live profile from the TanStack Query cache.
  // Falls back to null while the auth listener is resolving.
  const { data: profile = null } = useUserProfile(user?.uid);

  const logout = async () => {
    await signOut(auth);
    storeLogout();
  };

  // Combined loading: still loading if Firebase auth hasn't resolved yet
  const loading = authLoading;

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Public provider ────────────────────────────────────────────────────────
// Wraps the inner one so the inner component can call useQueryClient()
// (QueryClientProvider is above us in main.tsx)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProviderInner>{children}</AuthProviderInner>
);

export const useAuth = () => useContext(AuthContext);
