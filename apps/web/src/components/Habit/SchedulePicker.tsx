import { cn } from "@/lib/utils";
import {
  WEEKDAY_LABELS,
  scheduleDescription,
  type HabitSchedule,
  type Weekday,
} from "@/constants/habitSchedule";
import {
  CalendarDays,
  Shuffle,
  CalendarCheck,
  Zap,
} from "lucide-react";


interface SchedulePickerProps {
  value: HabitSchedule;
  onChange: (schedule: HabitSchedule) => void;
}

const WEEKDAY_ORDER: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

export default function SchedulePicker({
  value,
  onChange,
}: SchedulePickerProps) {
  const mode = value.type; // "flexible" | "scheduled" | "one_time"

  // ── Mode switch ─────────────────────────────────────────────────────────────
  const switchToFlexible = () => {
    onChange({ type: "flexible", times: 3, period: "week" });
  };

  const switchToScheduled = () => {
    onChange({ type: "scheduled", period: "week", days: [1, 2, 3, 4, 5] });
  };

  const switchToOneTime = () => {
    onChange({ type: "one_time" });
  };

  // ── Flexible Handlers ────────────────────────────────────────────────────────
  const isFlex = value.type === "flexible";
  const flexTimes = isFlex ? value.times : 1;
  const flexPeriod = isFlex ? value.period : "week";

  const handleFlexPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value as "day" | "week" | "month";
    let newTimes = flexTimes;
    if (newPeriod === "day" && newTimes > 5) newTimes = 1;
    if (newPeriod === "week" && newTimes > 7) newTimes = 3;
    if (newPeriod === "month" && newTimes > 31) newTimes = 10;
    onChange({ type: "flexible", times: newTimes, period: newPeriod });
  };

  const handleFlexTimesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      onChange({ type: "flexible", times: val, period: flexPeriod });
    }
  };

  // ── Scheduled Handlers ────────────────────────────────────────────────────────
  const isSched = value.type === "scheduled";
  const schedPeriod = isSched ? value.period : "week";
  const schedDays = isSched ? value.days : [];

  const handleSchedPeriodChange = (p: "week" | "month") => {
    onChange({ type: "scheduled", period: p, days: p === "week" ? [1,2,3,4,5] : [1, 15] });
  };

  const handleDayToggle = (day: number) => {
    if (value.type !== "scheduled") return;
    const current = value.days;
    const next = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    if (next.length === 0) return; // require at least one
    onChange({ type: "scheduled", period: value.period, days: next });
  };

  return (
    <div className="space-y-4">
      {/* ── Mode toggle ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-surface-100 dark:bg-surface-800 rounded-2xl">
        <button
          type="button"
          onClick={switchToFlexible}
          className={cn(
            "flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl font-bold text-xs transition-all duration-200",
            mode === "flexible"
              ? "bg-white dark:bg-surface-900 text-accent shadow-sm"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
          )}
        >
          <Shuffle className="w-4 h-4 shrink-0" />
          Flexible
        </button>
        <button
          type="button"
          onClick={switchToScheduled}
          className={cn(
            "flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl font-bold text-xs transition-all duration-200",
            mode === "scheduled"
              ? "bg-white dark:bg-surface-900 text-accent shadow-sm"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
          )}
        >
          <CalendarCheck className="w-4 h-4 shrink-0" />
          Scheduled
        </button>
        <button
          type="button"
          onClick={switchToOneTime}
          className={cn(
            "flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl font-bold text-xs transition-all duration-200",
            mode === "one_time"
              ? "bg-white dark:bg-surface-900 text-accent shadow-sm"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
          )}
        >
          <Zap className="w-4 h-4 shrink-0" />
          One Time
        </button>
      </div>

      {/* ── Flexible mode ────────────────────────────────────────────────── */}
      {mode === "flexible" && (
        <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              min={1} 
              max={flexPeriod === "day" ? 10 : flexPeriod === "week" ? 7 : 31}
              value={flexTimes}
              onChange={handleFlexTimesChange}
              className="w-20 text-center rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 p-2 text-lg font-bold focus:border-accent outline-none"
            />
            <span className="text-slate-500 font-bold">times per</span>
            <select
              value={flexPeriod}
              onChange={handleFlexPeriodChange}
              className="flex-1 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 p-2 text-lg font-bold focus:border-accent outline-none appearance-none cursor-pointer"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>

          <div className="flex items-start gap-2.5 px-3 py-2.5 bg-accent/5 border border-accent/15 rounded-xl text-xs text-slate-500 dark:text-slate-400">
            <Shuffle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <span>
              Complete this habit <strong className="text-accent">{flexTimes} time{flexTimes > 1 ? "s" : ""} a {flexPeriod}</strong> on any days you choose.
            </span>
          </div>
        </div>
      )}

      {/* ── Scheduled mode ────────────────────────────────────────────────── */}
      {mode === "scheduled" && (
        <div className="space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleSchedPeriodChange("week")}
              className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", schedPeriod === "week" ? "bg-white dark:bg-surface-900 shadow-sm text-accent" : "text-slate-500")}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => handleSchedPeriodChange("month")}
              className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", schedPeriod === "month" ? "bg-white dark:bg-surface-900 shadow-sm text-accent" : "text-slate-500")}
            >
              Monthly
            </button>
          </div>

          {schedPeriod === "week" ? (
            <div className="bg-surface-50 dark:bg-surface-900/50 border border-surface-100 dark:border-surface-700 rounded-2xl p-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
                Toggle days of week
              </p>
              <div className="flex justify-between gap-1">
                {WEEKDAY_ORDER.map((day) => {
                  const isSelected = schedDays.includes(day);
                  const label = WEEKDAY_LABELS[day as Weekday];
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all duration-200",
                        isSelected
                          ? "border-accent bg-accent text-white shadow-md shadow-accent/20 scale-105"
                          : "border-surface-100 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-400 hover:border-accent/30",
                      )}
                    >
                      <span className={cn("text-[10px] font-bold", isSelected ? "text-white/80" : "text-slate-400")}>
                        {label.narrow}
                      </span>
                      <span className={cn("w-2 h-2 rounded-full", isSelected ? "bg-white" : "bg-surface-200 dark:bg-surface-600")} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-surface-50 dark:bg-surface-900/50 border border-surface-100 dark:border-surface-700 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
                Toggle days of month
              </p>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = schedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={cn(
                        "w-full aspect-square rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center border",
                        isSelected
                          ? "bg-accent text-white border-accent shadow-md shadow-accent/20 scale-105"
                          : "bg-white dark:bg-surface-800 text-slate-500 border-surface-200 dark:border-surface-700 hover:border-accent/40"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── One Time mode ────────────────────────────────────────────────── */}
      {mode === "one_time" && (
        <div className="flex items-start gap-2.5 px-3 py-2.5 bg-accent/5 border border-accent/15 rounded-xl text-xs text-slate-500 dark:text-slate-400 animate-[fadeIn_0.2s_ease-out]">
          <Zap className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
          <span>
            This is a <strong className="text-accent">one-off</strong> challenge. It will stay active until you complete it, then it's gone!
          </span>
        </div>
      )}

      {/* ── Summary bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-accent/8 border border-accent/15 rounded-xl mt-4">
        <CalendarDays className="w-4 h-4 text-accent shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-accent truncate">
            {scheduleDescription(value)}
          </p>
        </div>
      </div>
    </div>
  );
}
