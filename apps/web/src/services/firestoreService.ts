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
  limit,
  writeBatch,
  deleteField,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { HabitSchedule } from "../constants/habitSchedule";
import {
  getPeriodKey,
  getScheduledDatesForPeriod,
  getPeriodSlotCount,
} from "../utils/periodKey";

// ── Types ──────────────────────────────────────────
export interface Habit {
  id?: string;
  name: string;
  type: "boolean" | "numeric";
  /** Rich schedule definition — preferred over bare frequency */
  schedule?: HabitSchedule;
  /** Legacy: number of times per week (use schedule instead) */
  frequency?: number;
  xpReward: number;
  coinReward: number;
  /** Category id from DEFAULT_HABIT_CATEGORIES, e.g. "fitness" */
  category?: string;
  groupId: string | null;
  userId: string;
  /** ISO date strings of completed dates (legacy, used as fallback) */
  completedDates?: string[];
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
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  },
  getTopUsers: async (count: number = 100) => {
    const q = query(
      collection(db, "users"),
      orderBy("xp", "desc"),
      limit(count),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
  },
  createUserProfile: async (uid: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        uid,
        name: data.name || "",
        email: data.email || "",
        avatar: data.avatar || "",
        xp: 0,
        coins: 0,
        groups: [],
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  },
  updateUserProfile: async (
    uid: string,
    data: Partial<Pick<UserProfile, "name" | "avatar">>,
  ) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
  },
};

