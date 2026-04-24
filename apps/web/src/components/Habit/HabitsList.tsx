import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import CreateHabitModal from "./CreateHabitModal";
import {
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";
import { OccurrenceCard } from "./OccurrenceCard";
import { useGroupHabits } from "../../hooks/useHabits";
import { ensureAllPeriodOccurrences, useAllHabitsOccurrences } from "../../hooks/useOccurrences";
import { useQueryClient } from "@tanstack/react-query";
import type { Habit, HabitOccurrence } from "@/services/firestoreService";

type QuickFilter = "All" | "Overdue" | "Due Today" | "Upcoming" | "Completed";

export default function HabitsList() {
  const { profile, loading: authLoading } = useAuth();
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("All");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    data: habits = [],
    isLoading: habitsLoading,
    isError,
  } = useGroupHabits(profile?.groups[0]);

  const queryClient = useQueryClient();

  // ── Generate occurrence records for the current period ─────────────────────
  useEffect(() => {
    if (habits.length > 0) {
      ensureAllPeriodOccurrences(habits).then(() => {
        queryClient.invalidateQueries({ queryKey: ["occurrences"] });
      });
    }
  }, [habits, queryClient]);

  // Fetch all occurrences for all habits
  const occurrenceQueries = useAllHabitsOccurrences(habits);
  const isLoadingOccurrences = occurrenceQueries.some((q) => q.isLoading) || occurrenceQueries.length === 0;

  const flatOccurrences = useMemo(() => {
    return habits.flatMap((habit, i) => {
      const occurrences = occurrenceQueries[i]?.data || [];
      
      const sortedOccurrences = [...occurrences].sort((a, b) => {
        if (a.scheduledDate === b.scheduledDate) {
          return a.slotIndex - b.slotIndex;
        }
        if (!a.scheduledDate) return -1;
        if (!b.scheduledDate) return 1;
        return a.scheduledDate.localeCompare(b.scheduledDate);
      });

      const result = [];
      let foundFirstIncomplete = false;

      for (const occ of sortedOccurrences) {
        const isCompleted = !!occ.completions[profile?.uid ?? ""];
        if (isCompleted) {
          result.push({ habit, occurrence: occ });
        } else if (!foundFirstIncomplete) {
          result.push({ habit, occurrence: occ });
          foundFirstIncomplete = true;
        }
      }

      return result;
    });
  }, [habits, occurrenceQueries, profile?.uid]);

  if (authLoading || habitsLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3 text-center px-6 bg-background-light dark:bg-background-dark">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="font-semibold text-slate-600 dark:text-slate-400">
          Failed to load habits. Check your connection and try again.
        </p>
      </div>
    );
  }

  const quickFilters: { label: QuickFilter; icon: React.ReactNode }[] = [
    { label: "All", icon: null },
    { label: "Overdue", icon: <Clock className="w-3 h-3" /> },
    { label: "Due Today", icon: <CalendarCheck className="w-3 h-3" /> },
    { label: "Upcoming", icon: <CalendarClock className="w-3 h-3" /> },
    { label: "Completed", icon: <CheckCircle2 className="w-3 h-3" /> },
  ];

  /** Compute an occurrence's urgency category for filtering & sorting */
  function occurrenceUrgency(
    item: { habit: Habit; occurrence: HabitOccurrence }
  ): "overdue" | "due-today" | "upcoming" | "done" {
    const { occurrence } = item;
    const iDone = !!occurrence.completions[profile?.uid ?? ""];
    if (iDone) return "done";

    // Flexible habit (no scheduledDate)
    if (!occurrence.scheduledDate) {
      return "due-today"; // always show as pending today until completed
    }

    const todayIso = new Date().toISOString().split("T")[0];
    if (occurrence.scheduledDate < todayIso) return "overdue";
    if (occurrence.scheduledDate === todayIso) return "due-today";
    return "upcoming";
  }

  const URGENCY_ORDER: Record<ReturnType<typeof occurrenceUrgency>, number> = {
    overdue: 0,
    "due-today": 1,
    upcoming: 2,
    done: 3,
  };

  const filteredOccurrences = flatOccurrences
    .filter((item) => {
      const urgency = occurrenceUrgency(item);
      if (quickFilter === "Completed") return urgency === "done";
      if (quickFilter === "Overdue") return urgency === "overdue";
      if (quickFilter === "Due Today") return urgency === "due-today";
      if (quickFilter === "Upcoming") return urgency === "upcoming";
      return true;
    })
    .sort((a, b) => {
      const urgencyA = URGENCY_ORDER[occurrenceUrgency(a)];
      const urgencyB = URGENCY_ORDER[occurrenceUrgency(b)];
      if (urgencyA !== urgencyB) return urgencyA - urgencyB;

      // Same urgency, sort by date then index
      const dateA = a.occurrence.scheduledDate;
      const dateB = b.occurrence.scheduledDate;

      if (dateA === dateB) {
        return a.occurrence.slotIndex - b.occurrence.slotIndex;
      }
      if (!dateA) return -1; // flexible ones go first within category
      if (!dateB) return 1;
      return dateA.localeCompare(dateB);
    });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Tabs Navigation */}
      <nav className="p-4 pr-0 sticky top-0 z-10 bg-surface-950">
        <div className="max-w-md mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {quickFilters.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setQuickFilter(label)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                quickFilter === label
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                  : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-accent/50"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4 pb-24">
        {filteredOccurrences.length > 0 ? (
          filteredOccurrences.map((item) => (
            <OccurrenceCard 
              key={item.occurrence.id} 
              habit={item.habit} 
              occurrence={item.occurrence} 
              isLoading={isLoadingOccurrences} 
            />
          ))
        ) : (
          <div className="bg-white dark:bg-surface-950 rounded-2xl p-8 border-2 border-dashed border-surface-200 dark:border-surface-800 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-accent opacity-40" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {quickFilter !== "All"
                ? `No ${quickFilter} Habits`
                : "No Habits Yet"}
            </h3>
            <p className="text-slate-500 mb-6 max-w-xs">
              {quickFilter !== "All"
                ? `No occurrences match the "${quickFilter}" filter.`
                : "Start your journey today by creating your first healthy habit!"}
            </p>
            {quickFilter === "All" && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="bg-accent text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-accent/30 hover:scale-105 transition-all"
              >
                Create New Habit
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => setIsCreateOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 z-20 hover:scale-110 active:scale-95 transition-all outline-none"
          aria-label="Create new habit"
        >
          <Plus className="w-8 h-8" />
        </button>
      </main>

      <CreateHabitModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
