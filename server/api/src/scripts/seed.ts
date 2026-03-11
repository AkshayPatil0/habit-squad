import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { env } from '../config/env';
import { User } from '../models/User';
import { Group } from '../models/Group';
import { Habit } from '../models/Habit';
import { HabitCompletion } from '../models/HabitCompletion';
import { nanoid } from 'nanoid';

const seed = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log('🌱 Connected to MongoDB, seeding...');

  // Clear existing data
  await User.deleteMany({});
  await Group.deleteMany({});
  await Habit.deleteMany({});
  await HabitCompletion.deleteMany({});

  // Create 3 users
  const users = await User.insertMany([
    { name: 'Alex Rivera', email: 'alex@habitsquad.app', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', xp: 340, coins: 80 },
    { name: 'Jordan Kim', email: 'jordan@habitsquad.app', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', xp: 210, coins: 55 },
    { name: 'Sam Chen', email: 'sam@habitsquad.app', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', xp: 150, coins: 30 },
  ]);

  // Hash passwords (pre-save hook won't fire with insertMany)
  // Re-save each user to trigger bcrypt
  for (const u of users) {
    const fresh = await User.findById(u._id);
    if (fresh) { fresh.password = 'password123'; await fresh.save(); }
  }

  console.log(`✅ Created ${users.length} users`);

  // Create 1 group
  const group = await Group.create({
    name: 'Morning Warriors',
    inviteCode: nanoid(8).toUpperCase(),
    createdBy: users[0]._id,
    members: users.map((u) => u._id),
  });

  // Add group to all users
  await User.updateMany({ _id: { $in: users.map((u) => u._id) } }, { $addToSet: { groups: group._id } });

  console.log(`✅ Created group: ${group.name} (code: ${group.inviteCode})`);

  // Create 5 habits
  const habits = await Habit.insertMany([
    { name: 'Morning Meditation', type: 'daily', frequency: 1, xpReward: 15, coinReward: 5, createdBy: users[0]._id, groupId: group._id },
    { name: 'Exercise 30min', type: 'daily', frequency: 1, xpReward: 20, coinReward: 8, createdBy: users[0]._id, groupId: group._id },
    { name: 'Read 20 Pages', type: 'daily', frequency: 1, xpReward: 10, coinReward: 4, createdBy: users[1]._id, groupId: group._id },
    { name: 'Drink 8 glasses water', type: 'daily', frequency: 1, xpReward: 10, coinReward: 3, createdBy: users[1]._id, groupId: group._id },
    { name: 'Weekly Review', type: 'weekly', frequency: 1, xpReward: 50, coinReward: 20, createdBy: users[2]._id, groupId: group._id },
  ]);

  console.log(`✅ Created ${habits.length} habits`);

  // Create some completions
  const completions = [];
  for (let i = 0; i < 4; i++) {
    completions.push({
      habitId: habits[i]._id,
      userId: users[0]._id,
      groupId: group._id,
      completedAt: new Date(),
    });
  }
  for (let i = 0; i < 2; i++) {
    completions.push({
      habitId: habits[i]._id,
      userId: users[1]._id,
      groupId: group._id,
      completedAt: new Date(),
    });
  }
  await HabitCompletion.insertMany(completions);
  console.log(`✅ Created ${completions.length} completions`);

  console.log('\n🎉 Seed complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Login credentials:');
  console.log('  alex@habitsquad.app / password123');
  console.log('  jordan@habitsquad.app / password123');
  console.log('  sam@habitsquad.app / password123');
  console.log(`Group invite code: ${group.inviteCode}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
