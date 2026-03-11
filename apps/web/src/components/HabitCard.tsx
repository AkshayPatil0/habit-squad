import { CheckCircle, Circle, Star, BookOpen, Droplets, Target, Zap, Moon, Dumbbell } from 'lucide-react';

interface HabitCardProps {
  habit: {
    _id: string;
    name: string;
    type: string;
    xpReward: number;
    coinReward?: number;
    frequency?: number;
  };
  isCompleted?: boolean;
  onComplete?: (habitId: string) => void;
  isLoading?: boolean;
}

const habitIcons: Record<string, React.ElementType> = {
  default: Zap,
  meditation: Moon,
  exercise: Dumbbell,
  read: BookOpen,
  water: Droplets,
  goal: Target,
};

const typeColors: Record<string, string> = {
  daily: 'text-brand-400 bg-brand-500/10',
  weekly: 'text-emerald-400 bg-emerald-500/10',
  times_per_week: 'text-amber-400 bg-amber-500/10',
  one_time: 'text-rose-400 bg-rose-500/10',
};

const typeLabels: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  times_per_week: 'Custom',
  one_time: 'One-time',
};

function getIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('meditat')) return habitIcons.meditation;
  if (lower.includes('exercise') || lower.includes('workout') || lower.includes('gym')) return habitIcons.exercise;
  if (lower.includes('read') || lower.includes('book')) return habitIcons.read;
  if (lower.includes('water') || lower.includes('drink')) return habitIcons.water;
  return habitIcons.default;
}

export function HabitCard({ habit, isCompleted = false, onComplete, isLoading }: HabitCardProps) {
  const Icon = getIcon(habit.name);
  const typeStyle = typeColors[habit.type] || typeColors.daily;
  const typeLabel = typeLabels[habit.type] || habit.type;

  return (
    <div
      className={`card p-4 flex items-center gap-4 transition-all duration-300 animate-fade-in ${
        isCompleted ? 'opacity-60' : 'hover:border-brand-500/30 hover:shadow-glow'
      }`}
    >
      {/* Icon */}
      <div className={`p-3 rounded-xl ${isCompleted ? 'bg-white/5' : 'bg-brand-500/20'}`}>
        <Icon
          size={22}
          className={isCompleted ? 'text-white/30' : 'text-brand-400'}
          strokeWidth={1.5}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isCompleted ? 'line-through text-white/40' : 'text-white'}`}>
          {habit.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeStyle}`}>
            {typeLabel}
          </span>
          <span className="xp-badge text-[10px]">
            <Star size={9} /> +{habit.xpReward} XP
          </span>
        </div>
      </div>

      {/* Complete button */}
      <button
        onClick={() => !isCompleted && onComplete?.(habit._id)}
        disabled={isCompleted || isLoading}
        className={`transition-all duration-200 ${
          isCompleted
            ? 'text-emerald-400 cursor-default'
            : 'text-white/20 hover:text-brand-400 hover:scale-110 active:scale-95'
        }`}
      >
        {isCompleted ? <CheckCircle size={28} /> : <Circle size={28} strokeWidth={1.5} />}
      </button>
    </div>
  );
}
