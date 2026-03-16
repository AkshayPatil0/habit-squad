"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupMembers = exports.getGroup = exports.joinGroup = exports.createGroup = void 0;
const nanoid_1 = require("nanoid");
const Group_1 = require("../models/Group");
const User_1 = require("../models/User");
const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Group name is required' });
            return;
        }
        const inviteCode = (0, nanoid_1.nanoid)(8).toUpperCase();
        const group = await Group_1.Group.create({
            name,
            inviteCode,
            createdBy: req.user.id,
            members: [req.user.id],
        });
        // Add group to user's list
        await User_1.User.findByIdAndUpdate(req.user.id, { $addToSet: { groups: group._id } });
        res.status(201).json({ group });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.createGroup = createGroup;
const joinGroup = async (req, res) => {
    try {
        const { inviteCode } = req.body;
        if (!inviteCode) {
            res.status(400).json({ message: 'Invite code is required' });
            return;
        }
        const group = await Group_1.Group.findOne({ inviteCode: inviteCode.toUpperCase() });
        if (!group) {
            res.status(404).json({ message: 'Group not found with that invite code' });
            return;
        }
        const userId = req.user.id;
        if (group.members.some((m) => m.toString() === userId)) {
            res.status(400).json({ message: 'Already a member of this group' });
            return;
        }
        group.members.push(new (require('mongoose').Types.ObjectId)(userId));
        await group.save();
        await User_1.User.findByIdAndUpdate(userId, { $addToSet: { groups: group._id } });
        res.json({ group });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.joinGroup = joinGroup;
const getGroup = async (req, res) => {
    try {
        const group = await Group_1.Group.findById(req.params.groupId)
            .populate('members', 'name email avatar xp coins')
            .populate('createdBy', 'name email avatar');
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        res.json({ group });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getGroup = getGroup;
const getGroupMembers = async (req, res) => {
    try {
        const group = await Group_1.Group.findById(req.params.groupId).populate('members', 'name email avatar xp coins');
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        res.json({ members: group.members });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getGroupMembers = getGroupMembers;
//# sourceMappingURL=groupController.js.map