import mongoose, { Document, Schema } from 'mongoose';

export interface IHabitCompletionDocument extends Document {
  habitId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  completedAt: Date;
}

const HabitCompletionSchema = new Schema<IHabitCompletionDocument>({
  habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  completedAt: { type: Date, default: Date.now },
});

// Index for fast leaderboard queries
HabitCompletionSchema.index({ groupId: 1, userId: 1 });
HabitCompletionSchema.index({ habitId: 1, userId: 1, completedAt: 1 });

export const HabitCompletion = mongoose.model<IHabitCompletionDocument>(
  'HabitCompletion',
  HabitCompletionSchema
);
