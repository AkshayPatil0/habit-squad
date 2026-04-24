import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../context/AuthContext";
import { habitService } from "../../services/firestoreService";
import { Trophy, Loader2, Zap } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import {
  DEFAULT_HABIT_CATEGORIES,
  getCategoryById,
} from "@/constants/habitCategories";
import {
  DEFAULT_SCHEDULE,
  type HabitSchedule,
} from "@/constants/habitSchedule";
import SchedulePicker from "./SchedulePicker";

// ─── Schema ──────────────────────────────────────────────────────────────────

const scheduleSchema: z.ZodType<HabitSchedule> = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("flexible"),
    times: z.number().int().min(1).max(31),
    period: z.enum(["day", "week", "month"]),
  }),
  z.object({
    type: z.literal("scheduled"),
    period: z.enum(["week", "month"]),
    days: z.array(z.number().int().min(0).max(31)).min(1),
  }),
  z.object({
    type: z.literal("one_time"),
  }),
]) as unknown as z.ZodType<HabitSchedule>;

const createHabitSchema = z.object({
  name: z
    .string()
    .min(1, "Habit name is required")
    .max(60, "Name must be 60 characters or fewer"),
  category: z.string().min(1, "Please choose a category"),
  schedule: scheduleSchema,
  xpReward: z.number().int().min(10).max(200),
  coinReward: z.number().int().min(5).max(100),
});

type CreateHabitFormValues = z.infer<typeof createHabitSchema>;

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULT_VALUES: CreateHabitFormValues = {
  name: "",
  category: DEFAULT_HABIT_CATEGORIES[0].id,
  schedule: DEFAULT_SCHEDULE,
  xpReward: 50,
  coinReward: 15,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called after a habit is successfully created */
  onCreated?: () => void;
  /** Override available categories (e.g. per-group config) */
  categories?: typeof DEFAULT_HABIT_CATEGORIES;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateHabitModal({
  isOpen,
  onClose,
  onCreated,
  categories = DEFAULT_HABIT_CATEGORIES,
}: CreateHabitModalProps) {
  const { profile } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: DEFAULT_VALUES,
  });

  // Reset the form whenever the modal opens
  useEffect(() => {
    if (isOpen) reset(DEFAULT_VALUES);
  }, [isOpen, reset]);

  const name = watch("name");
  const xpReward = watch("xpReward");
  const selectedCategory = watch("category");

  // Resolve the active category object so we can show its icon
  const activeCategory = getCategoryById(selectedCategory);
  const PreviewIcon = activeCategory.defaultIcon;

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

  const onSubmit = async (data: CreateHabitFormValues) => {
    if (!profile?.uid) return;
    try {
      await habitService.createHabit({
        name: data.name,
        type: "boolean",
        schedule: data.schedule,
        xpReward: data.xpReward,
        coinReward: data.coinReward,
        category: data.category,
        groupId: profile.groups[0] ?? null,
        userId: profile.uid,
      });
      reset(DEFAULT_VALUES);
      onCreated?.();
      onClose();
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={false}
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="pb-10">
        {/* Custom Header */}
        <div className="sticky top-0 z-10 flex items-center bg-white dark:bg-surface-950 px-5 pt-5 pb-4 justify-between border-b border-accent/10 rounded-t-3xl sm:rounded-t-3xl">
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center bg-accent/10 rounded-full cursor-pointer hover:bg-accent/20 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-tight flex-1 text-center">
            New Quest
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg shadow-accent/30 disabled:opacity-50 flex items-center gap-1.5"
            >
              Save
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full p-5 space-y-8">
          {/* Preview Section */}
          <h3 className="text-accent text-xs font-black uppercase tracking-widest mb-4">
            Preview
          </h3>
          <section className="bg-accent/5 border-2 border-accent/20 p-4 rounded-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-4">
              {/* Icon reflects the selected category */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                  activeCategory.color,
                )}
              >
                <PreviewIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">
                  Group Challenge · {activeCategory.label}
                </p>
                <h4 className="text-slate-900 dark:text-slate-100 text-lg font-bold">
                  {name || "Habit Name"}
                </h4>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-center  gap-1 text-amber-500 font-bold">
                  <Zap className="w-4 h-4" />
                  <span>+{xpReward} XP</span>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {/* Habit Name */}
            <div>
              <label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">
                Habit Name
              </label>
              <input
                {...register("name")}
                className={cn(
                  "w-full rounded-xl border-2 bg-white dark:bg-surface-900 p-4 text-lg focus:ring-0 transition-all outline-none",
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-surface-200 dark:border-surface-700 focus:border-accent",
                )}
                placeholder="e.g., Morning Meditation"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1.5 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category + Icon Picker (linked) */}
            <div>
              <label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">
                Category
              </label>
              {errors.category && (
                <p className="text-sm text-red-500 mb-2 font-medium">
                  {errors.category.message}
                </p>
              )}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const CatIcon = cat.icon;
                      const isSelected = field.value === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => field.onChange(cat.id)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-center",
                            isSelected
                              ? "border-accent bg-accent/5 shadow-inner"
                              : "border-surface-100 dark:border-surface-700 bg-white dark:bg-surface-900 hover:border-accent/40",
                          )}
                        >
                          <span
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center",
                              isSelected
                                ? cat.color
                                : "text-slate-400 bg-surface-100 dark:bg-surface-800",
                            )}
                          >
                            <CatIcon className="w-5 h-5" />
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-bold leading-tight",
                              isSelected
                                ? "text-accent"
                                : "text-slate-500 dark:text-slate-400",
                            )}
                          >
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            {/* Schedule Picker */}
            <div>
              <label className="block text-slate-900 dark:text-slate-100 text-lg font-bold mb-3">
                Schedule
              </label>
              <Controller
                control={control}
                name="schedule"
                render={({ field }) => (
                  <SchedulePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>



            {/* Rewards Sliders */}
            <div className="space-y-6 pt-4">
              {/* XP Reward */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Experience Points (XP)
                  </label>
                  <span className="font-black text-accent bg-accent/10 px-3 py-1 rounded-lg">
                    {xpReward} XP
                  </span>
                </div>
                <Controller
                  control={control}
                  name="xpReward"
                  render={({ field }) => (
                    <input
                      className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-accent"
                      max={200}
                      min={10}
                      step={10}
                      type="range"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
