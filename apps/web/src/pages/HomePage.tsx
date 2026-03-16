import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { habitService, Habit } from "../services/firestoreService";
import {
  Flame,
  Bell,
  Droplets,
  Activity,
  Plus,
  Check,
  Loader2,
} from "lucide-react";

export default function HomePage() {
  const { profile, loading: authLoading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(true);

  useEffect(() => {
    if (profile?.uid) {
      const fetchHabits = async () => {
        try {
          const userHabits = await habitService.getUserHabits(profile.uid);
          setHabits(userHabits.slice(0, 2)); // Show first 2 for preview
        } catch (error) {
          console.error("Error fetching habits:", error);
        } finally {
          setLoadingHabits(false);
        }
      };
      fetchHabits();
    }
  }, [profile?.uid]);

  const handleCompleteHabit = async (habit: Habit) => {
    if (!profile?.uid || !habit.id) return;
    const today = new Date().toISOString().split("T")[0];
    try {
      await habitService.completeHabit(
        habit.id,
        today,
        habit.xpReward,
        habit.coinReward,
        profile.uid,
      );
      // Refresh habits or update local state
      const updatedHabits = habits.map((h) =>
        h.id === habit.id
          ? { ...h, completedDates: [...(h.completedDates || []), today] }
          : h,
      );
      setHabits(updatedHabits);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-full font-display flex flex-col items-center">
      <div className="w-full max-w-md bg-white dark:bg-background-dark min-h-full flex flex-col relative pb-8 shadow-2xl">
        {/* Header Section */}
        <header className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent overflow-hidden">
                <img
                  alt={`${profile?.name || "User"}'s avatar`}
                  className="w-full h-full object-cover"
                  src={
                    profile?.avatar ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAN3k8nAUc6_cb5hKijin1pjmvHHmmXS0MRBTuqQBbvoaBuvvkTBVp5SbCiVLebM0QVv8qf5cUZ8MzVQrRz7duh98s2gcNsONvQjwYaZgA_CRBzx8MlNmhM_vI33xDQeliRoJzIvOnypHcod7FTmfKZPsNHsQSLhGfLzrChzzEeh8pdQ2g47bttdWHqGeL4qPnAYrW6XPuGmT-1OSOKu4Dw23ELhAmYzexk1Dm_6xVduAGYujNoC6DMptR_VaXDCgyn3L-INysQp4A"
                  }
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Hi, {profile?.name?.split(" ")[0] || "Friend"}
                </h1>
                <p className="text-accent font-semibold flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  Welcome back!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  Coins
                </span>
                <span className="text-sm font-black text-amber-500">
                  {profile?.coins || 0}
                </span>
              </div>
              <button className="w-10 h-10 rounded-full bg-surface-100 dark:bg-surface-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="bg-accent/10 dark:bg-accent/5 p-4 rounded-xl border-2 border-accent">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-accent uppercase tracking-wider">
                Level {Math.floor((profile?.xp || 0) / 1000) + 1}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {(profile?.xp || 0) % 1000} / 1000 XP
              </span>
            </div>
            <div className="h-3 w-full bg-surface-200 dark:bg-surface-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-1000"
                style={{ width: `${((profile?.xp || 0) % 1000) / 10}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Today's Habits Section */}
        <section className="px-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Today's Habits
            </h2>
            <Link
              to="/app/habits"
              className="text-accent font-bold text-sm hover:underline"
            >
              View all
            </Link>
          </div>

          {loadingHabits ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-accent/50" />
            </div>
          ) : habits.length > 0 ? (
            habits.map((habit) => {
              const today = new Date().toISOString().split("T")[0];
              const isCompleted = habit.completedDates?.includes(today);
              return (
                <div
                  key={habit.id}
                  className="bg-white dark:bg-surface-950 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-800 flex items-center justify-between shadow-[4px_4px_0_0_rgba(90,90,246,0.2)]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${habit.type === "boolean" ? "bg-orange-50 dark:bg-orange-900/30 text-orange-500" : "bg-blue-50 dark:bg-blue-900/30 text-blue-500"} rounded-lg flex items-center justify-center`}
                    >
                      {habit.type === "boolean" ? (
                        <Activity className="w-8 h-8" />
                      ) : (
                        <Droplets className="w-8 h-8" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        {habit.name}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Target: {habit.frequency} per week
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCompleteHabit(habit)}
                    disabled={isCompleted}
                    className={`w-12 h-12 rounded-full border-4 ${isCompleted ? "bg-accent text-white border-accent" : "border-surface-200 dark:border-surface-700 text-slate-300 dark:text-slate-600 hover:border-accent/50"} flex items-center justify-center transition-all`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" strokeWidth={3} />
                    ) : (
                      <Plus className="w-6 h-6" strokeWidth={3} />
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="bg-surface-50 dark:bg-surface-900/50 p-8 rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-center">
              <p className="text-slate-500 mb-4 italic">
                No habits for today. Ready to build a better version of
                yourself?
              </p>
              <Link
                to="/app/habits/new"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition"
              >
                <Plus className="w-5 h-5" />
                Add First Habit
              </Link>
            </div>
          )}
        </section>

        {/* Group Activity Section */}
        <section className="px-6 py-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Group Activity
          </h2>
          <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-5 border-2 border-dashed border-accent/30">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-900 overflow-hidden shrink-0">
                  <img
                    alt="Rahul's avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtRWJ3-bxjLcIb3Ivdk8eW_tHrxBzJW1DOX5gE4i0xczH0cQlboCRnhtaG4Jn6oNHwtNGHp4xEhj5CAyHFi9mJZAxwFBDKR7l3y9SyMvJbIQ-BZwkcFtvaKUtOEUdUtkFcHfV6VINHyV7lRg9A5BJpQXEm1DJrea8wEaM7VdAnbw14PaWLRal_4ujJosKooQQXmafDeiFqkblOv1mGCeVEBu1iKVK9DcA7zTZuZjrMI5AZypgIb6eVGbznnGkqFz4lbeOF5D0mNiA"
                  />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Rahul
                  </span>{" "}
                  completed{" "}
                  <span className="text-accent font-medium">Workout</span>
                </p>
                <span className="text-[10px] text-slate-400">2m ago</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-900 overflow-hidden shrink-0">
                  <img
                    alt="Priya's avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg0WsE7yYkLymtupmZgKZzCoTVdla7Uy0cjhj7hgk5XmtZfx8V4R7WqGi2eaXjPoBZMBwT2JlNSLKCsDTahp1sjPlTlWMenHRyIt_2QhEW4qDCNnNcjpEkqpLqZAJYlWzfsRxnYj8li2vDhFG7qKn5gRtwnqdEzdbXBBhP1BhedNKGSp8eQ5daRXydkAXDflXX_8eq9q66EIYXsdwrzA3Pl-evCbrOe94HvMPRDVrl6o1sURGFMDAtuGZ8OCc0nL04hfy-phnyiZc"
                  />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Priya
                  </span>{" "}
                  completed{" "}
                  <span className="text-accent font-medium">Meditation</span>
                </p>
                <span className="text-[10px] text-slate-400">15m ago</span>
              </li>
            </ul>
            <button className="w-full mt-4 py-2 text-accent font-bold text-sm bg-white dark:bg-surface-900 rounded-lg shadow-sm border border-accent/20 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition">
              High Five the Group!
            </button>
          </div>
        </section>

        {/* Note: the app layout provides the bottom navigation, so we only handle scrolling content here */}
      </div>
    </div>
  );
}
