"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const HabitCompletion_1 = require("../models/HabitCompletion");
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const getLeaderboard = async (req, res) => {
    try {
        const { groupId } = req.params;
        // Aggregate completions by userId within the group
        const completionAgg = await HabitCompletion_1.HabitCompletion.aggregate([
            { $match: { groupId: new mongoose_1.default.Types.ObjectId(groupId) } },
            { $group: { _id: '$userId', completions: { $sum: 1 } } },
        ]);
        // Get member user data
        const userIds = completionAgg.map((c) => c._id);
        const users = await User_1.User.find({ _id: { $in: userIds } }, 'name email avatar xp');
        // Also include group members with 0 completions
        const { Group } = await Promise.resolve().then(() => __importStar(require('../models/Group')));
        const group = await Group.findById(groupId);
        const allMemberIds = group?.members || [];
        const allUsers = await User_1.User.find({ _id: { $in: allMemberIds } }, 'name email avatar xp');
        const completionMap = {};
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
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getLeaderboard = getLeaderboard;
//# sourceMappingURL=leaderboardController.js.map