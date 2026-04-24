import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userService, UserProfile } from '../services/firestoreService';
import { queryKeys } from '../lib/queryKeys';

// ── Query ──────────────────────────────────────────────────────────────────

export function useUserProfile(uid: string | undefined) {
  return useQuery({
    queryKey: queryKeys.users.profile(uid ?? ''),
    queryFn: () => userService.getUserProfile(uid!),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────

interface UpdateProfileVars {
  uid: string;
  data: Partial<Pick<UserProfile, 'name' | 'avatar'>>;
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uid, data }: UpdateProfileVars) =>
      userService.updateUserProfile(uid, data),

    // ── Optimistic update ────────────────────────────────────────────────
    onMutate: async ({ uid, data }) => {
      const queryKey = queryKeys.users.profile(uid);

      await queryClient.cancelQueries({ queryKey });

      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);

      queryClient.setQueryData<UserProfile>(queryKey, (old) =>
        old ? { ...old, ...data } : old,
      );

      return { previousProfile, queryKey };
    },

    // ── Rollback on failure ──────────────────────────────────────────────
    onError: (_err, _vars, context) => {
      if (context?.previousProfile !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousProfile);
      }
      toast.error('Failed to update profile. Please try again.');
    },

    // ── Invalidate to re-sync ────────────────────────────────────────────
    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(vars.uid),
      });
    },

    onSuccess: () => {
      toast.success('Profile updated!');
    },
  });
}
