import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Zap, Users, Trophy, User } from "lucide-react";

const tabs = [
  { to: "/app/home", icon: Home, label: "Home" },
  { to: "/app/habits", icon: Zap, label: "Habits" },
  { to: "/app/group", icon: Users, label: "Group" },
  { to: "/app/leaderboard", icon: Trophy, label: "Ranks" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

export default function AppLayout() {
  const location = useLocation();
  const isCreateHabit = location.pathname === "/app/habits/new";

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 items-center font-display">
      {/* Page content */}
      <div className="flex-1 overflow-y-auto w-full max-w-md bg-white dark:bg-background-dark relative shadow-2xl pb-[100px]">
        <Outlet />
      </div>

      {/* Bottom Tab Bar */}
      {!isCreateHabit && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-surface-950 border-t border-surface-100 dark:border-surface-800 px-6 py-3 flex justify-between items-center z-50">
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
      )}
    </div>
  );
}
