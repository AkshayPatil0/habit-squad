import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Extracted from profile_screen_light.html */}

      <div className="max-w-md mx-auto bg-white dark:bg-background-dark min-h-screen flex flex-col relative overflow-hidden">
        <header className="flex items-center justify-between p-6 pb-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <h1 className="text-xl font-800 tracking-tight">Profile</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <span className="material-symbols-outlined">share</span>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto px-6 pb-24">
          <section className="flex flex-col items-center py-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full neo-border p-1 bg-white">
                <img
                  alt="User avatar"
                  className="w-full h-full rounded-full object-cover"
                  data-alt="Close up portrait of a smiling young man"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN-aIj4k7ISl_zpcTQhS3dA8mBRZCRNWLgX1fNAdLIlflKAulXxSbBt8sMFQ8BWw_MuMCkBQP5dOwNIWjC9bm1mO60Pb1DqyNMcmw_f1gwbex8-URtCgt5kIz1LHThKOJXGU7m-Y4teONzr8KPP-qd3DWXmZOJXstdka4Yf3VUemMZsXj3S5dcPh2Ypfw-U7Fwkuat_Y53wxwK9noh3e2KdNiIUy7pjVOI6ZjNQzzU6LsajgHGcLJhY0kSeF5iimQsfHCzZcS9Dq8"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
                LVL 24
              </div>
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-800 text-slate-900 dark:text-white">
                Alex Nomad
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                XP: 12,450 / 15,000
              </p>
            </div>
            <div className="w-full mt-4 bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[83%] rounded-full"></div>
            </div>
          </section>
          <section className="mb-8">
            <div className="bg-primary/10 dark:bg-primary/20 p-5 rounded-xl neo-shadow flex items-center justify-between border-2 border-primary/20">
              <div>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">
                  Coin Balance
                </p>
                <p className="text-3xl font-800 text-slate-900 dark:text-white mt-1">
                  2,450 <span className="text-lg">🪙</span>
                </p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded font-bold text-sm">
                Shop
              </button>
            </div>
          </section>
          <section className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">
                task_alt
              </span>
              <p className="text-xs font-bold text-slate-500 uppercase">
                Total
              </p>
              <p className="text-xl font-800 text-slate-900 dark:text-white">
                152
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-orange-500 mb-2">
                local_fire_department
              </span>
              <p className="text-xs font-bold text-slate-500 uppercase">
                Streak
              </p>
              <p className="text-xl font-800 text-slate-900 dark:text-white">
                21d
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-yellow-500 mb-2">
                workspace_premium
              </span>
              <p className="text-xs font-bold text-slate-500 uppercase">Rank</p>
              <p className="text-xl font-800 text-slate-900 dark:text-white">
                #4
              </p>
            </div>
          </section>
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-800 text-slate-900 dark:text-white">
                Badge Collection
              </h3>
              <a className="text-primary font-bold text-sm" href="#">
                View All
              </a>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex-shrink-0 w-24 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center border-4 border-white neo-shadow mb-2">
                  <span
                    className="material-symbols-outlined text-orange-500 text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    emoji_events
                  </span>
                </div>
                <p className="text-[10px] font-800 text-center text-slate-700 uppercase leading-tight">
                  7 Day Streak
                </p>
              </div>
              <div className="flex-shrink-0 w-24 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white neo-shadow mb-2">
                  <span
                    className="material-symbols-outlined text-blue-500 text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                <p className="text-[10px] font-800 text-center text-slate-700 uppercase leading-tight">
                  Habit Master
                </p>
              </div>
              <div className="flex-shrink-0 w-24 flex flex-col items-center opacity-40 grayscale">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white mb-2">
                  <span className="material-symbols-outlined text-slate-400 text-4xl">
                    lock
                  </span>
                </div>
                <p className="text-[10px] font-800 text-center text-slate-700 uppercase leading-tight">
                  Early Bird
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
