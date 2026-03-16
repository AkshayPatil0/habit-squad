import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  query, 
  where, 
  updateDoc, 
  increment,
  setDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ── Types ──────────────────────────────────────────
export interface Habit {
  id?: string;
  name: string;
  type: 'boolean' | 'numeric';
  frequency: number;
  xpReward: number;
  coinReward: number;
  groupId: string | null;
  userId: string;
  completedDates: string[]; // ISO dates
  createdAt: Timestamp;
}

export interface Group {
  id?: string;
  name: string;
  inviteCode: string;
  members: string[]; // userIds
  avatar: string;
  createdAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  coins: number;
  groups: string[];
  updatedAt: Timestamp;
}

// ── Users ──────────────────────────────────────────
export const userService = {
  getUserProfile: async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() as UserProfile : null;
  },
  getTopUsers: async (count: number = 100) => {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(count));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  },
  createUserProfile: async (uid: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      name: data.name || '',
      email: data.email || '',
      avatar: data.avatar || '',
      xp: 0,
      coins: 0,
      groups: [],
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
};

// ── Habits ────────────────────────────────────────
export const habitService = {
  createHabit: async (data: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => {
    return await addDoc(collection(db, 'habits'), {
      ...data,
      completedDates: [],
      createdAt: serverTimestamp(),
    });
  },
  getUserHabits: async (userId: string) => {
    const q = query(collection(db, 'habits'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Habit);
  },
  getGroupHabits: async (groupId: string) => {
    const q = query(collection(db, 'habits'), where('groupId', '==', groupId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Habit);
  },
  completeHabit: async (habitId: string, date: string, xpReward: number, coinReward: number, userId: string) => {
    const habitRef = doc(db, 'habits', habitId);
    const userRef = doc(db, 'users', userId);
    
    // Update habit completed dates
    const habitDoc = await getDoc(habitRef);
    if (habitDoc.exists()) {
      const completedDates = habitDoc.data().completedDates || [];
      if (!completedDates.includes(date)) {
        await updateDoc(habitRef, {
          completedDates: [...completedDates, date]
        });
        
        // Reward user
        await updateDoc(userRef, {
          xp: increment(xpReward),
          coins: increment(coinReward),
          updatedAt: serverTimestamp()
        });
      }
    }
  }
};

// ── Groups ────────────────────────────────────────
export const groupService = {
  createGroup: async (name: string, userId: string) => {
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const groupData = {
      name,
      inviteCode,
      members: [userId],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: serverTimestamp(),
    };
    const groupRef = await addDoc(collection(db, 'groups'), groupData);
    
    // Update user's group list
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const groups = userDoc.data().groups || [];
      await updateDoc(userRef, {
        groups: [...groups, groupRef.id]
      });
    }
    
    return { id: groupRef.id, ...groupData };
  },
  joinGroup: async (inviteCode: string, userId: string) => {
    const q = query(collection(db, 'groups'), where('inviteCode', '==', inviteCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) throw new Error('Invalid invite code');
    
    const groupDoc = querySnapshot.docs[0];
    const groupRef = doc(db, 'groups', groupDoc.id);
    const members = groupDoc.data().members || [];
    
    if (!members.includes(userId)) {
      await updateDoc(groupRef, {
        members: [...members, userId]
      });
      
      // Update user's group list
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const groups = userDoc.data().groups || [];
        await updateDoc(userRef, {
          groups: [...groups, groupDoc.id]
        });
      }
    }
    
    return { id: groupDoc.id, ...groupDoc.data() };
  },
  getGroup: async (groupId: string) => {
    const groupDoc = await getDoc(doc(db, 'groups', groupId));
    return groupDoc.exists() ? { id: groupDoc.id, ...groupDoc.data() } as Group : null;
  },
  getGroupMembers: async (memberIds: string[]) => {
    const members = [];
    for (const uid of memberIds) {
      const user = await userService.getUserProfile(uid);
      if (user) members.push(user);
    }
    return members;
  }
};
