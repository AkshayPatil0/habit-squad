export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Extracted from habits_screen_light.html */}
      
{/*  Header  */}
<header className="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4">
<div className="max-w-md mx-auto flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
<span className="material-symbols-outlined text-primary">person</span>
</div>
<div>
<h1 className="text-lg font-bold leading-none">My Journey</h1>
<p className="text-xs text-slate-500 font-medium">Level 14 • 1,240 XP</p>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 transition-colors">
<span className="material-symbols-outlined text-slate-600">notifications</span>
</button>
</div>
</header>
{/*  Tabs Navigation  */}
<nav className="bg-white dark:bg-background-dark px-4 pt-4 sticky top-[72px] z-10 border-b border-primary/5">
<div className="max-w-md mx-auto flex gap-6 overflow-x-auto no-scrollbar">
<a className="flex flex-col items-center pb-3 border-b-4 border-primary group" href="#">
<span className="text-sm font-bold text-primary">Daily</span>
</a>
<a className="flex flex-col items-center pb-3 border-b-4 border-transparent hover:border-primary/30 transition-all" href="#">
<span className="text-sm font-medium text-slate-500 group-hover:text-primary">Weekly</span>
</a>
<a className="flex flex-col items-center pb-3 border-b-4 border-transparent hover:border-primary/30 transition-all" href="#">
<span className="text-sm font-medium text-slate-500 group-hover:text-primary">Custom</span>
</a>
<a className="flex flex-col items-center pb-3 border-b-4 border-transparent hover:border-primary/30 transition-all" href="#">
<span className="text-sm font-medium text-slate-500 group-hover:text-primary">One Time</span>
</a>
</div>
</nav>
{/*  Main Content  */}
<main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4 pb-24">
{/*  Habit Card 1  */}
<div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-primary/5 flex flex-col gap-4">
<div className="flex items-start justify-between">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
<img alt="Cartoon water bottle illustration" className="w-12 h-12 object-contain" data-alt="Playful cartoon water bottle drinking character" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYNsKWCDc_IHSubmG2Cw_fp_FEQxC7kN1bgLDZ-uUzImc-m8vDPgrCPV43B9MmGRzhgU80Fh9eZMNyd_VBl2-I-iN4jsOtlulcUWdfXTcVtUNUZIVl0PFKHODsOtfn9FNAjxPKHdzc32udQv-4vMCQBvNDa-K8rCOtOmINQlpoKWb-iSm1fWb4GZquDISULXL1aqzOVxxHoLCclAMroPNraKKbZMrZb--FGoxkiQiJHFL53zUK6wK0Vm-gNCs2YQKJH6F4tfOZjOY"/>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">Personal</span>
<span className="text-[10px] font-bold text-primary">+50 XP</span>
</div>
<h3 className="text-lg font-bold mt-0.5">Hydration King</h3>
<p className="text-sm text-slate-500">8 of 10 glasses today</p>
</div>
</div>
{/*  Progress Circle  */}
<div className="relative w-12 h-12 flex items-center justify-center">
<svg className="w-12 h-12 -rotate-90">
<circle className="text-slate-100 dark:text-slate-800" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
<circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="25.1" strokeWidth="4"></circle>
</svg>
<span className="absolute text-[10px] font-bold">80%</span>
</div>
</div>
<button className="w-full bg-primary text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">check_circle</span>
                Check 1 Glass
            </button>
