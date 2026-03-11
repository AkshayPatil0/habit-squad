export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Extracted from leaderboard_light.html */}
      
<div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark overflow-x-hidden border-x border-primary/10">
{/*  Header  */}
<div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
<div className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer">
<span className="material-symbols-outlined">arrow_back</span>
</div>
<h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center uppercase tracking-widest">Leaderboard</h2>
<div className="flex w-12 items-center justify-end">
<button className="flex cursor-pointer items-center justify-center rounded-full h-12 bg-transparent text-slate-900 dark:text-slate-100 p-0">
<span className="material-symbols-outlined">share</span>
</button>
</div>
</div>
{/*  Tabs  */}
<div className="pb-3 px-4">
<div className="flex bg-primary/5 rounded-xl p-1 justify-between">
<a className="flex flex-col items-center justify-center rounded-lg text-slate-500 py-2 px-4 flex-1 transition-all" href="#">
<p className="text-sm font-bold">Daily</p>
</a>
<a className="flex flex-col items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm text-primary py-2 px-4 flex-1 transition-all" href="#">
<p className="text-sm font-bold">Weekly</p>
</a>
<a className="flex flex-col items-center justify-center rounded-lg text-slate-500 py-2 px-4 flex-1 transition-all" href="#">
<p className="text-sm font-bold">All Time</p>
</a>
</div>
</div>
{/*  Podium Section  */}
<div className="flex items-end justify-center gap-2 px-4 pt-12 pb-6">
{/*  2nd Place  */}
<div className="flex flex-col items-center flex-1">
<div className="relative mb-2">
<div className="w-16 h-16 rounded-full border-4 border-silver overflow-hidden bg-white shadow-lg">
<img className="w-full h-full object-cover" data-alt="Cartoon avatar of a young man with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo1c-eg4BHL_Qqjj7cz9sxEECubop5ap-uGFR1mzlEELAvfmmmZQGuQ5NLnZUfWza6Vaa7rRkNNyAOnPHf6U1996KW3xunt5SRmcPBt2RjEoyvUQnGKXW4nxhZh1oKh9bEeacn7ZMkIs93deiDXRWKfP3rUjb9Ix07zoFYGSI0jNq6zFisqBUeH_SvPtX7Qcov9PA7Eb8SZ2TyomD6a0kiGTmC9nD7WXFug0S45Mc245VMowZwa57LA6G06WQJhWENgFPOikghaNQ"/>
</div>
<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-silver text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2ND</div>
</div>
<div className="w-full bg-white dark:bg-slate-800 rounded-t-xl h-24 flex flex-col items-center justify-center border-x border-t border-primary/5 shadow-sm">
<p className="font-bold text-sm">Alex</p>
<p className="text-primary text-xs font-bold">2,840 XP</p>
</div>
</div>
{/*  1st Place  */}
<div className="flex flex-col items-center flex-1 z-10">
<div className="relative mb-2 -mt-8">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold animate-bounce">
<span className="material-symbols-outlined" style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
</div>
<div className="w-20 h-20 rounded-full border-4 border-gold overflow-hidden bg-white shadow-xl ring-4 ring-gold/20">
<img className="w-full h-full object-cover" data-alt="Cartoon avatar of a smiling person with a crown" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASwsAzTgWm_GE__CHTx4rmU8iicBJxOWntN6biMn2r2fKQmTDEZjuspYVUZqv_JOK0rbUAsmz6LXs-_I4bzWNB5k-QnsJQXjuEa6OT8CELs13iSP8rx8ULpIkLWnEbnt05xE9nARW4ZYkr2CRxFJvAfRld6uP-sm_5xprZuEhfe9ulTyKGNtWllBgYPHbnXTZnnTiWWAdTDfoCd9-plD7xn6azFXxpsxUHPgoT9DZOMKAqjW14qllwQZGR3d2kaALquQ07BfnXsj8"/>
</div>
<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">1ST</div>
</div>
<div className="w-full bg-primary/10 dark:bg-primary/20 rounded-t-xl h-36 flex flex-col items-center justify-center border-x border-t border-primary/10 shadow-md">
<p className="font-bold text-base">Jordan</p>
<p className="text-primary text-sm font-black">3,150 XP</p>
</div>
</div>
{/*  3rd Place  */}
<div className="flex flex-col items-center flex-1">
<div className="relative mb-2">
<div className="w-16 h-16 rounded-full border-4 border-bronze overflow-hidden bg-white shadow-lg">
<img className="w-full h-full object-cover" data-alt="Cartoon avatar of a person with short hair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTb-EA8Bu-wgKkhLQRZddO4Yxvq0KvMBKjQzo6blDdNAuGAIWH6mR62xZKEjrdKVH7j9YsIbezOCHjLq4CpoL1i77u3Wi1Z_d5nQOoHFN6ZcG_g4yiarVEWZbHCa28jGT2pphR_4Ir05bnClPoazdWoRscC7JnXftJ_zcjRIRTnFaOAcUt8bvNADdm0mfrKLaxt_u6qiZIC6_TYiC__7k11yA4Ooe_m5R6sq_jBasyRa8q817PN3ufKrc5t6wjJ0VH7baty6R1Sf8"/>
</div>
<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bronze text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3RD</div>
</div>
<div className="w-full bg-white dark:bg-slate-800 rounded-t-xl h-20 flex flex-col items-center justify-center border-x border-t border-primary/5 shadow-sm">
<p className="font-bold text-sm">Taylor</p>
<p className="text-primary text-xs font-bold">2,420 XP</p>
</div>
</div>
</div>
{/*  Your Stats Card  */}
<div className="px-4 mb-4">
<div className="bg-primary text-white rounded-xl p-4 flex items-center justify-between shadow-lg shadow-primary/30">
<div className="flex items-center gap-3">
<div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">14</div>
<div>
<p className="text-xs opacity-80 font-medium">Your Ranking</p>
<p className="font-bold">Sam Wilson</p>
</div>
</div>
<div className="text-right">
<p className="text-xs opacity-80 font-medium">Points</p>
<p className="font-bold">1,890 XP</p>
</div>
</div>
</div>
{/*  Rank List  */}
<div className="flex-1 px-4 space-y-3 pb-24">
{/*  User Row 4  */}
<div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 shadow-sm hover:border-primary/20 transition-all">
<span className="text-slate-400 font-bold w-6 text-center">4</span>
<img className="w-10 h-10 rounded-full bg-primary/10" data-alt="Portrait of Riley" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClcEHTFxNthoNOURW1_sHnoY-mFMG69VF-EXYo53IoJsbeAAWqmnk1m9fqb08Adtb5HnNMzlkw9hv7ePyIkTq2E8Uxl6xa_JJLzMtHY1Y-ABSLGqkZAOBI0XV-GjWHsmxprhSmtKLRAul03gQ6_eMT8gOLgr1q7G9GvOaF_dQfN8l1w-QU89Up4w7f6a--GSSMY5vAFMzpM5-4tvu047vQwUI2naKRLok2jEDHF8F37xz6_tNiSvvhq8tLPM1LKp3FoC0vhQd6u7M"/>
<div className="flex-1 min-w-0">
<p className="font-bold text-sm truncate">Riley James</p>
<div className="flex items-center gap-2">
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span> 12d</span>
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-gold" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span> 420</span>
</div>
</div>
<div className="text-right">
<p className="text-primary font-bold text-sm">2,100</p>
<p className="text-[10px] text-slate-400">XP</p>
</div>
</div>
{/*  User Row 5  */}
<div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 shadow-sm">
<span className="text-slate-400 font-bold w-6 text-center">5</span>
<img className="w-10 h-10 rounded-full bg-primary/10" data-alt="Portrait of Casey" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9p3HorKKVxfh3O1LCcpc6ReyOxIdiF4pHjotdB0MxAWbjCrzW3S8OqXlL0dT8YFFRMmuL03u5ws17id0rQJ6lX-HKjd-XwC7rSuw_Qq4RWZYljXJj0lCXXtgY-aP8f22H7AiehchAF1th8Cup6H2B8jK_GPOiouti1lta_htXaCnyGDEgY2D5Fp_fo4ECtaciCLo-Dz0BaAGu-heBMRlVuI5BWzZKirxVsYCuBxwQ1hRyROcvVEKVx01Se4YEcu7qxQaNdv70hus"/>
<div className="flex-1 min-w-0">
<p className="font-bold text-sm truncate">Casey Morgan</p>
<div className="flex items-center gap-2">
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span> 8d</span>
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-gold" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span> 150</span>
</div>
</div>
<div className="text-right">
<p className="text-primary font-bold text-sm">1,950</p>
<p className="text-[10px] text-slate-400">XP</p>
</div>
</div>
{/*  User Row 6  */}
<div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 shadow-sm">
<span className="text-slate-400 font-bold w-6 text-center">6</span>
<img className="w-10 h-10 rounded-full bg-primary/10" data-alt="Portrait of Jamie" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNdos2cMWeBfzmewZGdqF0vUQma4sWGBxDPpqBLleChfk9gQlXEWlpq2nKOWaWCt56un30P5nlcN4dGd-SGpngCyZzjDZhCdZRqYvp0U3wM9WALpzV1eTHBWXGZJAYfO9ce_SU3X9DL2RdpuynwiYZkOjmuLx9jCyXd0wDBOCJG3aHg8NXb6qwbMTvZqhFZIqfUMmrWA52PNpSq3V5-Ry62NFTpft8eSyF5ProuHkVBhpJAedSS-Seslzvdfnm2PFlx4raMAsQ04U"/>
<div className="flex-1 min-w-0">
<p className="font-bold text-sm truncate">Jamie Doe</p>
<div className="flex items-center gap-2">
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span> 15d</span>
<span className="text-[10px] text-slate-500 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-gold" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span> 310</span>
</div>
</div>
<div className="text-right">
<p className="text-primary font-bold text-sm">1,920</p>
<p className="text-[10px] text-slate-400">XP</p>
</div>
</div>
</div>
{/*  Bottom Navigation Bar  */}
<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex gap-2 border-t border-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 pb-4 pt-2">
<a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400" href="#">
<div className="flex h-8 items-center justify-center">
<span className="material-symbols-outlined">home</span>
</div>
<p className="text-[10px] font-medium leading-normal">Home</p>
</a>
<a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400" href="#">
<div className="flex h-8 items-center justify-center">
<span className="material-symbols-outlined">book_4</span>
</div>
<p className="text-[10px] font-medium leading-normal">Learn</p>
</a>
<a className="flex flex-1 flex-col items-center justify-end gap-1 text-primary" href="#">
<div className="flex h-8 items-center justify-center">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
</div>
<p className="text-[10px] font-bold leading-normal">Leaderboard</p>
</a>
<a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400" href="#">
<div className="flex h-8 items-center justify-center">
<span className="material-symbols-outlined">person</span>
</div>
<p className="text-[10px] font-medium leading-normal">Profile</p>
</a>
</div>
</div>

    </div>
  );
}
