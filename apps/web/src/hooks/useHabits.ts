import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { habitService, Habit } from "../services/firestoreService";
import { queryKeys } from "../lib/queryKeys";

// ── Queries ────────────────────────────────────────────────────────────────

export function useGroupHabits(groupId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.habits.byGroup(groupId ?? ""),
    queryFn: () => habitService.getGroupHabits(groupId!),
    enabled: !!groupId,
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────

interface CreateHabitVars {
  data: Omit<Habit, "id" | "createdAt" | "completedDates">;
  userId: string;
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: CreateHabitVars) => habitService.createHabit(data),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.habits.byUser(vars.userId),
      });
      toast.success("Habit created!");
    },
    onError: () => {
      toast.error("Failed to create habit. Please try again.");
    },
  });
}
