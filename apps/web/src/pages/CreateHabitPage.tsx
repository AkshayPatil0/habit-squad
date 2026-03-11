export default function CreateHabitPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Extracted from create_habit_light.html */}
      
<div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
<div className="flex items-center bg-white dark:bg-slate-900 p-4 pb-4 justify-between border-b border-primary/10 sticky top-0 z-10">
<div className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-center bg-primary/10 rounded-full cursor-pointer">
<span className="material-symbols-outlined">close</span>
</div>
<h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-tight flex-1 text-center">New Quest</h2>
<div className="flex w-12 items-center justify-end">
<button className="bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/30">Save</button>
</div>
</div>
<div className="max-w-2xl mx-auto w-full p-4 space-y-8">
<section className="bg-primary/5 border-2 border-primary/20 p-6 rounded-xl relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
<h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">Preview Card</h3>
<div className="bg-white dark:bg-slate-800 p-5 rounded-xl border-b-4 border-slate-200 dark:border-slate-700 flex items-center gap-4 shadow-sm">
<div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-3xl">bolt</span>
</div>
<div className="flex-1">
<p className="text-slate-400 text-xs font-bold uppercase tracking-tight">Morning Routine</p>
<h4 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Cold Shower</h4>
</div>
<div className="text-right">
<div className="flex items-center gap-1 text-amber-500 font-bold">
<span className="material-symbols-outlined text-sm">monetization_on</span>
<span>+15</span>
</div>
<div className="text-primary text-xs font-black">+50 XP</div>
</div>
</div>
</section>
<div className="space-y-6">
<div>
<label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">Habit Name</label>
<input className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-lg focus:border-primary focus:ring-0 transition-all outline-none" placeholder="e.g., Morning Meditation" value="Cold Shower"/>
</div>
<div>
<div className="flex items-center justify-between mb-3">
<label className="text-slate-900 dark:text-slate-100 text-lg font-bold">Choose Icon</label>
<span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">See All</span>
</div>
<div className="grid grid-cols-4 gap-3">
<div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-primary bg-primary/5 text-primary shadow-inner">
<span className="material-symbols-outlined text-3xl">bolt</span>
</div>
<div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-400 hover:border-primary/50 transition-colors">
<span className="material-symbols-outlined text-3xl">fitness_center</span>
</div>
<div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-400 hover:border-primary/50 transition-colors">
<span className="material-symbols-outlined text-3xl">auto_stories</span>
</div>
<div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-400 hover:border-primary/50 transition-colors">
<span className="material-symbols-outlined text-3xl">self_improvement</span>
</div>
</div>
</div>
<div>
<label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">Habit Type</label>
<div className="flex flex-wrap gap-2">
<button className="flex-1 min-w-[100px] bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Daily</button>
<button className="flex-1 min-w-[100px] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-3 rounded-xl font-bold text-slate-500">Weekly</button>
<button className="flex-1 min-w-[100px] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-3 rounded-xl font-bold text-slate-500 text-sm flex items-center justify-center gap-1">3x / week</button>
</div>
</div>
<div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-between">
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Group Habit</p>
<p className="text-xs text-slate-500">Challenge friends to join you</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="space-y-6 pt-4">
<div>
<div className="flex justify-between items-center mb-4">
<label className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary">military_tech</span>
                                Experience Points (XP)
                            </label>
<span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">50 XP</span>
</div>
<input className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" max="200" min="10" type="range" value="50"/>
</div>
<div>
<div className="flex justify-between items-center mb-4">
<label className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-amber-500">monetization_on</span>
                                Coin Reward
                            </label>
<span className="font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">15 Coins</span>
</div>
<input className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" max="100" min="5" type="range" value="15"/>
</div>
</div>
</div>
<div className="pt-8 pb-12">
<button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-xl text-xl font-black shadow-xl flex items-center justify-center gap-3">
<span className="material-symbols-outlined">rocket_launch</span>
                    Start Habit Journey
                </button>
</div>
</div>
</div>

    </div>
  );
}
