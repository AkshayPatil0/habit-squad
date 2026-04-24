import { Outlet, NavLink } from "react-router-dom";
import { Home, MessageCircle, Trophy, User } from "lucide-react";
import PageLayout from "@/layouts/PageLayout";

const tabs = [
  { to: "/app/home", icon: Home, label: "Home" },
  { to: "/app/activity", icon: MessageCircle, label: "Activity" },
  { to: "/app/leaderboard", icon: Trophy, label: "Ranks" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

export default function AppLayout() {
  return (
    <PageLayout>
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-accent/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-accent/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>

      {/* Page content */}
      <div className="relative flex-1 overflow-y-auto w-full h-full bg-white dark:bg-surface-950 rounded-xl shadow-2xl border border-accent/10 z-10 pb-[80px]">
        <Outlet />
      </div>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-surface-950 border-t border-surface-100 dark:border-surface-800 px-6 py-3 flex justify-between items-center z-50 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-accent"
                  : "text-slate-400 dark:text-slate-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </PageLayout>
  );
}
