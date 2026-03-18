import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Settings,
  Share2,
  Trophy,
  Coins,
  Flame,
  LogOut,
  Shield,
  BadgeCheck,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  const level = Math.floor((profile?.xp || 0) / 1000) + 1;
  const xpInLevel = (profile?.xp || 0) % 1000;
  const progressPercent = (xpInLevel / 1000) * 100;

  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <div className="max-w-md mx-auto bg-white dark:bg-background-dark min-h-dvh flex flex-col relative overflow-hidden">
        <header className="flex items-center justify-between p-6 pb-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-100 dark:bg-surface-900 text-slate-700 dark:text-slate-200 hover:bg-surface-200 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Profile</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-100 dark:bg-surface-900 text-slate-700 dark:text-slate-200 hover:bg-surface-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-24">
          <section className="flex flex-col items-center py-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-accent p-1 bg-white dark:bg-surface-900 shadow-xl">
                <img
                  alt={`${profile?.name}'s avatar`}
                  className="w-full h-full rounded-full object-cover"
                  src={
                    profile?.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder"
                  }
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-lg">
                LVL {level}
              </div>
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {profile?.name || "Explorer"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                XP: {profile?.xp || 0} / {level * 1000}
              </p>
            </div>
            <div className="w-full mt-4 bg-surface-100 dark:bg-surface-900 h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-accent h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(90,90,246,0.5)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-accent/10 dark:bg-accent/20 p-5 rounded-2xl flex items-center justify-between border-2 border-accent/20 shadow-sm">
              <div>
                <p className="text-accent font-black text-xs uppercase tracking-widest">
                  Coin Balance
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {profile?.coins || 0}
                  </span>
                  <Coins className="text-amber-500 w-6 h-6" />
                </div>
              </div>
              <button className="bg-accent text-white px-6 py-2 rounded-xl font-black text-sm shadow-lg shadow-accent/25 hover:scale-105 transition-all">
                Shop
              </button>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 flex flex-col items-center text-center shadow-sm">
              <CheckCircle2 className="text-accent w-6 h-6 mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Total
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                152
              </p>
            </div>
            <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 flex flex-col items-center text-center shadow-sm">
              <Flame className="text-orange-500 w-6 h-6 mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Streak
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                21d
              </p>
            </div>
            <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 flex flex-col items-center text-center shadow-sm">
              <Trophy className="text-amber-500 w-6 h-6 mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Rank
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                #4
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Badge Collection
              </h3>
              <button className="text-accent font-bold text-sm hover:underline">
                View All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              <div className="flex-shrink-0 w-24 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border-4 border-white dark:border-surface-800 shadow-lg mb-2">
                  <Shield className="text-orange-500 w-10 h-10 fill-orange-500/20" />
                </div>
                <p className="text-[10px] font-black text-center text-slate-700 dark:text-slate-400 uppercase leading-tight">
                  7 Day Streak
                </p>
              </div>
              <div className="flex-shrink-0 w-24 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-4 border-white dark:border-surface-800 shadow-lg mb-2">
                  <BadgeCheck className="text-blue-500 w-10 h-10 fill-blue-500/20" />
                </div>
                <p className="text-[10px] font-black text-center text-slate-700 dark:text-slate-400 uppercase leading-tight">
                  Habit Master
                </p>
              </div>
              <div className="flex-shrink-0 w-24 flex flex-col items-center opacity-40 grayscale">
                <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-900 flex items-center justify-center border-4 border-white dark:border-surface-800 mb-2">
                  <Lock className="text-slate-400 w-8 h-8" />
                </div>
                <p className="text-[10px] font-black text-center text-slate-700 dark:text-slate-400 uppercase leading-tight">
                  Early Bird
                </p>
              </div>
            </div>
          </section>

          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-xl border-2 border-red-500/20 text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </main>
      </div>
    </div>
  );
}
