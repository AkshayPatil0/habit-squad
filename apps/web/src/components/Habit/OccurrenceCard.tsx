import { useAuth } from "@/context/AuthContext";
import type { Habit, HabitOccurrence } from "@/services/firestoreService";
import { getCategoryById } from "@/constants/habitCategories";
import { frequencyToSchedule, HabitSchedule } from "@/constants/habitSchedule";
import { CalendarDays, Star, CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCompactPeriodLabel, getPeriodKey } from "@/utils/periodKey";
import {
  useCompleteOccurrence,
  useUncompleteOccurrence,
} from "@/hooks/useOccurrences";

interface OccurrenceCardProps {
  habit: Habit;
  occurrence: HabitOccurrence;
  isLoading?: boolean;
}

function formatSlotDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getOccurrenceLabel(
  occurrence: HabitOccurrence,
  schedule: HabitSchedule,
) {
  if (schedule.type == "scheduled") {
    return occurrence.scheduledDate
      ? formatSlotDate(occurrence.scheduledDate)
      : "";
  }

  if (schedule.type == "flexible") {
    return `${occurrence.slotIndex}/${schedule.times}  ●  ${getCompactPeriodLabel(occurrence.periodKey)}`;
  }

  return "";
}

export function OccurrenceCard({
  habit,
  occurrence,
  isLoading,
}: OccurrenceCardProps) {
  const { profile } = useAuth();

  const category = getCategoryById(habit.category ?? "");
  const CategoryIcon = category.defaultIcon;

  const schedule = habit.schedule ?? frequencyToSchedule(habit.frequency ?? 7);

  const completeOcc = useCompleteOccurrence();
  const uncompleteOcc = useUncompleteOccurrence();

  const myId = profile?.uid ?? "";

  const periodKey = occurrence.periodKey || getPeriodKey(schedule);

  // Is this occurrence already done by me?
  const iDone = !!occurrence.completions[myId];

  const isMutating = completeOcc.isPending || uncompleteOcc.isPending;

  // Determine if it's disabled. Specific schedule, but not due today?
  // Since we show all occurrences for the week, maybe we shouldn't disable clicking them on other days if it is overdue?
  // Wait, if it's an upcoming specific day, maybe disable it. If it's a past one, allow completing it late.
  // Actually, previously isSpecificNotDue gated it, but let's allow toggling past ones.
  const todayIso = new Date().toISOString().split("T")[0];
  const isFutureSpecific =
    occurrence.scheduledDate && occurrence.scheduledDate > todayIso;

  const isDisabled = !!isFutureSpecific && !iDone;
  const isDimmed = iDone || !!isFutureSpecific;

  const handleToggle = () => {
    if (!myId || !habit.id) return;
    if (isMutating || isDisabled) return;

    const vars = {
      habitId: habit.id,
      occurrenceId: occurrence.id!,
      userId: myId,
      xpReward: habit.xpReward,
      periodKey,
    };
    if (iDone) {
      uncompleteOcc.mutate(vars);
    } else {
      completeOcc.mutate(vars);
    }
  };

  // Determine the display label for the date/schedule
  const scheduleSummary = getOccurrenceLabel(occurrence, schedule);

  // Other members who completed it
  const otherMembers = Object.entries(occurrence.completions).filter(
    ([uid]) => uid !== myId,
  );
  const hasOthers = otherMembers.length > 0;

  return (
    <div
      className={cn(
        "card p-4 space-y-3 transition-all duration-300 animate-fade-in group/card relative",
        isDimmed
          ? "opacity-60 grayscale-[0.2]"
          : "hover:border-brand-500/30 hover:shadow-glow",
        isLoading && "animate-pulse",
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

        {/* Content details */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-semibold text-sm truncate",
              iDone
                ? "line-through text-white/40"
                : isDisabled
                  ? "text-white/40"
                  : "text-white",
            )}
          >
            {habit.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/5",
                isDimmed
                  ? "text-white/20 bg-white/5"
                  : "text-accent bg-accent/10 border-accent/20",
              )}
            >
              <CalendarDays size={8} />
              {scheduleSummary}
            </span>
            {isFutureSpecific && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-500/70 bg-amber-500/10 border border-amber-500/20">
                Upcoming
              </span>
            )}
            <span className="xp-badge text-[10px] whitespace-nowrap">
              <Star size={9} /> +{habit.xpReward} XP
            </span>
          </div>
        </div>

        <div className="relative group">
          {/* ── My toggle button ──────────────────────────────────── */}
          <button
            onClick={handleToggle}
            disabled={!!(isMutating || isDisabled)}
            title={
              isDisabled
                ? "Cannot complete future scheduled habit"
                : iDone
                  ? "Tap to undo"
                  : "Mark complete"
            }
            className={cn(
              "relative flex flex-col items-center rounded-full",
              isDisabled
                ? "opacity-30 cursor-not-allowed border-white/5 bg-white/3"
                : iDone
                  ? "border-emerald-500/40 bg-emerald-500/10 hover:border-rose-500/40 hover:bg-rose-500/10"
                  : "border-white/10 bg-white/5 hover:border-accent/40 hover:bg-accent/5 active:scale-95",
              isMutating && "opacity-50 cursor-wait",
            )}
          >
            {/* Check icon */}
            {isMutating ? (
              <Loader2 size={18} className="animate-spin text-white/40" />
            ) : iDone ? (
              <CheckCircle size={18} className="text-emerald-400" />
            ) : (
              <Circle size={18} className="text-white/20" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* ── Motivational Footer ────────────────────────────────────────── */}
      <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {(hasOthers || iDone) && (
            <div className="flex -space-x-1.5 relative z-0">
              {otherMembers.slice(0, 3).map(([uid]) => (
                <div
                  key={uid}
                  className="w-6 h-6 rounded-full bg-accent/40 flex items-center justify-center border-2 border-surface-850"
                  title={`User ${uid}`}
                >
                  <span className="text-[9px] text-white font-bold">
                    {uid.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              ))}
              {otherMembers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border-2 border-surface-850">
                  <span className="text-[9px] text-white font-bold">
                    +{otherMembers.length - 3}
                  </span>
                </div>
              )}
              {iDone && (
                <div
                  className="w-6 h-6 rounded-full bg-emerald-500/40 flex items-center justify-center border-2 border-surface-850"
                  title="You"
                >
                  <span className="text-[9px] text-white font-bold">YOU</span>
                </div>
              )}
            </div>
          )}
          <p className="text-xs font-medium text-white/60">
            {hasOthers
              ? iDone
                ? `You & ${otherMembers.length} other${otherMembers.length > 1 ? "s" : ""} crushed it!`
                : `${otherMembers.length} member${otherMembers.length > 1 ? "s" : ""} finished - join them!`
              : iDone
                ? "You're the first to complete this!"
                : "Be the first to complete this!"}
          </p>
        </div>

        {!isDisabled && !iDone && (
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap",
              hasOthers
                ? "text-rose-400 bg-rose-400/10"
                : "text-accent bg-accent/10",
            )}
          >
            {hasOthers ? "Catch Up!" : "Start Now"}
          </span>
        )}
      </div>
    </div>
  );
}