</div>
{/*  Habit Card 2 (Group)  */}
<div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-primary/5 flex flex-col gap-4">
<div className="flex items-start justify-between">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-orange-50 flex items-center justify-center overflow-hidden border border-orange-100">
<img alt="Cartoon running shoe illustration" className="w-12 h-12 object-contain" data-alt="Playful cartoon orange running shoe with wings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu3HE0KGuDSFK3N5JR4nxwTivTW8_lHFrdQGO3Aub0cMBSa-tJE2xu2_CCEl-m5duGMbajKA23cHSqfhJ_FdWdah5MBWELBgOeGC7dxLgb5pQo-ZINnKvlN9VSRilxezdNkSz9z7Gb7R5xag6XwsV90-6v7DhLGhBkCbVYxJtjcxNegcHAvsxGDn2IX9Raevfm5u73bThSif1TyzjT3YID9Ii5-HVHZyG_hJkC1zds4cOTzV99hSsilhKEWTflJDjTxHwi6DCIV00"/>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">Group Habit</span>
<span className="text-[10px] font-bold text-primary">+150 XP</span>
</div>
<h3 className="text-lg font-bold mt-0.5">Morning Sprint</h3>
<p className="text-sm text-slate-500">Target: 30 min run</p>
</div>
</div>
{/*  Progress Circle  */}
<div className="relative w-12 h-12 flex items-center justify-center">
<svg className="w-12 h-12 -rotate-90">
<circle className="text-slate-100 dark:text-slate-800" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
<circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="125.6" strokeWidth="4"></circle>
</svg>
<span className="absolute text-[10px] font-bold">0%</span>
</div>
</div>
<div className="flex items-center gap-2 px-1">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
<img alt="Member" data-alt="Small avatar of a smiling group member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJBXPTW21bKaY-RJa1eDqkhhJC23aFAvAq1PXwJs5PL7oMdmIx29uWuUNizwUZw3X3J13NyXf8uLx09U_OrpeTOECX_x9GDnibjsIwE9lZGFxjdXYP8jXFbTZ-OaY3MtQ8QgdAaTIk9DfiG7XlqL4l1nRPMfYafDaWSuI_kIkcjiMBX2Byq5w2io4TCynYc3bdRGXJIRDDOCJFNGqdyRlaeH_LRCRDQxiMJWBRSIFSWQigVnBHeL8PJi-pRvLqspOCAuTQgCBzflI"/>
</div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
<img alt="Member" data-alt="Small avatar of another group member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEkJbBrtXL8n57lcoFSmO8voJQ0hcZIgWMmE6RF2A26Z2EJu1-_Zr7B9LX7FhyzeX7zxXRxOhtPazXKwK7z3zU3DCIF6mHv7Cpc56B1VFVe5CdRzJwEIuu_GLJ1sEM1XEsS1vbQdL16v9lJBrvVvFYXqDixOKcGcw5mfmHODAqhMqax5zH9aSU2jP6-4PwWFUJPip1QpSSRDDu69SrKHmLejPDNcLbjYRbJx1cofvrG9AzKvdqTaKkqbKHaHGmtOjRQffyXoP2MPw"/>
</div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[8px] text-white font-bold">
                        +4
                    </div>
</div>
<span className="text-[10px] text-slate-400 font-medium">6 friends active today</span>
</div>
<button className="w-full bg-background-light dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors border border-primary/10">
<span className="material-symbols-outlined">directions_run</span>
                Complete Run
            </button>
</div>
{/*  Habit Card 3  */}
<div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-primary/5 flex flex-col gap-4">
<div className="flex items-start justify-between">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center overflow-hidden border border-emerald-100">
<img alt="Cartoon book illustration" className="w-12 h-12 object-contain" data-alt="Playful green book character with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuik-i-FQGmdXRta8c3fYDODP44fYR-iaHHvsAMfRJzf3IG4UFp4yf_OHJ-siXYiiKSCCMsBICHWYG0Xv9yBqC8rFNfLdjNHqEhdjiGBqDcSq5A7gJecu8t7VcwmopI1bcfbcUfigLI1vt_K2jfB6q0NpB7nPPzCDa_mQOnmi3eKyrYB7MnUKmyjo-lJZmvuBKLaBJRAp4phM2jZm2QJ1FBh62_yFAoVa6djzsz-rGsZToN8Ybb6g9q-l7wXOljlB-BeD8xFAdOpw"/>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Personal</span>
<span className="text-[10px] font-bold text-primary">+80 XP</span>
</div>
<h3 className="text-lg font-bold mt-0.5">Mindful Reading</h3>
<p className="text-sm text-slate-500">15 min reading session</p>
</div>
</div>
{/*  Progress Circle  */}
<div className="relative w-12 h-12 flex items-center justify-center">
<svg className="w-12 h-12 -rotate-90">
<circle className="text-slate-100 dark:text-slate-800" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
<circle className="text-emerald-400" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="0" strokeWidth="4"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-emerald-600">
<span className="material-symbols-outlined text-sm">done</span>
</span>
</div>
</div>
<button className="w-full bg-emerald-500/10 text-emerald-600 font-bold py-3 rounded-full flex items-center justify-center gap-2 cursor-default border border-emerald-500/20">
<span className="material-symbols-outlined">verified</span>
                Task Completed
            </button>
</div>
{/*  Add New Habit Float Button  */}
<button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 z-20">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</main>
{/*  Bottom Navigation Bar  */}
<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-primary/5 px-4 pb-8 pt-2">
<div className="max-w-md mx-auto flex justify-between">
<a className="flex flex-col items-center gap-1 flex-1 py-1" href="#">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
<span className="text-[10px] font-bold text-primary">Habits</span>
</a>
<a className="flex flex-col items-center gap-1 flex-1 py-1 group" href="#">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">bar_chart</span>
<span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Stats</span>
</a>
<a className="flex flex-col items-center gap-1 flex-1 py-1 group" href="#">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">group</span>
<span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Social</span>
</a>
<a className="flex flex-col items-center gap-1 flex-1 py-1 group" href="#">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">person</span>
<span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Profile</span>
</a>
</div>
</nav>


    </div>
  );
}
