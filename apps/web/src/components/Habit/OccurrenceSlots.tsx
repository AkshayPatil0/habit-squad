import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HabitOccurrence } from "@/services/firestoreService";
import type { HabitSchedule } from "@/constants/habitSchedule";

interface OccurrenceSlotsProps {
  occurrences: HabitOccurrence[];
  myId: string;
  isLoading?: boolean;
  isMutating?: boolean;
  isDisabled?: boolean;
  schedule: HabitSchedule;
  onToggle: (occurrenceId: string, alreadyDone: boolean) => void;
}

/**
 * Renders the interactive occurrence slots row for a HabitCard.
 *
 * Each slot shows:
 * - Your own completion button (toggleable)
 * - Completion avatars/initials for other group members who have completed it
 * - A date label if the slot is tied to a specific day
 */
export default function OccurrenceSlots({
  occurrences,
  myId,
  isLoading,
  isMutating,
  isDisabled,
  onToggle,
}: OccurrenceSlotsProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2 items-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (occurrences.length === 0) {
    return (
      <p className="text-[10px] text-white/30 italic">
        Generating slots for this week…
      </p>
    );
  }

  const completedCount = occurrences.filter(
    (o) => !!o.completions[myId],
  ).length;

  return (
    <div className="space-y-2">
      {/* ── Slot row ────────────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {occurrences.map((occ) => {
          const iDone = !!occ.completions[myId];
          const otherMembers = Object.entries(occ.completions).filter(
            ([uid]) => uid !== myId,
          );
          const hasOthers = otherMembers.length > 0;

          return (
            <div key={occ.id} className="relative group">
              {/* ── My toggle button ──────────────────────────────────── */}
              <button
                onClick={() => onToggle(occ.id!, iDone)}
                disabled={isMutating || isDisabled}
                title={
                  isDisabled
                    ? "Not scheduled for today"
                    : iDone
                      ? "Tap to undo"
                      : "Mark complete"
                }
                className={cn(
                  "relative flex flex-col items-center gap-0.5 p-2 rounded-xl border-2 transition-all duration-200 min-w-[52px]",
                  isDisabled
                    ? "opacity-30 cursor-not-allowed border-white/5 bg-white/3"
                    : iDone
                      ? "border-emerald-500/40 bg-emerald-500/10 hover:border-rose-500/40 hover:bg-rose-500/10"
                      : "border-white/10 bg-white/5 hover:border-accent/40 hover:bg-accent/5 active:scale-95",
                  isMutating && "opacity-50 cursor-wait",
                )}
              >
                {/* Slot index / date label */}
                {occ.scheduledDate ? (
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-wide leading-none",
                      iDone ? "text-emerald-400/70" : "text-white/30",
                    )}
                  >
                    {formatSlotDate(occ.scheduledDate)}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase leading-none",
                      iDone ? "text-emerald-400/70" : "text-white/30",
                    )}
                  >
                    #{occ.slotIndex}
                  </span>
                )}

                {/* Check icon */}
                {isMutating ? (
                  <Loader2 size={18} className="animate-spin text-white/40" />
                ) : iDone ? (
                  <CheckCircle size={18} className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-white/20" strokeWidth={1.5} />
                )}

                {/* Other-member count badge */}
                {hasOthers && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-white text-[8px] font-black flex items-center justify-center border border-surface-850">
                    {otherMembers.length}
                  </span>
                )}
              </button>

              {/* ── Other members tooltip (hover) ──────────────────── */}
              {hasOthers && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-surface-800 border border-white/10 rounded-xl p-2 shadow-xl z-20 min-w-[100px]">
                  <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-0.5">
                    Also done by
                  </p>
                  {otherMembers.map(([uid, data]) => (
                    <div key={uid} className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-accent/30 flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">
                          {uid.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/60">
                        {data.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Weekly progress summary ──────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {occurrences.map((occ) => (
            <div
              key={occ.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                occ.completions[myId]
                  ? "bg-emerald-400"
                  : "bg-white/10",
              )}
              style={{ width: `${Math.max(24, 80 / occurrences.length)}px` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-white/30 font-medium">
          {completedCount}/{occurrences.length} this week
        </span>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatSlotDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en", { weekday: "short" }).slice(0, 3);
}
