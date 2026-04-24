import { useAuth } from "../context/AuthContext";
import { Flame, Loader2 } from "lucide-react";
import HabitsList from "@/components/Habit/HabitsList";

export default function HomePage() {
  const { profile, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const xp = profile?.xp || 0;

  return (
    <div className="w-full flex flex-col relative h-full overflow-y-scroll snap-y snap-mandatory">
      {/* Header Section */}
      <header className="p-4 space-y-4 snap-start snap-always shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent overflow-hidden">
              <img
                alt={`${profile?.name || "User"}'s avatar`}
                className="w-full h-full object-cover"
                src={profile?.avatar || "/avatars/avatar_1.svg"}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight capitalize text-slate-900 dark:text-slate-100">
                Hi, {profile?.name?.split(" ")[0] || "Friend"}
              </h1>
              <p className="text-accent font-semibold flex items-center gap-1">
                <Flame className="w-4 h-4" />
                Welcome back!
              </p>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-accent/10 dark:bg-gold-400/5 p-4 rounded-xl">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              Level {Math.floor(xp / 1000) + 1}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {xp % 1000} / 1000 XP
            </span>
          </div>
          <div className="h-3 w-full bg-surface-200 dark:bg-surface-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-400 rounded-full transition-all duration-1000 min-w-[4px]"
              style={{ width: `${(xp % 1000) / 10}%` }}
            ></div>
          </div>
        </div>
      </header>
      <div className="snap-start">
        <HabitsList />
      </div>
    </div>
  );
}
