import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  groupService,
  habitService,
  Group,
  UserProfile,
  Habit,
} from "../services/firestoreService";
import {
  ArrowLeft,
  MoreHorizontal,
  Users,
  Trophy,
  Flame,
  Home,
  BookOpen,
  User as UserIcon,
  Loader2,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function GroupPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [groupHabits, setGroupHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setShowJoinForm] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      if (!profile?.groups?.length) {
        setLoading(false);
        return;
      }
      try {
        const fetchedGroups = await Promise.all(
          profile.groups.map((id) => groupService.getGroup(id)),
        );
        const validGroups = fetchedGroups.filter((g): g is Group => g !== null);
        setGroups(validGroups);
        if (validGroups.length > 0) {
          setSelectedGroup(validGroups[0]);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [profile?.groups]);

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!selectedGroup?.id) return;
      try {
        const [fetchedMembers, fetchedHabits] = await Promise.all([
          groupService.getGroupMembers(selectedGroup.members),
          habitService.getGroupHabits(selectedGroup.id),
        ]);
        setMembers(fetchedMembers);
        setGroupHabits(fetchedHabits);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroupData();
  }, [selectedGroup]);

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.uid || !inviteCode) return;
    try {
      await groupService.joinGroup(inviteCode, profile.uid);
      setInviteCode("");
      setShowJoinForm(false);
    } catch (error) {
      alert("Invalid invite code");
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.uid || !newGroupName) return;
    try {
      await groupService.createGroup(newGroupName, profile.uid);
      setNewGroupName("");
      setShowJoinForm(false);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <div className="max-w-md mx-auto bg-white dark:bg-surface-950 min-h-dvh flex flex-col shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 sticky top-0 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md z-10 justify-between border-b border-accent/5">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-black leading-tight flex-1 text-center uppercase tracking-widest px-2 truncate">
            {selectedGroup?.name || "Your Squads"}
          </h2>
          <div className="flex size-10 items-center justify-end">
            <button className="flex items-center justify-center rounded-full size-10 hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {!selectedGroup ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">
                No Squads Yet
              </h3>
              <p className="text-slate-500 font-medium text-sm mt-2">
                Join a squad with a code or create your own to start
                collaborating!
              </p>
            </div>

            <div className="w-full space-y-4">
              <form onSubmit={handleJoinGroup} className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter Invite Code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 focus:border-accent outline-none transition-all font-bold"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-accent/20"
                >
                  Join Squad
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-100 dark:border-surface-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-surface-950 px-2 text-slate-400 font-bold">
                    Or
                  </span>
                </div>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-2">
                <input
                  type="text"
                  placeholder="New Squad Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 focus:border-accent outline-none transition-all font-bold"
                />
                <button
                  type="submit"
                  className="w-full border-2 border-accent text-accent py-4 rounded-xl font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
                >
                  Create New Squad
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Group Profile */}
            <div className="flex p-6">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="relative">
                  <div className="bg-accent/10 p-1 rounded-full border-4 border-accent/20 shadow-lg">
                    <img
                      className="rounded-full h-32 w-32 object-cover"
                      src={selectedGroup.avatar}
                      alt={selectedGroup.name}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white shadow-md">
                    LVL 12
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black leading-tight uppercase tracking-tight">
                    {selectedGroup.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                    Squad Code:{" "}
                    <span className="text-accent">
                      {selectedGroup.inviteCode}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Member Avatars */}
            <div className="flex flex-col items-center px-4 py-2 border-y border-accent/5 bg-surface-50/50 dark:bg-surface-900/20">
              <div className="flex items-center justify-center -space-x-4">
                {members.slice(0, 5).map((member) => (
                  <img
                    key={member.uid}
                    className="border-4 border-white dark:border-surface-900 rounded-full size-14 shadow-sm object-cover"
                    src={member.avatar}
                    alt={member.name}
                  />
                ))}
                {members.length > 5 && (
                  <div className="bg-accent flex items-center justify-center border-4 border-white dark:border-surface-900 rounded-full size-14 shadow-sm text-white text-xs font-bold">
                    +{members.length - 5}
                  </div>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mt-3">
                {members.length} active members crushing goals
              </p>
            </div>

            {/* Challenges Section */}
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-tight">
                  Active Challenges
                </h2>
                <button className="text-accent text-sm font-bold hover:underline">
                  View All
                </button>
              </div>

              {groupHabits.length === 0 ? (
                <div className="bg-surface-50 dark:bg-surface-900/50 p-6 rounded-2xl text-center border-2 border-dashed border-surface-200 dark:border-surface-700">
                  <Zap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">
                    No active squad challenges
                  </p>
                  <button
                    onClick={() => navigate("/app/habits/new")}
                    className="text-accent font-black text-xs uppercase mt-2"
                  >
                    Start a Squad Quest
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="bg-accent/5 dark:bg-accent/10 rounded-2xl p-5 border border-accent/10 shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="size-12 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-sm uppercase truncate">
                            {habit.name}
                          </h3>
                          <p className="text-slate-500 text-xs font-bold">
                            {habit.frequency === 7
                              ? "Daily Squad Goal"
                              : `${habit.frequency}x / Week Quest`}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-surface-900 px-3 py-1 rounded-lg text-center shadow-sm border border-accent/5">
                          <p className="text-[10px] uppercase font-black text-slate-400">
                            Streak
                          </p>
                          <p className="font-black text-accent text-sm">05</p>
                        </div>
                      </div>

                      <button className="w-full bg-accent text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all">
                        Log Progress
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Group Stats */}
            <div className="px-6 flex gap-4 overflow-x-auto pb-24 no-scrollbar">
              <div className="min-w-[140px] bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 shadow-sm">
                <Flame className="text-orange-500 w-6 h-6 mb-2" />
                <p className="text-2xl font-black">142</p>
                <p className="text-slate-400 text-[10px] font-black uppercase">
                  Squad Streak
                </p>
              </div>
              <div className="min-w-[140px] bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 shadow-sm">
                <CheckCircle2 className="text-accent w-6 h-6 mb-2" />
                <p className="text-2xl font-black">85%</p>
                <p className="text-slate-400 text-[10px] font-black uppercase">
                  Success Rate
                </p>
              </div>
              <div className="min-w-[140px] bg-white dark:bg-surface-900 p-4 rounded-xl border-2 border-surface-100 dark:border-surface-700 shadow-sm">
                <Trophy className="text-amber-500 w-6 h-6 mb-2" />
                <p className="text-2xl font-black">12k</p>
                <p className="text-slate-400 text-[10px] font-black uppercase">
                  Total Power
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex gap-2 border-t border-accent/10 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md px-4 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Link
            to="/app"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <Home className="w-6 h-6" />
            <p className="text-[10px] font-bold">Home</p>
          </Link>
          <Link
            to="/app/habits"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <BookOpen className="w-6 h-6" />
            <p className="text-[10px] font-bold">Habits</p>
          </Link>
          <Link
            to="/app/leaderboard"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <Trophy className="w-6 h-6" />
            <p className="text-[10px] font-bold">Ranks</p>
          </Link>
          <Link
            to="/app/group"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-accent"
          >
            <Users className="w-6 h-6 fill-accent" />
            <p className="text-[10px] font-bold">Squads</p>
          </Link>
          <Link
            to="/app/profile"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-accent transition-colors"
          >
            <UserIcon className="w-6 h-6" />
            <p className="text-[10px] font-bold">Me</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
