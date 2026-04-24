import {
  Dumbbell,
  Apple,
  Brain,
  Briefcase,
  BookOpen,
  Heart,
  Droplets,
  Moon,
  Zap,
  Pencil,
  Music,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export interface HabitCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Tailwind colour token used for the badge & icon tint */
  color: string;
  /** Icon displayed in the form picker when this category is selected */
  defaultIcon: LucideIcon;
}

/**
 * Default categories available to all users / groups.
 * Extend or replace this list per-group via `groupCategories` config in Firestore.
 */
export const DEFAULT_HABIT_CATEGORIES: HabitCategory[] = [
  {
    id: "fitness",
    label: "Fitness",
    icon: Dumbbell,
    color: "text-rose-500 bg-rose-500/10",
    defaultIcon: Dumbbell,
  },
  {
    id: "health",
    label: "Health",
    icon: Apple,
    color: "text-emerald-500 bg-emerald-500/10",
    defaultIcon: Apple,
  },
  {
    id: "mindfulness",
    label: "Mindfulness",
    icon: Brain,
    color: "text-violet-500 bg-violet-500/10",
    defaultIcon: Moon,
  },
  {
    id: "career",
    label: "Career",
    icon: Briefcase,
    color: "text-sky-500 bg-sky-500/10",
    defaultIcon: Briefcase,
  },
  {
    id: "learning",
    label: "Learning",
    icon: BookOpen,
    color: "text-amber-500 bg-amber-500/10",
    defaultIcon: BookOpen,
  },
  {
    id: "relationships",
    label: "Relationships",
    icon: Heart,
    color: "text-pink-500 bg-pink-500/10",
    defaultIcon: Heart,
  },
  {
    id: "hydration",
    label: "Hydration",
    icon: Droplets,
    color: "text-cyan-500 bg-cyan-500/10",
    defaultIcon: Droplets,
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: Moon,
    color: "text-indigo-500 bg-indigo-500/10",
    defaultIcon: Moon,
  },
  {
    id: "creativity",
    label: "Creativity",
    icon: Pencil,
    color: "text-orange-500 bg-orange-500/10",
    defaultIcon: Music,
  },
  {
    id: "nature",
    label: "Nature",
    icon: Leaf,
    color: "text-lime-500 bg-lime-500/10",
    defaultIcon: Leaf,
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Zap,
    color: "text-yellow-500 bg-yellow-500/10",
    defaultIcon: Zap,
  },
];

/** Look up a category by id, falling back to a safe default. */
export function getCategoryById(id: string): HabitCategory {
  return (
    DEFAULT_HABIT_CATEGORIES.find((c) => c.id === id) ??
    DEFAULT_HABIT_CATEGORIES[0]
  );
}
