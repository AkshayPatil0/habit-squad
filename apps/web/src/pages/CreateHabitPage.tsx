import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { habitService } from "../services/firestoreService";
import {
  X,
  Rocket,
  Bolt,
  Dumbbell,
  Book,
  Zap,
  Coins,
  Trophy,
  Loader2,
} from "lucide-react";

export default function CreateHabitPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("New Habit");
  const [type] = useState<"boolean" | "numeric">("boolean");
  const [frequency, setFrequency] = useState(7);
  const [xpReward, setXpReward] = useState(50);
  const [coinReward, setCoinReward] = useState(15);
  const [isGroup, setIsGroup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!profile?.uid) return;
    setLoading(true);
    try {
      await habitService.createHabit({
        name,
        type,
        frequency,
        xpReward,
        coinReward,
        groupId: isGroup ? "placeholder-group-id" : null, // Group logic to be refined
        userId: profile.uid,
      });
      navigate("/app/habits");
    } catch (error) {
      console.error("Error creating habit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <div className="relative flex h-auto min-h-dvh w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center bg-white dark:bg-surface-950 p-4 pb-4 justify-between border-b border-accent/10 sticky top-0 z-10">
          <button
            onClick={() => navigate("/app/habits")}
            className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-center bg-accent/10 rounded-full cursor-pointer hover:bg-accent/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-tight flex-1 text-center">
            New Quest
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button
              onClick={handleSave}
              disabled={loading || !name}
              className="bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg shadow-accent/30 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full p-4 space-y-8">
          {/* Preview Section */}
          <section className="bg-accent/5 border-2 border-accent/20 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
            <h3 className="text-accent text-xs font-black uppercase tracking-widest mb-4">
              Preview Card
            </h3>
            <div className="bg-white dark:bg-surface-900 p-5 rounded-xl border-b-4 border-surface-200 dark:border-surface-700 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg">
                <Bolt className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">
                  {isGroup ? "Group Challenge" : "Personal Habit"}
                </p>
                <h4 className="text-slate-900 dark:text-slate-100 text-lg font-bold">
                  {name || "Habit Name"}
                </h4>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Coins className="w-4 h-4" />
                  <span>+{coinReward}</span>
                </div>
                <div className="text-accent text-xs font-black">
                  +{xpReward} XP
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {/* Habit Name */}
            <div>
              <label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">
                Habit Name
              </label>
              <input
                className="w-full rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 p-4 text-lg focus:border-accent focus:ring-0 transition-all outline-none"
                placeholder="e.g., Morning Meditation"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Icon Picker Mockup */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-slate-900 dark:text-slate-100 text-lg font-bold">
                  Choose Icon
                </label>
                <span className="text-accent font-bold text-sm bg-accent/10 px-3 py-1 rounded-full">
                  See All
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-accent bg-accent/5 text-accent shadow-inner">
                  <Bolt className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-surface-100 bg-white dark:bg-surface-900 dark:border-surface-700 text-slate-400 hover:border-accent/50 transition-colors">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-surface-100 bg-white dark:bg-surface-900 dark:border-surface-700 text-slate-400 hover:border-accent/50 transition-colors">
                  <Book className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-surface-100 bg-white dark:bg-surface-900 dark:border-surface-700 text-slate-400 hover:border-accent/50 transition-colors">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Habit Type / Frequency */}
            <div>
              <label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">
                Frequency
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 3, 5, 7].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`flex-1 min-w-[80px] py-3 rounded-xl font-bold transition-all ${
                      frequency === f
                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                        : "bg-white dark:bg-surface-900 border-2 border-surface-100 dark:border-surface-700 text-slate-500"
                    }`}
                  >
                    {f === 7 ? "Daily" : `${f}x / week`}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Habit Toggle */}
            <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Group Habit
                </p>
                <p className="text-xs text-slate-500">
                  Challenge friends to join you
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={isGroup}
                  onChange={(e) => setIsGroup(e.target.checked)}
                />
                <div className="w-14 h-8 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:inset-s-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            {/* Rewards Sliders */}
            <div className="space-y-6 pt-4">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Experience Points (XP)
                  </label>
                  <span className="font-black text-accent bg-accent/10 px-3 py-1 rounded-lg">
                    {xpReward} XP
                  </span>
                </div>
                <input
                  className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-accent"
                  max="200"
                  min="10"
                  step="10"
                  type="range"
                  value={xpReward}
                  onChange={(e) => setXpReward(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    Coin Reward
                  </label>
                  <span className="font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                    {coinReward} Coins
                  </span>
                </div>
                <input
                  className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  max="100"
                  min="5"
                  step="5"
                  type="range"
                  value={coinReward}
                  onChange={(e) => setCoinReward(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 pb-12">
            <button
              onClick={handleSave}
              disabled={loading || !name}
              className="w-full bg-surface-950 dark:bg-white dark:text-slate-900 text-white py-5 rounded-xl text-xl font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Rocket className="w-6 h-6" />
                  Start Habit Journey
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
