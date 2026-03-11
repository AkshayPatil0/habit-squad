import { Response } from 'express';
import { nanoid } from 'nanoid';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const createGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Group name is required' });
      return;
    }

    const inviteCode = nanoid(8).toUpperCase();
    const group = await Group.create({
      name,
      inviteCode,
      createdBy: req.user!.id,
      members: [req.user!.id],
    });

    // Add group to user's list
    await User.findByIdAndUpdate(req.user!.id, { $addToSet: { groups: group._id } });

    res.status(201).json({ group });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const joinGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { inviteCode } = req.body;
    if (!inviteCode) {
      res.status(400).json({ message: 'Invite code is required' });
      return;
    }

    const group = await Group.findOne({ inviteCode: inviteCode.toUpperCase() });
    if (!group) {
      res.status(404).json({ message: 'Group not found with that invite code' });
      return;
    }

    const userId = req.user!.id;
    if (group.members.some((m) => m.toString() === userId)) {
      res.status(400).json({ message: 'Already a member of this group' });
      return;
    }

    group.members.push(new (require('mongoose').Types.ObjectId)(userId));
    await group.save();
    await User.findByIdAndUpdate(userId, { $addToSet: { groups: group._id } });

    res.json({ group });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate('members', 'name email avatar xp coins')
      .populate('createdBy', 'name email avatar');

    if (!group) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }

    res.json({ group });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getGroupMembers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const group = await Group.findById(req.params.groupId).populate(
      'members',
      'name email avatar xp coins'
    );
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }
    res.json({ members: group.members });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
