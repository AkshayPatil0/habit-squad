import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { userService, UserProfile } from '../services/firestoreService';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { setAuth, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Fetch or create Firestore profile
          let userProfile = await userService.getUserProfile(firebaseUser.uid);
          
          if (!userProfile) {
            await userService.createUserProfile(firebaseUser.uid, {
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
            });
            userProfile = await userService.getUserProfile(firebaseUser.uid);
          }
          
          setProfile(userProfile);

          if (userProfile) {
            setAuth({
              _id: userProfile.uid,
              name: userProfile.name,
              email: userProfile.email,
              avatar: userProfile.avatar,
              xp: userProfile.xp,
              coins: userProfile.coins,
              groups: userProfile.groups,
            }, '');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setProfile(null);
        storeLogout();
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setAuth, storeLogout]);

  const logout = async () => {
    await signOut(auth);
    storeLogout();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