// ── Habits ────────────────────────────────────────
export const habitService = {
  createHabit: async (
    data: Omit<Habit, "id" | "createdAt" | "completedDates">,
  ) => {
    return await addDoc(collection(db, "habits"), {
      ...data,
      completedDates: [],
      createdAt: serverTimestamp(),
    });
  },
  getUserHabits: async (userId: string) => {
    const q = query(collection(db, "habits"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Habit,
    );
  },
  getGroupHabits: async (groupId: string) => {
    const q = query(collection(db, "habits"), where("groupId", "==", groupId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Habit,
    );
  },
  completeHabit: async (
    habitId: string,
    date: string,
    xpReward: number,
    coinReward: number,
    userId: string,
  ) => {
    const habitRef = doc(db, "habits", habitId);
    const userRef = doc(db, "users", userId);

    // Update habit completed dates
    const habitDoc = await getDoc(habitRef);
    if (habitDoc.exists()) {
      const completedDates = habitDoc.data().completedDates || [];
      if (!completedDates.includes(date)) {
        await updateDoc(habitRef, {
          completedDates: [...completedDates, date],
        });

        // Reward user
        await updateDoc(userRef, {
          xp: increment(xpReward),
          coins: increment(coinReward),
          updatedAt: serverTimestamp(),
        });
      }
    }
  },
  uncompleteHabit: async (
    habitId: string,
    date: string,
    xpReward: number,
    coinReward: number,
    userId: string,
  ) => {
    const habitRef = doc(db, "habits", habitId);
    const userRef = doc(db, "users", userId);

    const habitDoc = await getDoc(habitRef);
    if (habitDoc.exists()) {
      const completedDates: string[] = habitDoc.data().completedDates || [];
      if (completedDates.includes(date)) {
        await updateDoc(habitRef, {
          completedDates: completedDates.filter((d) => d !== date),
        });

        // Deduct rewards (increment with negative values)
        await updateDoc(userRef, {
          xp: increment(-xpReward),
          coins: increment(-coinReward),
          updatedAt: serverTimestamp(),
        });
      }
    }
  },
};

// ── Groups ────────────────────────────────────────
export const groupService = {
  createGroup: async (name: string, userId: string) => {
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const groupData = {
      name,
      inviteCode,
      members: [userId],
      avatar: `/avatars/avatar_${Math.floor(Math.random() * 16) + 1}.svg`,
      createdAt: serverTimestamp(),
    };
    const groupRef = await addDoc(collection(db, "groups"), groupData);

    // Update user's group list
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const groups = userDoc.data().groups || [];
      await updateDoc(userRef, {
        groups: [...groups, groupRef.id],
      });
    }

    return { id: groupRef.id, ...groupData };
  },
  joinGroup: async (inviteCode: string, userId: string) => {
    const q = query(
      collection(db, "groups"),
      where("inviteCode", "==", inviteCode),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Invalid invite code");

    const groupDoc = querySnapshot.docs[0];
    const groupRef = doc(db, "groups", groupDoc.id);
    const members = groupDoc.data().members || [];

    if (!members.includes(userId)) {
      await updateDoc(groupRef, {
        members: [...members, userId],
      });

      // Update user's group list
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const groups = userDoc.data().groups || [];
        await updateDoc(userRef, {
          groups: [...groups, groupDoc.id],
        });
      }
    }

    return { id: groupDoc.id, ...groupDoc.data() };
  },
  getGroup: async (groupId: string) => {
    const groupDoc = await getDoc(doc(db, "groups", groupId));
    return groupDoc.exists()
      ? ({ id: groupDoc.id, ...groupDoc.data() } as Group)
      : null;
  },
  getGroupMembers: async (memberIds: string[]) => {
    const members = [];
    for (const uid of memberIds) {
      const user = await userService.getUserProfile(uid);
      if (user) members.push(user);
    }
    return members;
  },
};

// ── Occurrences ───────────────────────────────────────────────────────────────

/**
 * A single schedulable slot for a habit in a given week.
 *
 * - **Flexible habits**: N slots per week, `scheduledDate` is null — any day fills it.
 * - **Specific-day habits**: one slot per scheduled day, `scheduledDate` holds the date.
 *
 * `completions` maps `userId → { completedAt, date }` enabling independent
 * per-member tracking (group habits).
 */
export interface HabitOccurrence {
  id?: string;
  habitId: string;
  periodKey: string; // "YYYY-MM-DD" or "2026-W14" or "2026-04" or "ONE_TIME"
  slotIndex: number; // 1-based: 1st, 2nd, 3rd slot this period
  scheduledDate: string | null; // ISO date for specific schedules; null for flexible
  completions: Record<
    string,
    {
      completedAt: Timestamp;
      date: string; // actual date the member completed
    }
  >;
  createdAt: Timestamp;
}

export const occurrenceService = {
  // ── Sub-collection ref helper ─────────────────────────────────────────────
  _colRef: (habitId: string) =>
    collection(db, "habits", habitId, "occurrences"),

  /**
   * Idempotently ensures occurrence slots exist for `habit` in the current period.
   * Call this when the habits list loads — safe to call multiple times.
   */
  ensurePeriodOccurrences: async (habit: Habit): Promise<void> => {
    if (!habit.id || !habit.schedule) return;

    const periodKey = getPeriodKey(habit.schedule);
    const colRef = occurrenceService._colRef(habit.id);

    // Check if slots already exist for this period
    const existing = await getDocs(
      query(colRef, where("periodKey", "==", periodKey)),
    );
    if (!existing.empty) return; // already generated

    const slotCount = getPeriodSlotCount(habit.schedule, periodKey);
    const scheduledDates = getScheduledDatesForPeriod(habit.schedule, periodKey);
    const batch = writeBatch(db);

    for (let i = 0; i < slotCount; i++) {
      const newRef = doc(colRef); // auto-id
      const occurrence: Omit<HabitOccurrence, "id"> = {
        habitId: habit.id,
        periodKey,
        slotIndex: i + 1,
        scheduledDate: scheduledDates[i] ?? null,
        completions: {},
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(newRef, occurrence);
    }

    await batch.commit();
  },

  /** Returns all occurrence slots for a habit in the given period, sorted by slot index. */
  getHabitOccurrences: async (
    habitId: string,
    periodKey: string,
  ): Promise<HabitOccurrence[]> => {
    const snap = await getDocs(
      query(
        occurrenceService._colRef(habitId),
        where("periodKey", "==", periodKey)
      )
    );
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as HabitOccurrence)
      .sort((a, b) => a.slotIndex - b.slotIndex);
  },

  /** Mark a specific user as having completed this occurrence slot. */
  completeOccurrence: async (
    habitId: string,
    occurrenceId: string,
    userId: string,
    xpReward: number,
  ): Promise<void> => {
    const today = new Date().toISOString().split("T")[0];
    const occRef = doc(occurrenceService._colRef(habitId), occurrenceId);
    const userRef = doc(db, "users", userId);

    await updateDoc(occRef, {
      [`completions.${userId}`]: {
        completedAt: serverTimestamp(),
        date: today,
      },
    });

    await updateDoc(userRef, {
      xp: increment(xpReward),
      updatedAt: serverTimestamp(),
    });
  },

  /** Remove a specific user's completion from this occurrence slot. */
  uncompleteOccurrence: async (
    habitId: string,
    occurrenceId: string,
    userId: string,
    xpReward: number,
  ): Promise<void> => {
    const occRef = doc(occurrenceService._colRef(habitId), occurrenceId);
    const userRef = doc(db, "users", userId);

    await updateDoc(occRef, {
      [`completions.${userId}`]: deleteField(),
    });

    await updateDoc(userRef, {
      xp: increment(-xpReward),
      updatedAt: serverTimestamp(),
    });
  },
};
