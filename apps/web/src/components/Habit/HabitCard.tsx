import { useAuth } from "@/context/AuthContext";
import type { Habit } from "@/services/firestoreService";
import { getCategoryById } from "@/constants/habitCategories";
import {
  frequencyToSchedule,
  isHabitDueOn,
  scheduleLabel,
} from "@/constants/habitSchedule";
import { CalendarDays, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPeriodKey } from "@/utils/periodKey";
import {
  useHabitOccurrences,
  useCompleteOccurrence,
  useUncompleteOccurrence,
} from "@/hooks/useOccurrences";
import OccurrenceSlots from "./OccurrenceSlots";

interface HabitCardProps {
  habit: Habit;
  /** Legacy: used as fallback when no occurrences exist yet */
  isCompleted?: boolean;
  isLoading?: boolean;
}

export function HabitCard({ habit, isLoading }: HabitCardProps) {
  const { profile } = useAuth();
  const periodKey = habit.schedule ? getPeriodKey(habit.schedule) : "";

  const category = getCategoryById(habit.category ?? "");
  const CategoryIcon = category.defaultIcon;

  const schedule = habit.schedule ?? frequencyToSchedule(habit.frequency ?? 7);
  const isDueToday = isHabitDueOn(schedule);
  const scheduleSummary = scheduleLabel(schedule);

  // Occurrence data ────────────────────────────────────────────────────────────
  const { data: occurrences = [], isLoading: occLoading } = useHabitOccurrences(
    habit.id,
    periodKey,
  );

  console.log({ occurrences, habit });
  const completeOcc = useCompleteOccurrence();
  const uncompleteOcc = useUncompleteOccurrence();

  // Derived state ──────────────────────────────────────────────────────────────
  const myId = profile?.uid ?? "";
  const completedSlots = occurrences.filter(
    (o) => !!o.completions[myId],
  ).length;
  const totalSlots = occurrences.length;
  const goalMet = totalSlots > 0 && completedSlots >= totalSlots;

  // For specific schedules, also gate by today being a scheduled day
  const isScheduledNotDue = schedule.type === "scheduled" && !isDueToday;

  const isDimmed = goalMet || isScheduledNotDue;

  const handleToggle = (occurrenceId: string, alreadyDone: boolean) => {
    if (!myId || !habit.id) return;
    if (isScheduledNotDue) return;

    const vars = {
      habitId: habit.id,
      occurrenceId,
      userId: myId,
      xpReward: habit.xpReward,
      periodKey,
    };
    if (alreadyDone) {
      uncompleteOcc.mutate(vars);
    } else {
      completeOcc.mutate(vars);
    }
  };

  return (
    <div
      className={cn(
        "card p-4 space-y-3 transition-all duration-300 animate-fade-in",
        isDimmed ? "opacity-50" : "hover:border-brand-500/30 hover:shadow-glow",
      )}
    >
      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-3 rounded-xl shrink-0",
            isDimmed ? "bg-white/5" : category.color,
          )}
        >
          <CategoryIcon
            size={20}
            className={isDimmed ? "text-white/30" : ""}
            strokeWidth={1.5}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-semibold text-sm truncate",
              goalMet
                ? "line-through text-white/40"
                : isScheduledNotDue
                  ? "text-white/40"
                  : "text-white",
            )}
          >
            {habit.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                isDimmed ? "text-white/20 bg-white/5" : category.color,
              )}
            >
              {category.label}
            </span>
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                isDimmed
                  ? "text-white/20 bg-white/5"
                  : "text-accent/80 bg-accent/10",
              )}
            >
              <CalendarDays size={8} />
              {scheduleSummary}
            </span>
            {isScheduledNotDue && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white/20 bg-white/5">
                Not today
              </span>
            )}
            <span className="xp-badge text-[10px]">
              <Star size={9} /> +{habit.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* ── Occurrence slots ──────────────────────────────────────────── */}
      <OccurrenceSlots
        occurrences={occurrences}
        myId={myId}
        isLoading={occLoading || isLoading}
        isMutating={completeOcc.isPending || uncompleteOcc.isPending}
        isDisabled={isScheduledNotDue}
        schedule={schedule}
        onToggle={handleToggle}
      />
    </div>
  );
}
