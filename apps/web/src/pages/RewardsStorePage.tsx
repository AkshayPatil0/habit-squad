export default function RewardsStorePage() {
  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Extracted from rewards_store_light.html */}

      <div className="relative flex h-auto min-h-dvh w-full max-w-md mx-auto flex-col bg-white dark:bg-surface-950 overflow-x-hidden shadow-2xl">
        {/*  Header  */}
        <div className="flex items-center bg-white dark:bg-surface-950 p-4 pb-2 justify-between sticky top-0 z-10 border-b border-surface-100 dark:border-surface-800">
          <div className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Rewards Store
          </h2>
          <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            <span
              className="material-symbols-outlined text-accent text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monetization_on
            </span>
            <p className="text-accent text-sm font-bold leading-normal">500</p>
          </div>
        </div>
        {/*  Categories  */}
        <div className="pb-1 bg-white dark:bg-surface-950">
          <div className="flex border-b border-surface-100 dark:border-surface-800 px-4 gap-6 overflow-x-auto no-scrollbar">
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-b-accent text-accent pb-3 pt-4 shrink-0"
              href="#"
            >
              <p className="text-sm font-bold">All Rewards</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 shrink-0"
              href="#"
            >
              <p className="text-sm font-medium">Food &amp; Drinks</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 shrink-0"
              href="#"
            >
              <p className="text-sm font-medium">Entertainment</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 shrink-0"
              href="#"
            >
              <p className="text-sm font-medium">Vouchers</p>
            </a>
          </div>
        </div>
        {/*  Hero Section/Featured  */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-indigo-600 p-6 text-white">
            <div className="relative z-10">
              <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                Weekly Special
              </span>
              <h3 className="text-2xl font-bold mb-1">Cheat Day Pass</h3>
              <p className="text-white/80 text-sm mb-4">
                Go wild! A full day of your favorite treats without any guilt.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-yellow-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    monetization_on
                  </span>
                  <span className="font-bold">150 Coins</span>
                </div>
                <button className="bg-white text-accent px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                  Redeem Now
                </button>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <span className="material-symbols-outlined text-[120px]">
                restaurant
              </span>
            </div>
          </div>
        </div>
        {/*  Reward List  */}
        <div className="px-4 pb-20 space-y-4">
          {/*  Movie Night Card  */}
          <div className="group flex items-center p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-16 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                movie
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Movie Night
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Premium movie rental voucher
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-accent"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  monetization_on
                </span>
                <span className="text-sm font-bold text-accent">200 Coins</span>
              </div>
            </div>
            <button className="bg-accent/10 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
              Redeem
            </button>
          </div>
          {/*  Dessert Card  */}
          <div className="group flex items-center p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-16 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 shrink-0">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                icecream
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Sweet Treat
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Double scoop at Scoop-It
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-accent"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  monetization_on
                </span>
                <span className="text-sm font-bold text-accent">80 Coins</span>
              </div>
            </div>
            <button className="bg-accent/10 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
              Redeem
            </button>
          </div>
          {/*  Coffee Card  */}
          <div className="group flex items-center p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-16 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                coffee
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Coffee Break
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Large latte or cappuccino
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-accent"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  monetization_on
                </span>
                <span className="text-sm font-bold text-accent">50 Coins</span>
              </div>
            </div>
            <button className="bg-accent/10 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
              Redeem
            </button>
          </div>
          {/*  Pizza Card  */}
          <div className="group flex items-center p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-16 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_pizza
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Pizza Party
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Any medium pizza for free
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-accent"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  monetization_on
                </span>
                <span className="text-sm font-bold text-accent">350 Coins</span>
              </div>
            </div>
            <button className="bg-accent/10 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
              Redeem
            </button>
          </div>
        </div>
        {/*  Bottom Navigation  */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-surface-950/80 backdrop-blur-lg border-t border-surface-100 dark:border-surface-800 flex justify-around py-3 px-6 pb-6">
          <a
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-accent transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-accent transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">checklist</span>
            <span className="text-[10px] font-medium">Tasks</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-accent" href="#">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              storefront
            </span>
            <span className="text-[10px] font-bold">Store</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-accent transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}
