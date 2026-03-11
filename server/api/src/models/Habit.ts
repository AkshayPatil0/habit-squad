import mongoose, { Document, Schema } from 'mongoose';

export type HabitType = 'daily' | 'weekly' | 'times_per_week' | 'one_time';

export interface IHabitDocument extends Document {
  name: string;
  type: HabitType;
  frequency: number;
  xpReward: number;
  coinReward: number;
  createdBy: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const HabitSchema = new Schema<IHabitDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['daily', 'weekly', 'times_per_week', 'one_time'],
    },
    frequency: { type: Number, default: 1, min: 1 },
    xpReward: { type: Number, default: 10, min: 0 },
    coinReward: { type: Number, default: 5, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
  },
  { timestamps: true }
);

export const Habit = mongoose.model<IHabitDocument>('Habit', HabitSchema);
