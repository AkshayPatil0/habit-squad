import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  occurrenceService,
  type HabitOccurrence,
  type Habit,
} from "../services/firestoreService";
import { queryKeys } from "../lib/queryKeys";
import { getPeriodKey } from "../utils/periodKey";

// ── Queries ────────────────────────────────────────────────────────────────────

/** Fetch all occurrence slots for a habit in a specific period. */
export function useHabitOccurrences(
  habitId: string | undefined,
  periodKey: string | undefined,
) {
  return useQuery({
    queryKey: queryKeys.occurrences.byHabitPeriod(habitId ?? "", periodKey ?? ""),
    queryFn: () => occurrenceService.getHabitOccurrences(habitId!, periodKey!),
    enabled: !!habitId && !!periodKey,
    staleTime: 1000 * 60 * 5, // 5 min — occurrences don't change mid-session
  });
}

/** Fetch all occurrences for a list of habits matching their current period. */
export function useAllHabitsOccurrences(
  habits: Habit[],
  date: Date = new Date(),
) {
  return useQueries({
    queries: habits.map((habit) => {
      const periodKey = habit.schedule ? getPeriodKey(habit.schedule, date) : "";
      return {
        queryKey: queryKeys.occurrences.byHabitPeriod(habit.id ?? "", periodKey),
        queryFn: () => occurrenceService.getHabitOccurrences(habit.id!, periodKey),
        enabled: !!habit.id && !!periodKey,
        staleTime: 1000 * 60 * 5,
      };
    }),
  });
}

// ── Ensure occurrences (one-shot per habit per period) ────────────────────

/**
 * Call this once per habit when the habits list loads.
 * It is idempotent — subsequent calls for the same period are no-ops.
 */
export function useEnsurePeriodOccurrences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habit: Habit) =>
      occurrenceService.ensurePeriodOccurrences(habit),
    onSuccess: (_data, habit) => {
      // Invalidate so the occurrence list query re-fetches fresh slots
      const periodKey = habit.schedule ? getPeriodKey(habit.schedule) : "";
      queryClient.invalidateQueries({
        queryKey: queryKeys.occurrences.byHabitPeriod(
          habit.id ?? "",
          periodKey,
        ),
      });
    },
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────────

interface CompleteOccurrenceVars {
  habitId: string;
  occurrenceId: string;
  userId: string;
  xpReward: number;
  periodKey: string;
}

export function useCompleteOccurrence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CompleteOccurrenceVars) =>
      occurrenceService.completeOccurrence(
        vars.habitId,
        vars.occurrenceId,
        vars.userId,
        vars.xpReward,
      ),

    // ── Optimistic update ──────────────────────────────────────────────────
    onMutate: async (vars) => {
      const queryKey = queryKeys.occurrences.byHabitPeriod(
        vars.habitId,
        vars.periodKey,
      );
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData<HabitOccurrence[]>(queryKey);

      queryClient.setQueryData<HabitOccurrence[]>(queryKey, (old = []) =>
        old.map((occ) =>
          occ.id === vars.occurrenceId
            ? {
                ...occ,
                completions: {
                  ...occ.completions,
                  [vars.userId]: {
                    completedAt: { toDate: () => new Date() } as never,
                    date: new Date().toISOString().split("T")[0],
                  },
                },
              }
            : occ,
        ),
      );

      return { prev, queryKey };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(ctx.queryKey, ctx.prev);
      toast.error("Failed to complete occurrence. Please try again.");
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.occurrences.byHabitPeriod(vars.habitId, vars.periodKey),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(vars.userId),
      });
    },

    onSuccess: () => toast.success("Done! 🎉"),
  });
}

export function useUncompleteOccurrence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CompleteOccurrenceVars) =>
      occurrenceService.uncompleteOccurrence(
        vars.habitId,
        vars.occurrenceId,
        vars.userId,
        vars.xpReward,
      ),

    onMutate: async (vars) => {
      const queryKey = queryKeys.occurrences.byHabitPeriod(
        vars.habitId,
        vars.periodKey,
      );
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData<HabitOccurrence[]>(queryKey);

      queryClient.setQueryData<HabitOccurrence[]>(queryKey, (old = []) =>
        old.map((occ) => {
          if (occ.id !== vars.occurrenceId) return occ;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [vars.userId]: _removed, ...rest } = occ.completions;
          return { ...occ, completions: rest };
        }),
      );

      return { prev, queryKey };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(ctx.queryKey, ctx.prev);
      toast.error("Failed to undo. Please try again.");
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.occurrences.byHabitPeriod(vars.habitId, vars.periodKey),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(vars.userId),
      });
    },

    onSuccess: () => toast.success("Marked incomplete."),
  });
}

// ── Bulk ensure on habits load ─────────────────────────────────────────────────

/**
 * Fire-and-forget: ensure all given habits have occurrences for their current period.
 * Skips habits that already have slots (idempotent on the server).
 */
export async function ensureAllPeriodOccurrences(habits: Habit[]) {
  await Promise.allSettled(
    habits
      .filter((h) => !!h.id && !!h.schedule)
      .map((h) => occurrenceService.ensurePeriodOccurrences(h)),
  );
}
