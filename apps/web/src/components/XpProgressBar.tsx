interface XpProgressBarProps {
  current: number;
  levelSize?: number;
  showLabel?: boolean;
  className?: string;
}

function getLevel(xp: number, levelSize: number) {
  return Math.floor(xp / levelSize) + 1;
}

function getProgress(xp: number, levelSize: number) {
  return ((xp % levelSize) / levelSize) * 100;
}

export function XpProgressBar({ current, levelSize = 200, showLabel = true, className = '' }: XpProgressBarProps) {
  const level = getLevel(current, levelSize);
  const progress = getProgress(current, levelSize);
  const xpInLevel = current % levelSize;

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-brand-400 text-sm">Level {level}</span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/50 text-xs">{current.toLocaleString()} total XP</span>
          </div>
          <span className="text-white/50 text-xs">
            {xpInLevel} / {levelSize} XP
          </span>
        </div>
      )}

      {/* Track */}
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
        {/* Glow effect */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer */}
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}
