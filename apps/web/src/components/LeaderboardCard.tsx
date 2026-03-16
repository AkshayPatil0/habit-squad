interface LeaderboardCardProps {
  entry: {
    userId: string;
    name: string;
    avatar: string;
    xp: number;
    completions: number;
    rank: number;
  };
  isCurrentUser?: boolean;
}

const medals = ["🥇", "🥈", "🥉"];

const rankColors = [
  "from-yellow-500/20 to-amber-600/10 border-yellow-500/30",
  "from-surface-400/20 to-gray-500/10 border-surface-400/30",
  "from-amber-700/20 to-amber-800/10 border-amber-700/30",
];

export function LeaderboardCard({
  entry,
  isCurrentUser,
}: LeaderboardCardProps) {
  const isTop3 = entry.rank <= 3;

  return (
    <div
      className={`card p-4 flex items-center gap-3 transition-all duration-200 animate-fade-in ${
        isTop3 ? `bg-gradient-to-r ${rankColors[entry.rank - 1]}` : ""
      } ${isCurrentUser ? "border-brand-500/50 shadow-glow" : ""}`}
    >
      {/* Rank */}
      <div className="w-8 text-center flex-shrink-0">
        {isTop3 ? (
          <span className="text-2xl">{medals[entry.rank - 1]}</span>
        ) : (
          <span className="text-white/40 font-bold text-sm">#{entry.rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={
            entry.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.name}`
          }
          alt={entry.name}
          className="w-10 h-10 rounded-full bg-surface-800 border-2 border-white/10"
        />
        {isCurrentUser && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full border border-surface-900" />
        )}
      </div>

      {/* Name & stats */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm truncate ${isCurrentUser ? "text-brand-300" : "text-white"}`}
        >
          {entry.name}{" "}
          {isCurrentUser && (
            <span className="text-brand-400 text-xs">(You)</span>
          )}
        </p>
        <p className="text-white/40 text-xs mt-0.5">
          {entry.completions} completions
        </p>
      </div>

      {/* XP */}
      <div className="text-right flex-shrink-0">
        <p
          className={`font-display font-bold ${isTop3 ? "text-gradient-gold text-lg" : "text-white text-sm"}`}
        >
          {entry.xp.toLocaleString()}
        </p>
        <p className="text-white/30 text-[10px] uppercase tracking-wide">XP</p>
      </div>
    </div>
  );
}
