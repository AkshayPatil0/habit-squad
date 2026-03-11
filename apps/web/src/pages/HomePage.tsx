import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Flame, Bell, Droplets, Activity, Plus, Check } from 'lucide-react';

export default function HomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-full font-display flex flex-col items-center">
      <div className="w-full max-w-md bg-white dark:bg-background-dark min-h-full flex flex-col relative pb-8 shadow-2xl">
        
        {/* Header Section */}
        <header className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary overflow-hidden">
                {/* Fallback avatar image */}
                <img 
                  alt={`${user?.name || 'User'}'s avatar`} 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN3k8nAUc6_cb5hKijin1pjmvHHmmXS0MRBTuqQBbvoaBuvvkTBVp5SbCiVLebM0QVv8qf5cUZ8MzVQrRz7duh98s2gcNsONvQjwYaZgA_CRBzx8MlNmhM_vI33xDQeliRoJzIvOnypHcod7FTmfKZPsNHsQSLhGfLzrChzzEeh8pdQ2g47bttdWHqGeL4qPnAYrW6XPuGmT-1OSOKu4Dw23ELhAmYzexk1Dm_6xVduAGYujNoC6DMptR_VaXDCgyn3L-INysQp4A" 
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Good Morning, {user?.name?.split(' ')[0] || 'Friend'}
                </h1>
                <p className="text-primary font-semibold flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  5-day fire streak
                </p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <Bell className="w-5 h-5" />
            </button>
          </div>
          
          {/* XP Progress Bar */}
          <div className="bg-primary/10 dark:bg-primary/5 p-4 rounded-xl border-2 border-primary">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Level 5 Explorer</span>
              <span className="text-xs font-medium text-slate-500">650 / 1000 XP</span>
            </div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </header>

        {/* Today's Habits Section */}
        <section className="px-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Today's Habits</h2>
            <Link to="/app/habits" className="text-primary font-bold text-sm hover:underline">View all</Link>
          </div>

          {/* Card 1: Drink Water */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-[4px_4px_0_0_rgba(90,90,246,0.2)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-500">
                <Droplets className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Drink Water</h3>
                <p className="text-slate-500 text-sm">3 of 8 glasses</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors text-primary">
              <Plus className="w-6 h-6" strokeWidth={3} />
            </button>
          </div>

          {/* Card 2: Morning Yoga */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-[4px_4px_0_0_rgba(90,90,246,0.2)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-500">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Morning Yoga</h3>
                <p className="text-slate-500 text-sm">0 of 1 session</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600">
              <Check className="w-6 h-6" strokeWidth={3} />
            </button>
          </div>
        </section>

        {/* Group Activity Section */}
        <section className="px-6 py-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Group Activity</h2>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border-2 border-dashed border-primary/30">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0">
                  <img alt="Rahul's avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtRWJ3-bxjLcIb3Ivdk8eW_tHrxBzJW1DOX5gE4i0xczH0cQlboCRnhtaG4Jn6oNHwtNGHp4xEhj5CAyHFi9mJZAxwFBDKR7l3y9SyMvJbIQ-BZwkcFtvaKUtOEUdUtkFcHfV6VINHyV7lRg9A5BJpQXEm1DJrea8wEaM7VdAnbw14PaWLRal_4ujJosKooQQXmafDeiFqkblOv1mGCeVEBu1iKVK9DcA7zTZuZjrMI5AZypgIb6eVGbznnGkqFz4lbeOF5D0mNiA" />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Rahul</span> completed <span className="text-primary font-medium">Workout</span>
                </p>
                <span className="text-[10px] text-slate-400">2m ago</span>
              </li>
              
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0">
                  <img alt="Priya's avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg0WsE7yYkLymtupmZgKZzCoTVdla7Uy0cjhj7hgk5XmtZfx8V4R7WqGi2eaXjPoBZMBwT2JlNSLKCsDTahp1sjPlTlWMenHRyIt_2QhEW4qDCNnNcjpEkqpLqZAJYlWzfsRxnYj8li2vDhFG7qKn5gRtwnqdEzdbXBBhP1BhedNKGSp8eQ5daRXydkAXDflXX_8eq9q66EIYXsdwrzA3Pl-evCbrOe94HvMPRDVrl6o1sURGFMDAtuGZ8OCc0nL04hfy-phnyiZc" />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Priya</span> completed <span className="text-primary font-medium">Meditation</span>
                </p>
                <span className="text-[10px] text-slate-400">15m ago</span>
              </li>
            </ul>
            <button className="w-full mt-4 py-2 text-primary font-bold text-sm bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
              High Five the Group!
            </button>
          </div>
        </section>
        
        {/* Note: the app layout provides the bottom navigation, so we only handle scrolling content here */}
      </div>
    </div>
  );
}
