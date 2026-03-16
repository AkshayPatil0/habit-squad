"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeHabit = exports.getUserHabits = exports.getGroupHabits = exports.createHabit = void 0;
const Habit_1 = require("../models/Habit");
const HabitCompletion_1 = require("../models/HabitCompletion");
const User_1 = require("../models/User");
const sockets_1 = require("../sockets");
const mongoose_1 = __importDefault(require("mongoose"));
const createHabit = async (req, res) => {
    try {
        const { name, type, frequency, xpReward, coinReward, groupId } = req.body;
        if (!name || !type) {
            res.status(400).json({ message: 'Name and type are required' });
            return;
        }
        const habit = await Habit_1.Habit.create({
            name,
            type,
            frequency: frequency || 1,
            xpReward: xpReward || 10,
            coinReward: coinReward || 5,
            createdBy: req.user.id,
            groupId: groupId || null,
        });
        res.status(201).json({ habit });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.createHabit = createHabit;
const getGroupHabits = async (req, res) => {
    try {
        const habits = await Habit_1.Habit.find({ groupId: req.params.groupId }).populate('createdBy', 'name avatar');
        res.json({ habits });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getGroupHabits = getGroupHabits;
const getUserHabits = async (req, res) => {
    try {
        const habits = await Habit_1.Habit.find({ createdBy: req.params.userId });
        res.json({ habits });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getUserHabits = getUserHabits;
const completeHabit = async (req, res) => {
    try {
        const { habitId } = req.params;
        const { groupId } = req.body;
        const userId = req.user.id;
        const habit = await Habit_1.Habit.findById(habitId);
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
        await HabitCompletion_1.HabitCompletion.create({
            habitId: new mongoose_1.default.Types.ObjectId(habitId),
            userId: new mongoose_1.default.Types.ObjectId(userId),
            groupId: new mongoose_1.default.Types.ObjectId(targetGroupId),
            completedAt: new Date(),
        });
        // Award XP and coins
        const updatedUser = await User_1.User.findByIdAndUpdate(userId, { $inc: { xp: habit.xpReward, coins: habit.coinReward } }, { new: true });
        // Emit socket events
        const io = (0, sockets_1.getIO)();
        const groupRoom = `group:${targetGroupId}`;
        const user = await User_1.User.findById(userId);
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
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.completeHabit = completeHabit;
//# sourceMappingURL=habitController.js.map