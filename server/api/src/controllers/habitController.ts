import { Response } from 'express';
import { Habit } from '../models/Habit';
import { HabitCompletion } from '../models/HabitCompletion';
import { User } from '../models/User';
import { Group } from '../models/Group';
import { AuthRequest } from '../middleware/auth';
import { getIO } from '../sockets';
import mongoose from 'mongoose';

export const createHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, type, frequency, xpReward, coinReward, groupId } = req.body;
    if (!name || !type) {
      res.status(400).json({ message: 'Name and type are required' });
      return;
    }

    const habit = await Habit.create({
      name,
      type,
      frequency: frequency || 1,
      xpReward: xpReward || 10,
      coinReward: coinReward || 5,
      createdBy: req.user!.id,
      groupId: groupId || null,
    });

    res.status(201).json({ habit });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getGroupHabits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const habits = await Habit.find({ groupId: req.params.groupId }).populate(
      'createdBy',
      'name avatar'
    );
    res.json({ habits });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getUserHabits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const habits = await Habit.find({ createdBy: req.params.userId });
    res.json({ habits });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const completeHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { habitId } = req.params;
    const { groupId } = req.body;
    const userId = req.user!.id;

    const habit = await Habit.findById(habitId);
    if (!habit) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }

    const targetGroupId = groupId || habit.groupId;
    if (!targetGroupId) {
      res.status(400).json({ message: 'Group ID is required' });
      return;
    }

    // Create completion record
    await HabitCompletion.create({
      habitId: new mongoose.Types.ObjectId(habitId),
      userId: new mongoose.Types.ObjectId(userId),
      groupId: new mongoose.Types.ObjectId(targetGroupId),
      completedAt: new Date(),
    });

    // Award XP and coins
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { xp: habit.xpReward, coins: habit.coinReward } },
      { new: true }
    );

    // Emit socket events
    const io = getIO();
    const groupRoom = `group:${targetGroupId}`;

    const user = await User.findById(userId);
    const socketPayload = {
      userId,
      userName: user?.name || 'Someone',
      habitName: habit.name,
      xpEarned: habit.xpReward,
      groupId: targetGroupId,
      timestamp: new Date().toISOString(),
    };

    io.to(groupRoom).emit('habit_completed', socketPayload);
    io.to(groupRoom).emit('leaderboard_updated', { groupId: targetGroupId });
    io.to(groupRoom).emit('group_activity', {
      type: 'habit_completed',
      ...socketPayload,
    });

    res.json({
      xpEarned: habit.xpReward,
      totalXp: updatedUser?.xp || 0,
      coinsEarned: habit.coinReward,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
