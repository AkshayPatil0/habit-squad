import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Loader2, ArrowRight } from "lucide-react";
import { groupService } from "../services/firestoreService";
import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/authStore";
import { cn } from "../lib/utils";
import PageLayout from "../layouts/PageLayout";
import BlendedImage from "@/components/ui/BlendedImage";

const createSquadSchema = z.object({
  name: z.string().min(3, "Squad name must be at least 3 characters long"),
});

const joinSquadSchema = z.object({
  code: z.string().min(6, "Invalid invite code length"),
});

export default function SquadOnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const { user: storeUser, setUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const codeParam = queryParams.get("code");

  const {
    register: registerJoin,
    handleSubmit: handleJoinSubmit,
    formState: { errors: joinErrors, isSubmitting: isJoining },
    setValue: setJoinValue,
  } = useForm<z.infer<typeof joinSquadSchema>>({
    resolver: zodResolver(joinSquadSchema),
    defaultValues: {
      code: codeParam || "",
    },
  });

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    formState: { errors: createErrors, isSubmitting: isCreating },
  } = useForm<z.infer<typeof createSquadSchema>>({
    resolver: zodResolver(createSquadSchema),
  });

  useEffect(() => {
    if (codeParam) {
      setActiveTab("join");
      setJoinValue("code", codeParam);
    }
  }, [codeParam, setJoinValue]);

  const onJoin = async (data: z.infer<typeof joinSquadSchema>) => {
    setError(null);
    if (!profile?.uid) return;
    try {
      const groupData = await groupService.joinGroup(data.code, profile.uid);

      if (storeUser) {
        setUser({
          ...storeUser,
          groups: [...storeUser.groups, groupData.id || ""].filter(
            Boolean,
          ) as string[],
        });
      }
      navigate("/app/home");
    } catch (err: any) {
      console.error(err);
      setError("Failed to join squad. Please check the invite code.");
    }
  };

  const onCreate = async (data: z.infer<typeof createSquadSchema>) => {
    setError(null);
    if (!profile?.uid) return;
    try {
      const groupData = await groupService.createGroup(data.name, profile.uid);

      if (storeUser) {
        setUser({
          ...storeUser,
          groups: [...storeUser.groups, groupData.id || ""].filter(
            Boolean,
          ) as string[],
        });
      }
      navigate("/app/home");
    } catch (err: any) {
      console.error(err);
      setError("Failed to create squad. Please try again.");
    }
  };

  return (
    <PageLayout>
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <div className="relative w-full overflow-hidden mb-6 flex items-center justify-center">
              <BlendedImage
                className="h-36 aspect-square rounded-full"
                src="/images/join-squad.png"
              />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Squad Up!
            </h1>
            <p className="mt-2 text-slate-500 font-medium text-sm">
              Team up with friends to build habits together. Join an existing
              squad or create a new one.
            </p>
          </div>

          <div className="flex p-1 bg-surface-100 dark:bg-surface-900 rounded-xl mb-8">
            <button
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                activeTab === "join"
                  ? "bg-white dark:bg-surface-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
              )}
              onClick={() => {
                setActiveTab("join");
                setError(null);
              }}
            >
              Join Squad
            </button>
            <button
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                activeTab === "create"
                  ? "bg-white dark:bg-surface-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
              )}
              onClick={() => {
                setActiveTab("create");
                setError(null);
              }}
            >
              Create Squad
            </button>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {activeTab === "join" ? (
            <form onSubmit={handleJoinSubmit(onJoin)} className="space-y-4">
              <div className="space-y-1">
                <input
                  {...registerJoin("code")}
                  placeholder="Enter Invite Code"
                  className={cn(
                    "w-full px-4 py-4 rounded-xl border-2 bg-surface-50 dark:bg-surface-900 focus:outline-none transition-all font-bold text-center tracking-[0.2em] uppercase placeholder:tracking-normal placeholder:capitalize",
                    joinErrors.code
                      ? "border-red-500 focus:border-red-500"
                      : "border-surface-200 dark:border-surface-800 focus:border-accent",
                  )}
                />
                {joinErrors.code && (
                  <p className="text-sm text-red-500 font-medium text-center">
                    {joinErrors.code.message}
                  </p>
                )}
              </div>
              <button
                disabled={isJoining}
                type="submit"
                className="w-full btn-primary flex justify-center items-center py-4"
              >
                {isJoining ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Join Squad <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateSubmit(onCreate)} className="space-y-4">
              <div className="space-y-1">
                <input
                  {...registerCreate("name")}
                  placeholder="Squad Name"
                  className={cn(
                    "w-full px-4 py-4 rounded-xl border-2 bg-surface-50 dark:bg-surface-900 focus:outline-none transition-all font-bold text-center",
                    createErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-surface-200 dark:border-surface-800 focus:border-accent",
                  )}
                />
                {createErrors.name && (
                  <p className="text-sm text-red-500 font-medium text-center">
                    {createErrors.name.message}
                  </p>
                )}
              </div>
              <button
                disabled={isCreating}
                type="submit"
                className="w-full btn-primary flex justify-center items-center py-4"
              >
                {isCreating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Squad <UserPlus className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
