// ── Days ──────────────────────────────────────────────────────────────────────
/** 0 = Sunday, 1 = Monday … 6 = Saturday (matches `Date.prototype.getDay()`) */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const WEEKDAY_LABELS: Record<Weekday, { short: string; narrow: string }> =
  {
    0: { short: "Sun", narrow: "S" },
    1: { short: "Mon", narrow: "M" },
    2: { short: "Tue", narrow: "T" },
    3: { short: "Wed", narrow: "W" },
    4: { short: "Thu", narrow: "T" },
    5: { short: "Fri", narrow: "F" },
    6: { short: "Sat", narrow: "S" },
  };

// ── Schedule types ────────────────────────────────────────────────────────────

export interface FlexibleSchedule {
  type: "flexible";
  times: number;
  period: "day" | "week" | "month";
}

export interface ScheduledSchedule {
  type: "scheduled";
  period: "week" | "month";
  days: number[]; // 0-6 for week, 1-31 for month
}

export interface OneTimeSchedule {
  type: "one_time";
}

export type HabitSchedule = FlexibleSchedule | ScheduledSchedule | OneTimeSchedule;

export const DEFAULT_SCHEDULE: HabitSchedule = {
  type: "flexible",
  times: 1,
  period: "day"
};

// ── Presets ───────────────────────────────────────────────────────────────────

export interface SpecificPreset {
  id: string;
  label: string;
  sublabel: string;
  days: Weekday[];
  emoji: string;
}

export const SPECIFIC_PRESETS: SpecificPreset[] = [
  {
    id: "weekdays",
    label: "Weekdays",
    sublabel: "Mon – Fri",
    days: [1, 2, 3, 4, 5],
    emoji: "💼",
  },
  {
    id: "weekends",
    label: "Weekends",
    sublabel: "Sat & Sun",
    days: [0, 6],
    emoji: "🌴",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function isHabitDueOn(
  schedule: HabitSchedule,
  date: Date = new Date(),
): boolean {
  if (schedule.type === "flexible") return true; 
  if (schedule.type === "one_time") return true; // always potentially due until completed
  
  if (schedule.type === "scheduled") {
    if (schedule.period === "week") {
      const dayOfWeek = date.getDay() as Weekday;
      return schedule.days.includes(dayOfWeek);
    } else if (schedule.period === "month") {
      const dayOfMonth = date.getDate();
      return schedule.days.includes(dayOfMonth);
    }
  }
  return false;
}

export function isFlexibleGoalMet(
  schedule: FlexibleSchedule,
  completionsInPeriod: number,
): boolean {
  return completionsInPeriod >= schedule.times;
}

export function scheduleLabel(schedule: HabitSchedule): string {
  if (schedule.type === "one_time") {
    return `One-off`;
  }

  if (schedule.type === "flexible") {
    if (schedule.period === "day" && schedule.times === 1) return "Daily";
    return `${schedule.times}×/${schedule.period}`;
  }

  if (schedule.type === "scheduled") {
    const { days, period } = schedule;
    if (days.length === 0) return "Never";

    if (period === "week") {
      if (days.length === 7) return "Daily";
      const isWeekdays = days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d));
      if (isWeekdays) return "Weekdays";
      const isWeekends = days.length === 2 && days.includes(0) && days.includes(6);
      if (isWeekends) return "Weekends";

      if (days.length <= 3) {
        return days
          .slice()
          .sort((a, b) => a - b)
          .map((d) => WEEKDAY_LABELS[d as Weekday].short)
          .join(" · ");
      }
      return `${days.length} days/week`;
    } else if (period === "month") {
      if (days.length <= 3) {
        return days.map(d => `${d}${getOrdinalSuffix(d)}`).join(", ");
      }
      return `${days.length} days/month`;
    }
  }

  return "Custom";
}

function getOrdinalSuffix(i: number) {
  const j = i % 10, k = i % 100;
  if (j == 1 && k != 11) return "st";
  if (j == 2 && k != 12) return "nd";
  if (j == 3 && k != 13) return "rd";
  return "th";
}

export function scheduleDescription(schedule: HabitSchedule): string {
  if (schedule.type === "one_time") {
    return "Complete this once and you're done";
  }

  if (schedule.type === "flexible") {
    if (schedule.period === "day") {
      if (schedule.times === 1) return "Every day";
      return `${schedule.times} times every day`;
    }
    if (schedule.period === "week") {
      return `${schedule.times} times a week, any days you choose`;
    }
    if (schedule.period === "month") {
      return `${schedule.times} times a month, any days you choose`;
    }
  }

  return scheduleLabel(schedule);
}

/** Derives a legacy frequency number (for backward compat with Firestore fallback logic). */
export function scheduleToFrequency(schedule: HabitSchedule): number {
  if (schedule.type === "one_time") return 1;
  if (schedule.type === "flexible") return schedule.times;
  if (schedule.type === "scheduled") return schedule.days.length;
  return 1;
}

/**
 * Best-effort upgrade from a legacy `frequency: number` to a `HabitSchedule`.
 */
export function frequencyToSchedule(frequency: number): HabitSchedule {
  return { type: "flexible", times: Math.min(Math.max(frequency, 1), 7), period: "week" };
}

/**
 * Priority score for sorting habits in the list.
 * Lower = higher priority (floats to the top).
 */
export function habitPriority(opts: {
  isDueToday: boolean;
  isCompletedToday: boolean;
  isGoalMet?: boolean;
}): number {
  const { isDueToday, isCompletedToday, isGoalMet = false } = opts;

  if (isDueToday && !isCompletedToday && !isGoalMet) return 0; // active, needs attention
  if (isDueToday && isCompletedToday && !isGoalMet) return 1;  // done today but goal not met
  if (isDueToday && isGoalMet) return 2;                       // flexible goal met entirely
  if (!isDueToday && !isCompletedToday) return 3;              // not due today, pending
  return 4;                                                    // not due, done
}
