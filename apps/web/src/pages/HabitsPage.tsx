import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { habitService, Habit } from "../services/firestoreService";
import {
  Plus,
  CheckCircle,
  Bell,
  User,
  Loader2,
  Activity,
  Droplets,
  BookOpen,
  Check,
} from "lucide-react";

export default function HabitsPage() {
  const { profile, loading: authLoading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Daily");

  useEffect(() => {
    if (profile?.uid) {
      const fetchHabits = async () => {
        try {
          const userHabits = await habitService.getUserHabits(profile.uid);
          setHabits(userHabits);
        } catch (error) {
          console.error("Error fetching habits:", error);
        } finally {
          setLoading(false);
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

  if (authLoading || loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  const tabs = ["Daily", "Weekly", "Custom", "One Time"];

  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-accent/10 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent/20 overflow-hidden">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-accent w-5 h-5" />
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">My Journey</h1>
              <p className="text-xs text-slate-500 font-medium">
                Level {Math.floor((profile?.xp || 0) / 1000) + 1} •{" "}
                {profile?.xp || 0} XP
              </p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/5 transition-colors text-slate-600 dark:text-slate-400">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="bg-white dark:bg-background-dark px-4 pt-4 sticky top-[72px] z-10 border-b border-accent/5">
        <div className="max-w-md mx-auto flex gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center pb-3 border-b-4 transition-all ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-slate-500 hover:border-accent/30"
              }`}
            >
              <span
                className={`text-sm font-bold ${activeTab === tab ? "" : "font-medium"}`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4 pb-24">
        {habits.length > 0 ? (
          habits.map((habit) => {
            const today = new Date().toISOString().split("T")[0];
            const isCompleted = habit.completedDates?.includes(today);

            return (
              <div
                key={habit.id}
                className="bg-white dark:bg-surface-950 rounded-xl p-5 shadow-sm border border-accent/5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden border ${
                        habit.type === "boolean"
                          ? "bg-orange-50 border-orange-100 text-orange-500"
                          : "bg-blue-50 border-blue-100 text-blue-500"
                      }`}
                    >
                      {habit.name.toLowerCase().includes("water") ? (
                        <Droplets className="w-10 h-10" />
                      ) : habit.name.toLowerCase().includes("read") ? (
                        <BookOpen className="w-10 h-10" />
                      ) : (
                        <Activity className="w-10 h-10" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            habit.groupId
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {habit.groupId ? "Group Habit" : "Personal"}
                        </span>
                        <span className="text-[10px] font-bold text-accent">
                          +{habit.xpReward} XP
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mt-0.5">{habit.name}</h3>
                      <p className="text-sm text-slate-500">
                        Target: {habit.frequency} per week
                      </p>
                    </div>
                  </div>

                  {/* Progress Circle Mockup */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 -rotate-90">
                      <circle
                        className="text-slate-100 dark:text-slate-800"
                        cx="24"
                        cy="24"
                        fill="transparent"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <circle
                        className={
                          isCompleted ? "text-emerald-400" : "text-accent"
                        }
                        cx="24"
                        cy="24"
                        fill="transparent"
                        r="20"
                        stroke="currentColor"
                        strokeDasharray="125.6"
                        strokeDashoffset={isCompleted ? "0" : "125.6"}
                        strokeWidth="4"
                      ></circle>
                    </svg>
                    <span className="absolute text-[10px] font-bold">
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        "0%"
                      )}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCompleteHabit(habit)}
                  disabled={isCompleted}
                  className={`w-full font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isCompleted
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-none cursor-default"
                      : "bg-accent text-white hover:opacity-90 shadow-accent/20"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Task Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 opacity-50" />
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-surface-950 rounded-2xl p-8 border-2 border-dashed border-surface-200 dark:border-surface-800 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-accent opacity-40" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Habits Yet</h3>
            <p className="text-slate-500 mb-6 max-w-xs">
              Start your journey today by creating your first healthy habit!
            </p>
            <Link
              to="/app/habits/new"
              className="bg-accent text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-accent/30 hover:scale-105 transition-all"
            >
              Create New Habit
            </Link>
          </div>
        )}

        {/* Add New Habit Float Button */}
        <Link
          to="/app/habits/new"
          className="fixed bottom-24 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 z-20 hover:scale-110 active:scale-95 transition-all outline-none"
        >
          <Plus className="w-8 h-8" />
        </Link>
      </main>
    </div>
  );
}
