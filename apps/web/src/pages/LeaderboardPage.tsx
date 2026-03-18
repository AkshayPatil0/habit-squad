import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService, UserProfile } from "../services/firestoreService";
import {
  ArrowLeft,
  Share2,
  Trophy,
  Flame,
  Coins,
  Home,
  BookOpen,
  User,
  Loader2,
} from "lucide-react";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Weekly");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const topUsers = await userService.getTopUsers(50);
        setUsers(topUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3);
  const myRank = users.findIndex((u) => u.uid === profile?.uid) + 1;

  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <div className="relative flex h-auto min-h-dvh w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark overflow-x-hidden border-x border-accent/10">
        {/* Header */}
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-center hover:bg-accent/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-widest flex-1 text-center uppercase">
            Leaderboard
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-full h-12 w-12 bg-transparent text-slate-900 dark:text-slate-100 hover:bg-accent/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="pb-3 px-4">
          <div className="flex bg-accent/5 rounded-xl p-1 justify-between">
            {["Daily", "Weekly", "All Time"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center justify-center rounded-lg py-2 px-4 flex-1 transition-all font-bold text-sm ${
                  activeTab === tab
                    ? "bg-white dark:bg-surface-900 shadow-sm text-accent"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Section */}
        <div className="flex items-end justify-center gap-2 px-4 pt-12 pb-6">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-2">
                <div className="w-16 h-16 rounded-full border-4 border-surface-300 overflow-hidden bg-white shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                  />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-surface-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  2ND
                </div>
              </div>
              <div className="w-full bg-white dark:bg-surface-900 rounded-t-xl h-24 flex flex-col items-center justify-center border-x border-t border-accent/5 shadow-sm">
                <p className="font-bold text-xs truncate w-full text-center px-1">
                  {topThree[1].name}
                </p>
                <p className="text-accent text-xs font-black">
                  {topThree[1].xp} XP
                </p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="relative mb-2 -mt-8">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-500 animate-bounce">
                  <Trophy className="w-8 h-8 fill-amber-500" />
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-amber-400 overflow-hidden bg-white shadow-xl ring-4 ring-amber-400/20">
                  <img
                    className="w-full h-full object-cover"
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                  />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                  1ST
                </div>
              </div>
              <div className="w-full bg-accent/10 dark:bg-accent/20 rounded-t-xl h-32 flex flex-col items-center justify-center border-x border-t border-accent/10 shadow-md">
                <p className="font-bold text-sm truncate w-full text-center px-1">
                  {topThree[0].name}
                </p>
                <p className="text-accent text-sm font-black">
                  {topThree[0].xp} XP
                </p>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-2">
                <div className="w-16 h-16 rounded-full border-4 border-amber-700/50 overflow-hidden bg-white shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                  />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  3RD
                </div>
              </div>
              <div className="w-full bg-white dark:bg-surface-900 rounded-t-xl h-20 flex flex-col items-center justify-center border-x border-t border-accent/5 shadow-sm">
                <p className="font-bold text-xs truncate w-full text-center px-1">
                  {topThree[2].name}
                </p>
                <p className="text-accent text-xs font-black">
                  {topThree[2].xp} XP
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Your Stats Card */}
        {profile && (
          <div className="px-4 mb-4">
            <div className="bg-accent text-white rounded-xl p-4 flex items-center justify-between shadow-lg shadow-accent/30">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm">
                  {myRank > 0 ? myRank : "-"}
                </div>
                <div>
                  <p className="text-[10px] opacity-80 font-black uppercase tracking-tight">
                    Your Ranking
                  </p>
                  <p className="font-bold">{profile.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-80 font-black uppercase tracking-tight">
                  Points
                </p>
                <p className="font-bold">{profile.xp} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Rank List */}
        <div className="flex-1 px-4 space-y-3 pb-24">
          {remainingUsers.map((user, index) => (
            <div
              key={user.uid}
              className="flex items-center gap-3 p-3 bg-white dark:bg-surface-900 rounded-xl border border-accent/5 shadow-sm hover:border-accent/20 transition-all"
            >
              <span className="text-slate-400 font-black w-6 text-center text-xs">
                {index + 4}
              </span>
              <img
                className="w-10 h-10 rounded-full bg-accent/10 object-cover"
                src={user.avatar}
                alt={user.name}
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{user.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />{" "}
                    12d
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5">
                    <Coins className="w-3 h-3 text-amber-500" /> {user.coins}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-accent font-black text-sm">{user.xp}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">
                  XP
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex gap-2 border-t border-accent/10 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md px-4 pb-4 pt-2">
          <Link
            to="/app"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <Home className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal">Home</p>
          </Link>
          <Link
            to="/app/habits"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <BookOpen className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal">Habits</p>
          </Link>
          <Link
            to="/app/leaderboard"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-accent"
          >
            <Trophy className="w-6 h-6 fill-accent" />
            <p className="text-[10px] font-bold leading-normal">Leaderboard</p>
          </Link>
          <Link
            to="/app/profile"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <User className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal">Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
