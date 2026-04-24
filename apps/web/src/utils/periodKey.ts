import type { HabitSchedule } from "@/constants/habitSchedule";

// ── Daily key ────────────────────────────────────────────────────────────────
export function getDailyKey(date: Date = new Date()): string {
  const d = new Date(date);
  // Using local time day string "YYYY-MM-DD"
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ── ISO week key ──────────────────────────────────────────────────────────────
/**
 * Returns an ISO week key string in the format "YYYY-WNN".
 * Week 1 is the week containing the first Thursday of January (ISO 8601).
 */
export function getISOWeekKey(date: Date = new Date()): string {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  // Set to nearest Thursday: current date + 4 - current day number (1-7, Mon=1)
  const dayNum = d.getUTCDay() || 7; // convert Sun 0 → 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export const getCurrentWeekKey = () => getISOWeekKey(new Date());

// ── Month key ──────────────────────────────────────────────────────────────
export function getMonthKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

// ── Generic period key ────────────────────────────────────────────────────────
export function getPeriodKey(schedule: HabitSchedule, date: Date = new Date()): string {
  if (schedule.type === "one_time") {
    return "ONE_TIME";
  }
  
  const period = schedule.period;
  if (period === "day") return getDailyKey(date);
  if (period === "week") return getISOWeekKey(date);
  if (period === "month") return getMonthKey(date);
  
  return getISOWeekKey(date); // Fallback
}


// ── Period bounds ─────────────────────────────────────────────────────────────

/**
 * Given a period key, returns the bounds (start and end Date).
 * Warning: for ONE_TIME, returns a huge past/future range.
 */
export function getPeriodBounds(periodKey: string): { start: Date; end: Date } {
  if (periodKey === "ONE_TIME") {
    return { start: new Date("2000-01-01"), end: new Date("2100-01-01") };
  }
  
  // Daily: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(periodKey)) {
    const start = new Date(`${periodKey}T00:00:00`);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  // Monthly: YYYY-MM
  if (/^\d{4}-\d{2}$/.test(periodKey)) {
    const [year, month] = periodKey.split("-");
    const start = new Date(parseInt(year), parseInt(month) - 1, 1);
    const end = new Date(parseInt(year), parseInt(month), 0); // last day of month
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  // Weekly: YYYY-WNN
  if (periodKey.includes("-W")) {
    const [yearStr, weekStr] = periodKey.split("-W");
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);

    // Jan 4 is always in week 1 (ISO 8601)
    const jan4 = new Date(year, 0, 4);
    const jan4DayOfWeek = jan4.getDay() || 7; // Mon=1…Sun=7
    // Monday of week 1
    const monday = new Date(jan4);
    monday.setDate(jan4.getDate() - (jan4DayOfWeek - 1) + (week - 1) * 7);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { start: monday, end: sunday };
  }

  // Fallback
  return { start: new Date(), end: new Date() };
}

// ── Scheduled dates for a period ────────────────────────────────────────────────

export function getScheduledDatesForPeriod(
  schedule: HabitSchedule,
  periodKey: string,
): string[] {
  if (schedule.type !== "scheduled") return [];

  const { start, end } = getPeriodBounds(periodKey);
  const out: string[] = [];

  if (schedule.period === "week") {
    // start is Monday
    schedule.days.forEach((dayIndex) => {
      const offset = dayIndex === 0 ? 6 : dayIndex - 1; // Sun(0)→6, Mon(1)→0…
      const d = new Date(start);
      d.setDate(start.getDate() + offset);
      out.push(getDailyKey(d));
    });
  } else if (schedule.period === "month") {

    const lastDayOfMonth = end.getDate();
    
    schedule.days.forEach((dayNum) => {
      // if dayNum is e.g. 31, but month has 30 days, we cap it at 30?
      // Or maybe we don't schedule it if the month doesn't have that day? Let's cap it at last day.
      const actualDay = Math.min(dayNum, lastDayOfMonth);
      const d = new Date(start);
      d.setDate(actualDay);
      // to avoid duplicates if multiple days cap to the same last day:
      const iso = getDailyKey(d);
      if (!out.includes(iso)) {
        out.push(iso);
      }
    });
  }

  return out.sort();
}

// ── Slot count ────────────────────────────────────────────────────────────────

export function getPeriodSlotCount(schedule: HabitSchedule, periodKey: string): number {
  if (schedule.type === "one_time") return 1;
  if (schedule.type === "flexible") return schedule.times;
  return getScheduledDatesForPeriod(schedule, periodKey).length;
}

// ── Completions Helper ────────────────────────────────────────────────────────

/**
 * Counts completed dates that fall within the given period bounds.
 */
export function getCompletionsInPeriod(
  completedDates: string[] | undefined,
  periodKey: string,
): number {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const { start, end } = getPeriodBounds(periodKey);
  const startDateStr = getDailyKey(start);
  const endDateStr = getDailyKey(end);

  // Since completedDates are typically 'YYYY-MM-DD', we can do string comparison
  return completedDates.filter((d) => d >= startDateStr && d <= endDateStr).length;
}

// ── Compact Label ─────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Returns a compact, human-readable label for a given period key.
 * e.g., "This week", "Last week", "Week 32", "This month", "Apr", "May"
 */
export function getCompactPeriodLabel(periodKey: string, now: Date = new Date()): string {
  if (periodKey === "ONE_TIME") return "One-time";

  // Daily: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(periodKey)) {
    if (periodKey === getDailyKey(now)) return "Today";
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (periodKey === getDailyKey(yesterday)) return "Yesterday";
    
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    if (periodKey === getDailyKey(tomorrow)) return "Tomorrow";

    // e.g., "Apr 24"
    const [yearStr, monthStr, dayStr] = periodKey.split('-');
    const month = MONTH_NAMES[parseInt(monthStr, 10) - 1];
    const day = parseInt(dayStr, 10);
    
    if (parseInt(yearStr, 10) !== now.getFullYear()) {
      return `${month} ${day}, ${yearStr}`;
    }
    return `${month} ${day}`;
  }

  // Monthly: YYYY-MM
  if (/^\d{4}-\d{2}$/.test(periodKey)) {
    if (periodKey === getMonthKey(now)) return "This month";
    
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    if (periodKey === getMonthKey(lastMonth)) return "Last month";
    
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (periodKey === getMonthKey(nextMonth)) return "Next month";

    const [yearStr, monthStr] = periodKey.split("-");
    const month = MONTH_NAMES[parseInt(monthStr, 10) - 1];
    
    if (parseInt(yearStr, 10) !== now.getFullYear()) {
      return `${month} ${yearStr}`;
    }
    return month;
  }

  // Weekly: YYYY-WNN
  if (periodKey.includes("-W")) {
    if (periodKey === getISOWeekKey(now)) return "This week";
    
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    if (periodKey === getISOWeekKey(lastWeek)) return "Last week";

    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    if (periodKey === getISOWeekKey(nextWeek)) return "Next week";

    const [, weekStr] = periodKey.split("-W");
    return `Week ${parseInt(weekStr, 10)}`;
  }

  return periodKey;
}

