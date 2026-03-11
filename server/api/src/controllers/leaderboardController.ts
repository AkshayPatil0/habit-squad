import { Response } from 'express';
import { HabitCompletion } from '../models/HabitCompletion';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export const getLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { groupId } = req.params;

    // Aggregate completions by userId within the group
    const completionAgg = await HabitCompletion.aggregate([
      { $match: { groupId: new mongoose.Types.ObjectId(groupId) } },
      { $group: { _id: '$userId', completions: { $sum: 1 } } },
    ]);

    // Get member user data
    const userIds = completionAgg.map((c) => c._id);
    const users = await User.find({ _id: { $in: userIds } }, 'name email avatar xp');

    // Also include group members with 0 completions
    const { Group } = await import('../models/Group');
    const group = await Group.findById(groupId);
    const allMemberIds = group?.members || [];
    const allUsers = await User.find({ _id: { $in: allMemberIds } }, 'name email avatar xp');

    const completionMap: Record<string, number> = {};
    completionAgg.forEach((c) => {
      completionMap[c._id.toString()] = c.completions;
    });

    const leaderboard = allUsers
      .map((u) => ({
        userId: u._id.toString(),
        name: u.name,
        avatar: u.avatar,
        xp: u.xp,
        completions: completionMap[u._id.toString()] || 0,
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    res.json({ leaderboard });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
